export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      host: process.env.DATABASE_NAME || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
      user: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD,
      url: process.env.DATABASE_URL 


    }
  });


