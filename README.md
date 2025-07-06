# GoalSetter - Personal Goal Tracking Application

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Deployment](#deployment)
- [Live Demo](#live-demo)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Features](#features)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Frontend Architecture](#frontend-architecture)
- [State Management](#state-management)
- [Routing](#routing)
- [Styling & UI](#styling--ui)

## 🎯 Project Overview

**GoalSetter** is a comprehensive personal goal tracking application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to create, manage, and track their personal goals with an intuitive category-based organization system.

## 🚀 Deployment

### Backend Deployment (Render)
- **Platform**: Render.com
- **URL**: https://goalsetter-v1.onrender.com
- **Environment**: Production
- **Database**: MongoDB Atlas

### Frontend Deployment (Netlify)
- **Platform**: Netlify
- **URL**: https://goalsetter-arpanvala.netlify.app/
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

### Key Highlights
- **Personal Goal Management**: Create, update, and delete goals with priority levels and due dates
- **Category Organization**: Organize goals into custom categories for better management
- **Dashboard Analytics**: Visual statistics showing goal progress and completion rates
- **User Authentication**: Secure login/register system with JWT tokens
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS

## 🌐 Live Demo

- **Frontend**: [https://goalsetter-arpanvala.netlify.app/](https://goalsetter-arpanvala.netlify.app/)
- **Backend API**: [https://goalsetter-v1.onrender.com](https://goalsetter-v1.onrender.com)

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **CORS**: Cross-Origin Resource Sharing enabled
- **Environment**: dotenv for configuration

### Frontend
- **Framework**: React.js 19.1.0
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI, Lucide React Icons
- **Notifications**: React Toastify

## 🏗 Project Architecture

```
GoalSetter/
├── backend/                 # Express.js API server
│   ├── config/             # Database configuration
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Custom middleware
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   └── server.js          # Main server file
├── frontend/              # React.js application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── features/      # Redux slices and services
│   │   ├── pages/         # Page components
│   │   └── app/           # Redux store configuration
│   └── public/            # Static assets
└── package.json           # Root package configuration
```

## ✨ Features

### Core Functionality
1. **User Authentication**
   - User registration and login
   - JWT-based session management
   - Secure password hashing

2. **Goal Management**
   - Create, read, update, delete goals
   - Set priority levels (High, Medium, Low)
   - Set due dates with validation
   - Mark goals as completed/incomplete

3. **Category Management**
   - Create custom categories
   - Rename and delete categories
   - Organize goals by categories

4. **Dashboard Analytics**
   - Total categories count
   - Total goals count
   - Completed goals count
   - Due goals count
   - Category-wise progress tracking

5. **User Experience**
   - Responsive design for all devices
   - Loading states and error handling
   - Toast notifications for user feedback
   - Intuitive navigation

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GoalSetter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the server**
   ```bash
   npm start
   # or for development with nodemon
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

### Backend Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection configuration
├── controllers/
│   ├── userController.js  # User authentication logic
│   ├── goalController.js  # Goal CRUD operations
│   └── categoryController.js # Category CRUD operations
├── middleware/
│   ├── authMiddleware.js  # JWT authentication middleware
│   └── errorMiddleware.js # Global error handling
├── models/
│   ├── userModel.js       # User schema
│   ├── goalModel.js       # Goal schema
│   └── categoryModel.js   # Category schema
├── routes/
│   ├── userRoutes.js      # User authentication routes
│   ├── goalRoutes.js      # Goal management routes
│   └── categoryRoutes.js  # Category management routes
└── server.js              # Main server entry point
```

### Frontend Structure

```
frontend/src/
├── app/
│   └── store.js           # Redux store configuration
├── components/
│   ├── CategoryList.jsx   # Category display component
│   ├── CategoryModel.jsx  # Category creation modal
│   ├── DeleteModal.jsx    # Confirmation modal
│   ├── Loading.jsx        # Loading component
│   ├── Navbar.jsx         # Navigation component
│   └── RenameCategoryModal.jsx # Category rename modal
├── features/
│   ├── auth/
│   │   ├── authService.js # Authentication API calls
│   │   └── authSlice.js   # Redux auth state management
│   ├── categories/
│   │   ├── categoryService.js # Category API calls
│   │   └── categorySlice.js   # Redux category state
│   └── goals/
│       ├── goalService.js # Goal API calls
│       └── goalSlice.js   # Redux goal state management
├── pages/
│   ├── AddGoalPage.jsx    # Goal creation page
│   ├── CategoryPage.jsx   # Category detail page
│   ├── Dashboard.jsx      # Main dashboard
│   ├── EditGoalPage.jsx   # Goal editing page
│   ├── HomePage.jsx       # Landing page
│   ├── LoginPage.jsx      # User login
│   ├── RegisterPage.jsx   # User registration
│   └── NotFound404.jsx    # 404 error page
├── App.jsx                # Main app component
└── main.jsx              # App entry point
```


## 🎨 Frontend Architecture

### State Management with Redux Toolkit

The application uses Redux Toolkit for centralized state management with three main slices:

1. **Auth Slice** (`authSlice.js`)
   - Manages user authentication state
   - Handles login, register, and logout actions
   - Stores user information and authentication status

2. **Goals Slice** (`goalSlice.js`)
   - Manages goal-related state
   - Handles CRUD operations for goals
   - Tracks loading states and errors

3. **Categories Slice** (`categorySlice.js`)
   - Manages category-related state
   - Handles CRUD operations for categories
   - Tracks loading states and errors

### Routing Structure

```jsx
<Routes>
  <Route path="/" element={<HomePage/>} />
  <Route path="/login" element={<LoginPage/>} />
  <Route path="/register" element={<RegisterPage/>} />
  <Route path="/dashboard" element={<Dashboard/>}/>
  <Route path="/category/:id" element={<CategoryPage/>} />
  <Route path="/add-goal" element={<AddGoalPage/>} />
  <Route path="/edit/:id" element={<EditGoalPage/>}/>
  <Route path="*" element={<NotFound404/>}/>
</Routes>
```

## 🔄 State Management

### Redux Store Configuration
The application uses Redux Toolkit's `configureStore` with the following configuration:

```javascript
const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    categories: categoryReducer
  }
})
```

### Async Actions
All API calls are handled using Redux Toolkit's `createAsyncThunk` for:
- User authentication (register, login, logout)
- Goal operations (create, read, update, delete)
- Category operations (create, read, update, delete)

## 🎯 Routing

### Public Routes
- `/` - Landing page
- `/login` - User login
- `/register` - User registration

### Protected Routes
- `/dashboard` - Main dashboard with statistics
- `/category/:id` - Category detail page
- `/add-goal` - Create new goal
- `/edit/:id` - Edit existing goal

### Error Handling
- `*` - 404 Not Found page

## 🎨 Styling & UI

### Design System
- **Framework**: Tailwind CSS for utility-first styling
- **Icons**: Lucide React for consistent iconography
- **Components**: Headless UI for accessible components
- **Responsive**: Mobile-first responsive design

### Key Design Features
- Clean and modern interface
- Consistent color scheme (violet/blue theme)
- Smooth animations and transitions
- Loading states and error handling
- Toast notifications for user feedback

## 👨‍💻 Author

**Arpan Vala** - Personal goal tracking application built with MERN stack.

---
