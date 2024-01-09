// Import getStockHandler function from get-stock.mjs 
import { getStockHandler } from '../src/handlers/stock/get-stock.mjs';
// Import dynamodb from aws-sdk 
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from "aws-sdk-client-mock";
 
// This includes all tests for getStockHandler() 
describe('Test getStockHandler', () => { 
    const ddbMock = mockClient(DynamoDBDocumentClient);
 
    beforeEach(() => {
        ddbMock.reset();
      });
 
    it('should return ids', async () => { 
        const items = [{ id: 'id1' }, { id: 'id2' }]; 
 
        // Return the specified value whenever the spied scan function is called 
        ddbMock.on(ScanCommand).resolves({
            Items: items,
        }); 
 
        const event = { 
            httpMethod: 'GET' 
        };
 
        // Invoke helloFromLambdaHandler() 
        const result = await getStockHandler(event); 
 
        const expectedResult = { 
            statusCode: 200, 
            body: JSON.stringify(items) 
        }; 
 
        // Compare the result with the expected result 
        expect(result).toEqual(expectedResult); 
    }); 
}); 
