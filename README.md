MINI AI TEACHER

This project is a mini learning platform that allows users to select subjects, and to ask questions about the subject selected 
with AI (using OpenAI) and track their learning history.
It includes a structured REST API, a relationed database and a modren web dashboard.

TECHNOLOGIES USED:
Server: Nodejs using Typescript
DB: PostgreSQL with Sequlize ORM 
Client: React using Typescript
AI: OpenAI API
Authentication: JWT-based user auth
Validation: Joi for input validation
Docker Compose for database management

PROJECT STRUCTURE:
The project uses separated layers:
Routes: Defines API endpoints
Controllers: Handles request/response logic
Services: Contains business logic and AI integration
Models: Database schema and relationships
Middlewares: Authentication and error handling

HOW TO START THE PROJECT:
1. Database Setup
Spin up the PostgreSQL database using Docker:
docker-compose up -d

2. Environment Variables (.env)
Create a .env file in the server directory with the following:

PORT=5000
DB_NAME=learningPlatform
DB_USER=user
DB_PASSWORD=1234
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key

Create a .env file in the client directory with the following:
VITE_API_URL=your_localhost_link

3. Installation & Running
Server:
cd server
npm install
npm run dev

Client:
cd client
npm install
npm run dev

Key Features Implemented
User Registration/Login: Secure ID-based authentication.
Smart Dashboard: Category and Sub-category selection.
AI Learning Interface: Real-time chat with OpenAI acting as a teacher.
Personal History: Users can view all their past interactions.
Admin Dashboard: Can view to list all users and their prompt history.

Assumptions Made
User ID: For simplicity in this MVP, users register and login using their ID number as a unique identifier.

Role Management: The system distinguishes between 'user' and 'admin' roles to protect history data.
