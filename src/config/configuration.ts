export default () => ({
  jwtSecret: process.env.JWT_SECRET || 'no secret',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'no secret',
  apiPort: parseInt(process.env.API_PORT || 'no port', 10) || 3001,
  database: {
    host: process.env.DATABASE_URI,
    name: process.env.DATABASE_NAME,
  },
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  gestoSupportEmail: process.env.GESTO_SUPPORT_EMAIL || 'no email',
  gestoSupportPassword: process.env.GESTO_SUPPORT_PASSWORD || 'no password',
  swaggerUsername: process.env.SWAGGER_USERNAME || 'no username',
  swaggerPassword: process.env.SWAGGER_PASSWORD || 'no password',
});
