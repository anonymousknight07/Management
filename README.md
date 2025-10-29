# Project Management Backend API

A robust and secure backend API for project management built with Node.js, Express, and MongoDB. This API provides comprehensive user authentication and authorization features with JWT-based token management.

## Features

- **User Authentication**
  - User registration with email verification
  - Secure login with JWT tokens
  - Access token and refresh token mechanism
  - Password reset via email
  - Email verification system
  - Logout functionality

- **Security**
  - Password hashing with bcrypt
  - JWT-based authentication
  - Cookie-based token storage
  - CORS configuration
  - Input validation with express-validator

- **Email Integration**
  - Email verification on registration
  - Password reset emails
  - Resend verification email option

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Email Service**: Nodemailer with Mailgen
- **Validation**: express-validator
- **Development**: Nodemon

## Project Structure

```
src/
├── controllers/        # Request handlers
│   ├── auth.controller.js
│   └── healthcheck.controller.js
├── db/                # Database configuration
│   └── index.js
├── middlewares/       # Custom middleware
│   ├── auth.middleware.js
│   └── validators.js
├── models/            # Database models
│   └── userModel.js
├── routes/            # API routes
│   ├── auth.route.js
│   └── healthcheck.route.js
├── utils/             # Utility functions
│   ├── api-error.js
│   ├── api-response.js
│   ├── async-handler.js
│   ├── constants.js
│   └── mail.js
├── validators/        # Input validators
│   └── index.js
├── app.js            # Express app configuration
└── index.js          # Server entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone "https://github.com/anonymousknight07/Management.git"
cd management
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:

Create a `.env` file in the root directory with the following variables:

```env
# Server
PORT=8000

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/your-database-name

# JWT Secrets (Generate strong random strings)
ACCESS_TOKEN_SECRET=your-access-token-secret-key
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your-refresh-token-secret-key
REFRESH_TOKEN_EXPIRY=10d

# CORS
CORS_ORIGIN=http://localhost:8000

# Email Configuration
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=your-app-password

# URLs
FORGOT_PASSWORD_REDIRECT_URL=http://localhost:3000/reset-password -> Your frontend URL
```

4. Start the development server:
```bash
npm run dev
```

Or start in production mode:
```bash
npm start
```

The server will run on `http://localhost:8000` (or your specified PORT)

## API Endpoints

### Public Endpoints

#### Health Check
```
GET /api/v1/healthcheck
```

#### User Registration
```
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### User Login
```
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```
**Response**: Returns user data, accessToken, and refreshToken (also set as httpOnly cookies)

#### Verify Email
```
GET /api/v1/auth/verify-email/:verificationToken
```

#### Forgot Password
```
POST /api/v1/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Reset Password
```
POST /api/v1/auth/reset-password/:resetToken
Content-Type: application/json

{
  "newPassword": "NewSecurePass123"
}
```

#### Refresh Access Token
```
POST /api/v1/auth/refresh-token
```
Requires refreshToken in cookies or request body

### Protected Endpoints

These endpoints require authentication. Include the access token in one of two ways:

1. **Cookie** (automatically sent after login)
2. **Authorization Header**: `Authorization: Bearer <accessToken>`

#### Get Current User
```
GET /api/v1/auth/current-user
Authorization: Bearer <accessToken>
```

#### Logout
```
POST /api/v1/auth/logout
Authorization: Bearer <accessToken>
```

#### Change Password
```
POST /api/v1/auth/change-password
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "oldPassword": "currentPassword",
  "newPassword": "newPassword123"
}
```

#### Resend Email Verification
```
POST /api/v1/auth/resend-email-verification
Authorization: Bearer <accessToken>
```

## Authentication Flow

1. **Register**: User creates an account and receives a verification email
2. **Verify Email**: User clicks the link in the email to verify their account
3. **Login**: User logs in with credentials and receives:
   - Access Token (short-lived, 1 day)
   - Refresh Token (long-lived, 10 days)
   - Both tokens are also stored as httpOnly cookies
4. **Access Protected Routes**: Use the access token in requests
5. **Token Refresh**: When access token expires, use refresh token to get a new one
6. **Logout**: Clears tokens and cookies

## Testing with Postman/Thunder Client

1. **Register a new user** at `/api/v1/auth/register`
2. **Copy the accessToken** from the login response
3. **For protected routes**, add one of:
   - Header: `Authorization: Bearer YOUR_ACCESS_TOKEN`
   - Or enable "Send cookies automatically" (cookies are set by login)

## Error Handling

The API uses standardized error responses:

```json
{
  "statusCode": 400,
  "message": "Error message here",
  "success": false,
  "errors": []
}
```

## Success Response Format

```json
{
  "statusCode": 200,
  "data": {},
  "message": "Success message",
  "success": true
}
```

## Security Best Practices

- Passwords are hashed using bcrypt (10 rounds)
- JWT tokens are signed with strong secrets
- httpOnly cookies prevent XSS attacks
- CORS is configured for specific origins
- Input validation on all endpoints
- Secure cookie options (httpOnly, secure)

## Development

### Running in Development Mode
```bash
npm run dev
```
Uses nodemon for auto-restart on file changes

### Code Formatting
```bash
npx prettier --write .
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 8000) |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `ACCESS_TOKEN_SECRET` | Secret for access tokens | Yes |
| `ACCESS_TOKEN_EXPIRY` | Access token validity period | Yes |
| `REFRESH_TOKEN_SECRET` | Secret for refresh tokens | Yes |
| `REFRESH_TOKEN_EXPIRY` | Refresh token validity period | Yes |
| `CORS_ORIGIN` | Allowed CORS origins | Yes |
| `MAIL_HOST` | SMTP server host | Yes |
| `MAIL_PORT` | SMTP server port | Yes |
| `MAIL_USER` | Email account username | Yes |
| `MAIL_PASSWORD` | Email account password | Yes |
| `FORGOT_PASSWORD_REDIRECT_URL` | Password reset redirect URL | Yes |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT

## Author

Akshat Pandey

## Support

For issues and questions, please open an issue in the repository.
