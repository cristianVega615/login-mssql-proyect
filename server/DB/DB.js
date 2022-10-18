const sql = require("mssql");
const config = {
  user: "proyecto-sql",
  password: process.env.PASSWORD,
  server: String(process.env.SERVER),
  database: process.env.DATABASE,
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
