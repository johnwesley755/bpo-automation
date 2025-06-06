# BPO Automation Platform

A modern web application for automating Business Process Outsourcing (BPO) calls using AI-powered voice agents.


## 🚀 Features

- **AI-Powered Voice Calls**: Automate customer interactions using Bland.ai's conversational AI
- **Dynamic Prompt Generation**: Create customized call scripts with Google Gemini AI
- **Call History & Analytics**: Track and analyze all automated calls
- **Transcript Viewer**: Review detailed call transcripts
- **User Authentication**: Secure login and user management
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **UI Components**: Shadcn UI
- **Animation**: Framer Motion
- **State Management**: React Context API
- **Form Handling**: React Hook Form, Zod
- **API Integration**: Bland.ai, Google Gemini AI
- **Build Tool**: Vite

## 📁 Project Structure

```
client/
├── src/
│   ├── assets/                    # Static assets
│   │   └── images/
│   │       └── logo.svg
│   ├── components/                # Reusable UI components
│   │   ├── ui/                    # Shadcn UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── form.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── toast.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   └── dashboard/
│   │       ├── CallForm.tsx
│   │       ├── PromptGenerator.tsx
│   │       ├── CallHistory.tsx
│   │       └── TranscriptViewer.tsx
│   ├── pages/                     # Page components
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── services/                  # API services
│   │   ├── api.ts                 # Base API configuration
│   │   ├── authService.ts         # Authentication service
│   │   ├── blandService.ts        # Bland.ai API service
│   │   ├── geminiService.ts       # Google Gemini API service
│   │   └── storageService.ts      # Data storage service
│   ├── hooks/                     # Custom React hooks
│   │   ├── useAuth.ts
│   │   └── useCallHistory.ts
│   ├── context/                   # React context providers
│   │   ├── AuthContext.tsx
│   │   └── ToastContext.tsx
│   ├── types/                     # TypeScript type definitions
│   │   ├── auth.types.ts
│   │   ├── call.types.ts
│   │   └── api.types.ts
│   ├── utils/                     # Utility functions
│   │   ├── validation.ts
│   │   ├── formatters.ts
│   │   └── storage.ts
│   ├── styles/                    # Global styles
│   │   └── globals.css
│   ├── App.tsx                    # Main App component
│   ├── main.tsx                   # Entry point
│   └── routes.tsx                 # Route definitions
├── public/                        # Public assets
│   ├── favicon.ico
│   └── robots.txt
├── index.html
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── package.json
└── .gitignore
```

