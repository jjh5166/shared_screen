module.exports = {
  "name": "default",
  "type": "postgres",
  "host": process.env.DATABASE_HOST,
  "port": process.env.PORT || 5432,
  "username": process.env.pgUSERNAME,
  "password": process.env.pgPASSWORD,
  "database": process.env.DATABASE_NAME,
  "synchronize": true,
  "logging": true,
  "entities": [
    "src/entity/*.*"
  ]
}