import app from './app.js';
import { env } from './config/env.js';
import { sequelize } from './models/index.js';

async function startServer(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Ensure database tables match models
    await sequelize.sync({ alter: false });
    console.log('Database models synchronized.');

    app.listen(env.PORT, () => {
      console.log(`JREDALED Backend Server running on port ${env.PORT} in ${env.NODE_ENV} mode.`);
    });
  } catch (error) {
    console.error('Failed to initialize database connection:', error);
    // In local development/testing without live MySQL server running, still allow app server to start
    app.listen(env.PORT, () => {
      console.log(`JREDALED Backend Server listening on port ${env.PORT} (offline DB mode).`);
    });
  }
}

startServer();
