const { Connection, Request } = require('tedious');

// Configuration for Azure SQL Database connection
const config = {
  authentication: {
    options: {
      userName: "YourUsername", // Update with your username
      password: "YourPassword" // Update with your password
    },
    type: "default"
  },
  server: "YourServer.database.windows.net", // Update with your server name
  options: {
    database: "YourDatabaseName", // Update with your database name
    encrypt: true
  }
};

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  const calculation = req.body.calculation;
  let result = 0;
  try {
      result = eval(calculation); // Remember, using eval has security implications
  } catch (error) {
      result = "Error";
  }

  // Create a connection to the database
  const connection = new Connection(config);

  const query = `INSERT INTO CalculationHistory (Calculation, Result) VALUES ('${calculation}', '${result}')`;

  connection.on('connect', err => {
    if (err) {
      context.res = { status: 500, body: err.message };
      context.done();
    } else {
      const request = new Request(query, (err) => {
        if (err) {
          context.res = { status: 500, body: err.message };
        } else {
          context.res = { status: 200, body: { result } };
        }
        context.done();
      });

      connection.execSql(request);
    }
  });

  connection.connect();
};
