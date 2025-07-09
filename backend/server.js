require('dotenv').config();
const  path = require('path');
const express = require('express');
const cors = require('cors');
const {errorHandler} = require('./middleware/errorMiddleware');
const {connectDB} = require('./config/db');

connectDB();

const app = express();

// // Simplified CORS configuration
// const corsOptions = {
//   origin: 'https://goalsetter-arpanvala.netlify.app',
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));

// Alternative: Manual CORS headers (use this if above doesn't work)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://goalsetter-arpanvala.netlify.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
  }
  next();
});


// const allowedOrigins = ['https://goalsetter-arpanvala.netlify.app'];
// app.use(cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like mobile apps or curl)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       } else {
//         console.log("❌ Blocked by CORS:", origin);
//         return callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//     optionsSuccessStatus: 200
// }));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
 
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/goals',require('./routes/goalRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}
);
