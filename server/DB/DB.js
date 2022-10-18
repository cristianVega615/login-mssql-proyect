const sql = require("mssql");
const config = {
  host: "localhost",
  user: "proyecto-sql",
  password: "valerie1234",
  server: "LAPTOP-L4IOLGLJ",
  database: "Users",
  options: {
    trustedconnection: false,
    enableArithAbort: true,
    encrypt: false,
  },
};

async function bdConect() {
  try {
    let BD = await sql.connect(config);

    return BD;
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  bdConect,
};
