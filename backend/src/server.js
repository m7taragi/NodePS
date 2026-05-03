const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const env = require('./config/env');
// const connectDB = require('./config/database'); // To be implemented

const app = express();

// 1. Security Headers (SRS NFR-SEC-09)
app.use(helmet());

// 2. CORS Lockdown (SRS 3.4)
app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true, // Required for HTTP-only cookies
}));

// 3. Middlewares
app.use(express.json());
app.use(cookieParser(env.COOKIE_SECRET)); // Signed cookies for integrity

// 4. Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'active', timestamp: new Date() });
});

// 5. Future Routes Entry Point (Phase 1)
// app.use('/api/auth', require('./modules/auth/routes'));

const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 NodePS v2.0 Server running in ${env.NODE_ENV} mode on port ${PORT}`);
});
