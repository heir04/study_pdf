/**
 * JSDoc typedefs to describe shapes used across the app.
 * This file provides runtime-valid JavaScript and developer-facing typedefs for editors.
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 */

/**
 * @typedef {Object} Summary
 * @property {string} id
 * @property {string} title
 * @property {string} userId
 * @property {string} content
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Question
 * @property {string} id
 * @property {string} quizId
 * @property {number} questionNumber
 * @property {string} questionText
 * @property {string[]} options
 * @property {string} [answer]
 * @property {string} [explanation]
 * @property {boolean} isAnswered
 * @property {boolean} [isAnsweredCorrectly]
 * @property {string|null} userAnswer
 */

/**
 * @typedef {Object} QuizSummaryData
 * @property {string} id
 * @property {number} totalQuestions
 * @property {number} answeredCount
 * @property {number} score
 * @property {string} createdAt
 */

/**
 * @template T
 * @typedef {Object} ApiResponse
 * @property {string} message
 * @property {boolean} status
 * @property {T|null} data
 */

// Export an empty object to keep this module a valid ESM module.
export {};