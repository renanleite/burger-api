import { createDbClient } from "../db.mjs";

export const addItemStockHandler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    console.info('received:', event);

    try {
        const postgresClient = createDbClient();
        await postgresClient.connect();

        const requestData = JSON.parse(event.body);


        const query = 'INSERT INTO stock (ingredient_name, quantity) VALUES ($1, $2) RETURNING *';
        const result = await postgresClient.query(query, [requestData.ingredient_name, requestData.quantity]);
        
        return {
            statusCode: 200,
            body: JSON.stringify(result.rows[0]),
        };

      } catch (err) {
        console.log("Error", err.stack);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    };
};
