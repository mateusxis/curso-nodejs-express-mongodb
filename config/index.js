const jwt_pass = process.env.jwt_pass;
const port = process.env.port ? process.env.port : 3000

module.exports = { jwt_pass, port };