const dbConfig = {
  // USER: process.env.DATABASE_USER_NAME,
  // PASSWORD: process.env.DATABASE_USER_PASSWORD,
  // DB: process.env.DATABASE_NAME,
  // PORT: process.env.DATABASE_PORT,
  // HOST: process.env.DATABASE_HOST,
  // dialect: process.env.DATABASE_DIALECT,

  USER: "root",
  PASSWORD: "khai2000",
  DB: "blogdb",
  PORT: "3307",
  HOST: "127.0.0.1",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

// console.log(process.env.DATABASE_USER_NAME);

export default dbConfig;
