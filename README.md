# Study PDF - AI-Powered PDF Summarization & Quiz Platform

A Next.js-based web application that allows users to upload PDF documents, generate AI-powered summaries, and test their understanding through interactive quizzes.

## Features

- 📚 **PDF Upload & Processing**: Upload PDF documents for automatic summarization
- 🤖 **AI-Powered Summaries**: Generate concise summaries using AI
- 🧠 **Interactive Quizzes**: Test knowledge with automatically generated quiz questions
- 📊 **Quiz Results & Analytics**: Review answers with detailed explanations
- 🔐 **User Authentication**: Secure registration and login system
- 💾 **Summary Management**: View and manage all your document summaries

## Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS 4
- **Icons**: Lucide React
- **Backend**: ASP.NET Core API (runs on port 5085)
- **Authentication**: JWT Bearer tokens

## Getting Started

### Prerequisites

- Node.js 18+ installed
- .NET 8 SDK (for backend)
- npm, yarn, pnpm, or bun package manager

### 1. Start the Backend (Required)

The application requires a backend API server running on `http://localhost:5085`.

**Navigate to your backend project directory and run:**

```bash
# Using .NET CLI
dotnet run

# Or if using Visual Studio
# Press F5 or click the "Run" button
```

The backend should start on `http://localhost:5085` with the following API endpoints:

- `/api/user/register` - User registration
- `/api/user/login` - User authentication
- `/api/summary/create` - Upload and create PDF summary
- `/api/summary/getall` - Get all user summaries
- `/api/summary/{id}` - Get specific summary
- `/api/quiz/get/quiz-questions/{summaryId}` - Generate quiz questions
- `/api/quiz/question/answer/{questionId}` - Submit quiz answer
- `/api/quiz/get/quiz-summary/{quizId}` - Get quiz results
- `/api/quiz/get/questions/{quizId}` - Get questions with answers

### 2. Install Frontend Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run the Frontend Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Application Structure

### Pages & Routes

- **`/`** - Landing page with app overview
- **`/auth`** - Login and registration page
- **`/dashboard`** - User dashboard displaying all summaries
- **`/summary/[id]`** - Individual summary view with quiz functionality

### Main Components

#### Authentication (`components/auth/`)

- **`LoginForm.jsx`** - User login form with email/password validation
- **`RegisterForm.jsx`** - User registration form

#### Dashboard (`components/dashboard/`)

- **`UploadPDF.jsx`** - PDF file upload component with drag-and-drop
- **`SummariesGrid.jsx`** - Grid display of all user summaries
- **`SummaryCard.jsx`** - Individual summary card with click-to-view

#### Summary View (`components/summary/`)

- **`SummaryView.jsx`** - Displays the AI-generated summary
- **`QuizTaking.jsx`** - Interactive quiz interface
- **`QuizResults.jsx`** - Results display with correct/incorrect answers

#### Shared (`components/shared/`)

- **`Navbar.jsx`** - Navigation bar with authentication state

### API Client (`lib/api.js`)

Centralized API client with methods for:

- User authentication (register, login)
- Summary management (create, getAll, get)
- Quiz operations (getQuizQuestions, submitAnswer, getQuizSummary, getQuestionsWithAnswers)

All API calls automatically include JWT authentication headers when required.

## User Flow

1. **Register/Login** → User creates account or logs in
2. **Upload PDF** → User uploads a PDF document from dashboard
3. **View Summary** → AI generates and displays document summary
4. **Take Quiz** → User clicks "Take Quiz" to test comprehension
5. **Answer Questions** → User answers multiple-choice questions
6. **Review Results** → View score and detailed answer explanations

## Configuration

### Backend API URL

The API base URL is configured in `lib/api.js`:

```javascript
const API_BASE = 'http://localhost:5085/api';
```

To use a different backend URL, update this constant.

### Authentication

The app uses JWT tokens stored in `localStorage`:

- `token` - JWT authentication token
- `user` - User information (email)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Learn More

To learn more about Next.js:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
