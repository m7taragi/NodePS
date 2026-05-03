const { z } = require('zod');
require('dotenv').config();

const envSchema = z.object({
  // Infrastructure
  PORT: z.string().default('5000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  MONGODB_URI: z.string().url(),

  // Security (SRS NFR-SEC-06/07)
  JWT_SECRET: z.string().min(32),
  COOKIE_SECRET: z.string().min(32),
  BCRYPT_SALT_ROUNDS: z.string().transform(Number).default('12'),

  // Client
  FRONTEND_URL: z.string().url(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('❌ Invalid environment variables:', env.error.format());
  process.exit(1);
}

module.exports = env.data;
