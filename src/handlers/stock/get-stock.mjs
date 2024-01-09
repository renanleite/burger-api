import { createDbClient } from "../db.mjs";

export const getStockHandler = async (event) => {
  if (event.httpMethod !== "GET") {
    throw new Error(
      `getStock only accept GET method, you tried: ${event.httpMethod}`
    );
  }
  console.info("received:", event);

  try {
    const postgresClient = createDbClient();
    await postgresClient.connect();
    
    const query = "SELECT * FROM stock";
    const result = await postgresClient.query(query);

    const items = result.rows;

    const response = {
      statusCode: 200,
      body: JSON.stringify(items),
    };

    console.info(
      `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
    );
    return response;
  } catch (err) {
    console.error("Error", err);

    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };

    return response;
  }
};
