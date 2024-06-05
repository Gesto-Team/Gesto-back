export default () => ({
  jwtSecret: process.env.JWT_SECRET || 'no secret',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'no secret',
  apiPort: parseInt(process.env.API_PORT || 'no port', 10) || 3001,
  database: {
    host: process.env.DATABASE_URI,
    port: parseInt(process.env.DATABASE_PORT || 'no port', 10) || 27017,
    name: process.env.DATABASE_NAME,
  },
  clientUrl: process.env.CLIENT_URL || 'localhost:5173',
  gestoSupportEmail: process.env.GESTO_SUPPORT_EMAIL || 'no email',
  gestoSupportPassword: process.env.GESTO_SUPPORT_PASSWORD || 'no password',
});
