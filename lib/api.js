const API_BASE = 'http://localhost:5085/api';

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

    // Store token from response (if provided)
    if (data && data.status && data.data) {
      // Try to read token from response headers or body
      const token = (res.headers && res.headers.get && res.headers.get('Authorization')) || data.token || null;
      if (typeof window !== 'undefined' && token) {
        try {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(data.data));
        } catch (e) {
          // ignore storage errors (e.g., SSR)
        }
      }
    }

    return data;
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
    const res = await fetch(`${API_BASE}/quiz/get/quiz-questions/${summaryId}`, {
      headers: this.getAuthHeader(token)
    });
    return res.json();
  }

  async submitAnswer(questionId, userAnswer, token) {
    const res = await fetch(`${API_BASE}/quiz/question/answer/${questionId}`, {
      method: 'POST',
      headers: Object.assign({ 'Content-Type': 'application/json' }, this.getAuthHeader(token)),
      body: JSON.stringify({ userAnswer })
    });
    return res.json();
  }

  async getQuizSummary(quizId, token) {
    const res = await fetch(`${API_BASE}/quiz/get/quiz-summary/${quizId}`, {
      headers: this.getAuthHeader(token)
    });
    return res.json();
  }

  async getQuestionsWithAnswers(quizId, token) {
    const res = await fetch(`${API_BASE}/quiz/get/questions/${quizId}`, {
      headers: this.getAuthHeader(token)
    });
    return res.json();
  }
}

export const api = new ApiClient();