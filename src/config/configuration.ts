export default () => ({
  jwtSecret: process.env.JWT_SECRET || 'no secret',
  apiPort: parseInt(process.env.API_PORT || 'no port', 10) || 3001,
  database: {
    host: process.env.DATABASE_URI,
    port: parseInt(process.env.DATABASE_PORT || 'no port', 10) || 27017,
    name: process.env.DATABASE_NAME,
  },
});
