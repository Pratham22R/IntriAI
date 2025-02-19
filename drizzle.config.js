import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './config/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_8jacuJ4hQeGZ@ep-winter-credit-a1nkudp8-pooler.ap-southeast-1.aws.neon.tech/ai-room-design?sslmode=require',
  },
});
