import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SummaQuiz - AI-Powered Learning Assistant',
  description: 'Transform learning with AI intelligence. Get smart summaries, and interactive quizzes.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}