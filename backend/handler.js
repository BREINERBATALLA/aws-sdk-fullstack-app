const {v4} = require('uuid');
const AWS = require("aws-sdk");
const AWS_REGION = "us-east-1";

AWS.config.update({
  region: AWS_REGION,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const dynamoDBTableName = process.env.TABLE_NAME

exports.getTasks = async function (event) {
  const params = { TableName: dynamoDBTableName };
  const allTask = await scanDynamoRecords(params, []);
  const body = {
    tasks: allTask,
  };
  return buildResponse(200, body);
}

async function scanDynamoRecords(scanParams, itemArray) {
  try {
    // Read Dynamo DB data, pushing into array
    const dynamoData = await dynamoDB.scan(scanParams).promise();
    itemArray = itemArray.concat(dynamoData.Items);

    if (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
      return await scanDynamoRecords(scanParams, itemArray);
    }
    return itemArray;
  } catch (err) {
    console.log("ERROR in Scan Dynamo Records: ", err);
  }
}

exports.saveTask = async function (event) {

  const requestBody = JSON.parse(event.body)

  const uuid1 = v4();

  const response = {
    taskId: uuid1,
    description : requestBody.description
  }

  const params = {
    TableName: dynamoDBTableName,
    Item: response,
  };
  return await dynamoDB
    .put(params)
    .promise()
    .then(
      () => {
        const body = {
          Operation: "SAVE",
          Message: "SUCCESS",
          Item: response,
        };
        return buildResponse(200, body);
      },
      (err) => {
        console.log("ERROR in Save Task: ", err);
      }
    );
}

exports.updateTask = async function (event) {
  const requestBody = JSON.parse(event.body);
  const id = event.pathParameters.taskid
  const params = {
    TableName: dynamoDBTableName,
    Key: {
      taskId: id,
    },
    UpdateExpression: 'set description = :value',
    ExpressionAttributeValues: {
      ":value": requestBody.description,
    },
    ReturnValues: "UPDATED_NEW",
  };

  return await dynamoDB
    .update(params)
    .promise()
    .then(
      (response) => {
        const body = {
          Operation: "UPDATE",
          Message: "SUCCESS",
          UpdatedAttributes: response,
        };
        return buildResponse(200, body);
      })
    .catch((err) => {
        return buildResponse(500, { message: `Internal server ${err}` });
      });
}

exports.deleteTask = async function (event) {

   const id = event.pathParameters.taskid

  const params = {
    TableName: dynamoDBTableName,
    Key: {
      taskId: id,
    },
    ReturnValues: "ALL_OLD",
  };
  return await dynamoDB
    .delete(params)
    .promise()
    .then(
      (response) => {
        const body = {
          Operation: "DELETE",
          Message: "SUCCESS",
          Item: response,
        };
        return buildResponse(200, body);
      },
      (err) => {
        console.log("ERROR in Delete Product: ", err);
      }
    );
}

function buildResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT"
    },
    body: JSON.stringify(body),
    isBase64Encoded: false
  };
}