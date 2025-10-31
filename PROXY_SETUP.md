# API Proxy Configuration

## Problem
When deploying to production, browsers block direct requests from the frontend to your backend API due to CORS (Cross-Origin Resource Sharing) restrictions.

## Solution
Created Next.js API routes that act as a proxy between your frontend and backend. The browser makes requests to your own Next.js server (same origin), and Next.js forwards them to the backend server.

## Changes Made

### 1. Created API Route Proxies
All backend endpoints now have corresponding Next.js API routes:

**User Routes:**
- `/app/api/user/register/route.js` - Handles user registration
- `/app/api/user/login/route.js` - Handles user login

**Summary Routes:**
- `/app/api/summary/create/route.js` - Creates new summary from PDF
- `/app/api/summary/getall/route.js` - Gets all user summaries
- `/app/api/summary/[id]/route.js` - Gets specific summary by ID

**Quiz Routes:**
- `/app/api/quiz/questions/[summaryId]/route.js` - Gets quiz questions
- `/app/api/quiz/answer/[questionId]/route.js` - Submits quiz answer
- `/app/api/quiz/summary/[quizId]/route.js` - Gets quiz summary/results
- `/app/api/quiz/results/[quizId]/route.js` - Gets questions with answers

### 2. Updated API Client (`lib/api.js`)
- Changed `API_BASE` from `http://studypdf.runasp.net/api` to `/api`
- All frontend calls now go to local Next.js API routes
- Updated endpoint paths to match new proxy routes

## How It Works

**Before (CORS Issues):**
```
Browser → http://studypdf.runasp.net/api (❌ Blocked by CORS)
```

**After (No CORS Issues):**
```
Browser → /api (Your Next.js Server) → http://studypdf.runasp.net/api (✅ Works!)
```

## Benefits
1. ✅ No CORS issues - browser only talks to your own server
2. ✅ Backend API URL is hidden from frontend users
3. ✅ Better security - can add rate limiting, validation, etc. in proxy
4. ✅ Easy to switch backend URLs without redeploying frontend
5. ✅ Can add caching, logging, or other middleware later

## Configuration
The actual backend URL is now only in the API route files. To change it:
1. Update `API_BASE` constant in each `/app/api/*/route.js` file
2. Or create a shared config file

## Testing
All existing frontend code will work without changes since the API client methods remain the same. Just the underlying URLs changed from external to internal routes.
