# Blog App - Node.js, Express.js, MongoDB

## Features

- User registration and login
- JWT-protected blog creation
- MongoDB database integration
- Secure password storage using bcrypt
- View all blogs
- View individual blog details

## Setup

1. Extract the project.
2. Install backend dependencies:

```bash
cd blog-app/backend
npm install
```

3. Configure `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/blogapp
JWT_SECRET=change_this_to_a_long_random_secret
```

For MongoDB Atlas, use:

```env
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/blogapp
```

4. Start MongoDB, then run:

```bash
npm start
```

5. Open `blog-app/frontend/index.html` in your browser.

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Register user |
| POST | `/api/auth/login` | No | Login user |
| POST | `/api/blogs` | Yes | Create blog |
| GET | `/api/blogs` | No | Get all blogs |
| GET | `/api/blogs/:id` | No | Get single blog details |

## Security Notes

- Passwords are hashed with bcrypt before saving.
- JWT is used for protected routes.
- Never commit your real `.env` file or JWT secret to GitHub.
