# Adventure Log

A personal diary app — photo + caption entries, just for you. Built to practice React,
Node/Express, Postgres, and JWT auth from scratch.

## Stack
- **Frontend:** React + Vite, React Router, Axios
- **Backend:** Node.js + Express
- **Database:** PostgreSQL (hosted on Neon)
- **Auth:** JWT + bcrypt (rolled by hand, no auth library)
- **Image storage:** Cloudinary

## Project structure
```
adventure-log/
├── client/   React frontend
└── server/   Express backend
```

## Setup

### 1. Database (Neon)
1. Create a project at https://neon.tech
2. Copy the connection string it gives you

### 2. Backend
```bash
cd server
cp .env.example .env
# fill in .env with your Neon DATABASE_URL, a JWT_SECRET, and Cloudinary creds
npm install        # already done by Claude, but harmless to re-run
npm run db:setup    # creates the users + entries tables in Neon
npm run dev          # starts the server on http://localhost:5000
```

To generate a random JWT secret quickly:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Frontend
```bash
cd client
cp .env.example .env
npm install         # already done by Claude, but harmless to re-run
npm run dev
```
Visit http://localhost:5173

## API endpoints

| Method | Endpoint            | Auth required | Description              |
|--------|----------------------|----------------|---------------------------|
| POST   | /api/auth/signup      | No             | Create account             |
| POST   | /api/auth/login       | No             | Log in, get JWT            |
| GET    | /api/entries           | Yes            | Get your entries           |
| POST   | /api/entries           | Yes            | Create entry (multipart)   |
| PUT    | /api/entries/:id        | Yes            | Update an entry            |
| DELETE | /api/entries/:id        | Yes            | Delete an entry            |

Authenticated requests need header: `Authorization: Bearer <token>`

## Current state
- ✅ Backend fully wired: signup/login, JWT auth, entries CRUD, Cloudinary upload
- ✅ Frontend fully wired: signup/login pages, protected home route, create/list/delete entries
- ⬜ No styling yet — intentionally left bare so you can design it yourself
- ⬜ Not yet deployed

## Deploy later
- Frontend → Vercel
- Backend → Railway or Render
- Database → already on Neon (works as-is)
