# PDF Question Answer App

## 🚀 Live Demo

[👉 Open PDF Question Answer App](https://pdfreader-frontend-5lk4.onrender.com/)

## Run locally

### 1. Backend
Open a terminal:
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
OPENROUTER_API_KEY=YOUR_OPENROUTER_API_KEY
```

Then run:
```bash
npm run dev
```

Backend should show:
`Server running on http://localhost:5000`

### 2. Frontend
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally:
`http://localhost:5173`

The frontend now uses `/api` and Vite forwards API requests to `http://localhost:5000`.
