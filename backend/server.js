require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {errorHandler} = require('./middleware/errorMiddleware');
const {connectDB} = require('./config/db');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user', require('./routes/userRoutes'));

app.use('/api/goals',require('./routes/goalRoutes'));

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}
);
