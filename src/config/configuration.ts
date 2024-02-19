export default () => ({
  jwtSecret: process.env.JWT_SECRET || 'no secret',
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || 'no secret', 10) || 5432,
  },
});
