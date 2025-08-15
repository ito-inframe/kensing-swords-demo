import * as uuid from "uuid";
import { Resource } from "sst";
import { APIGatewayProxyEvent } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoDb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export async function main(event: APIGatewayProxyEvent) {
  const sk = `MGD#mg00000066-pf#${event?.pathParameters?.ym}`;
  console.log('sk = ' + sk);
  const params = {
    TableName: "prod-kensing-hermit-sandbox",
    IndexName: "skDataIndex",
    KeyConditionExpression: "sk = :sk",
    ExpressionAttributeValues: {
      ":sk": sk,
    },
  };
  // Request body is passed in as a JSON encoded string in 'event.body'

  try {

    const result = await dynamoDb.send(new QueryCommand(params));
    let res = [];
    for (let i = 0; i < result.Items.length; i++) {
      const el = result.Items[i];
      const mySet = (el.attachments instanceof Set) ? [...el.attachments] : [];
      console.log(mySet);
      el.attachments = mySet;
      res.push(el);
    }
    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ error: message }),
    };
  }
}