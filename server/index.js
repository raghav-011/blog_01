import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Components
import Connection from './database/db.js';
import Router from './routes/route.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // Built-in JSON parser
app.use(express.urlencoded({ extended: true }));  // Built-in URL-encoded parser

// Debugging middleware to log request body
app.use((req, res, next) => {
    console.log('Request Body:', req.body);
    next();
});

// Routes
app.use('/', Router);

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err);
        return res.status(400).json({ error: 'Invalid JSON' });
    }
    next();
});

const PORT = 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// Database connection
Connection(username, password);

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
