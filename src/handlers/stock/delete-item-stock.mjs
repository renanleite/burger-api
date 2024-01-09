import { createDbClient } from "../db.mjs";

export const deleteItemStockHandler = async (event) => {
  if (event.httpMethod !== "DELETE") {
    throw new Error(
      `Only delete method accepted, you tried: ${event.httpMethod}`
    );
  }
  console.info("received:", event);

  try {
    const { pathParameters } = event;
    const itemId = pathParameters?.id;

    if (!itemId) {
      throw new Error("Missing ID in path parameters");
    }

    const postgresClient = createDbClient();
    await postgresClient.connect();

    const query = "DELETE FROM stock WHERE id_ingredient = $1";
    const result = await postgresClient.query(query, [itemId]);

    const response = {
      statusCode: 200,
      body: `Ingredient with id=${pathParameters.id} removed from stock.`,
    };

    console.info(
      `response from: ${event.path} statusCode: ${response.statusCode}`
    );
    return response;
  } catch (error) {
    console.error("Error", error);
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
    return response;
  }
};
