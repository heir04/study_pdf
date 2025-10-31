// Use Next.js API routes as proxy to avoid CORS issues
const API_BASE = '/api';

class ApiClient {
  getAuthHeader(token) {
    return { Authorization: `Bearer ${token}` };
  }

  // User endpoints
  async register(email, name, password) {
    const res = await fetch(`${API_BASE}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, password })
    });
    return res.json();
  }

  async login(email, password) {
    const res = await fetch(`${API_BASE}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    // Store token from response
    // Backend returns: { token: "..." }
    if (data && data.token) {
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('token', data.token);
          // Store user email as a simple user object since backend only returns token
          const user = { email: email };
          localStorage.setItem('user', JSON.stringify(user));
          console.log('Token and user stored in localStorage');
        } catch (e) {
          console.error('Failed to store in localStorage:', e);
        }
      }
      
      // Return data in the format expected by the frontend
      return {
        status: true,
        data: { email: email },
        token: data.token
      };
    } else {
      // Login failed
      return {
        status: false,
        message: data.message || 'Invalid credentials',
        data: null
      };
    }
  }

  // Summary endpoints
  async createSummary(file, token) {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${API_BASE}/summary/create`, {
      method: 'POST',
      headers: this.getAuthHeader(token),
      body: formData
    });
    return res.json();
  }

  async getAllSummaries(token) {
    const res = await fetch(`${API_BASE}/summary/getall`, {
      headers: this.getAuthHeader(token)
    });
    return res.json();
  }

  async getSummary(id, token) {
    const res = await fetch(`${API_BASE}/summary/${id}`, {
      headers: this.getAuthHeader(token)
    });
    return res.json();
  }

  // Quiz endpoints
  async getQuizQuestions(summaryId, token) {
    const res = await fetch(`${API_BASE}/quiz/questions/${summaryId}`, {
      headers: this.getAuthHeader(token)
    });
    return res.json();
  }

  async submitAnswer(questionId, userAnswer, token) {
    const res = await fetch(`${API_BASE}/quiz/answer/${questionId}`, {
      method: 'POST',
      headers: Object.assign({ 'Content-Type': 'application/json' }, this.getAuthHeader(token)),
      body: JSON.stringify({ userAnswer })
    });
    return res.json();
  }

  async getQuizSummary(quizId, token) {
    const res = await fetch(`${API_BASE}/quiz/summary/${quizId}`, {
      headers: this.getAuthHeader(token)
    });
    return res.json();
  }

  async getQuestionsWithAnswers(quizId, token) {
    const res = await fetch(`${API_BASE}/quiz/results/${quizId}`, {
      headers: this.getAuthHeader(token)
    });
    return res.json();
  }
}

export const api = new ApiClient();