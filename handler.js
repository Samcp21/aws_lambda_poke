"use strict";

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Welcome",
        input: event,
      },
      null,
      2
    ),
  };
};
module.exports.helloUser = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Hola  usuario ${event.pathParameters.name}`,
        input: event,
      },
      null,
      2
    ),
  };
};
