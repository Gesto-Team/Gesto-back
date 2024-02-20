export default () => ({
  jwtSecret: process.env.JWT_SECRET || 'no secret',
  database: {
    host: process.env.DATABASE_URL,
    port: parseInt(process.env.DATABASE_PORT || 'no port', 10),
    name: process.env.DATABASE_NAME,
  },
});
