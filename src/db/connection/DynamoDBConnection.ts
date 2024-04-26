const AWS = require("aws-sdk");

class DynamoDBConnection {
  static async callSingleOperation(action, params) {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    try {
      return await dynamodb[action](params).promise();
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}

export default DynamoDBConnection;
