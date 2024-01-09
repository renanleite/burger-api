// Import addItemStockHandler function from add-item-stock.mjs 
import { addItemStockHandler } from '../src/handlers/stock/add-item-stock.mjs';
// Import dynamodb from aws-sdk 
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from "aws-sdk-client-mock";
// This includes all tests for addItemStockHandler() 
describe('Test addItemStockHandler', function () { 
    const ddbMock = mockClient(DynamoDBDocumentClient);
 
    beforeEach(() => {
        ddbMock.reset();
      });
 
    // This test invokes addItemStockHandler() and compare the result  
    it('should add id to the table', async () => { 
        const returnedItem = { id: 'id1', name: 'name1' }; 
 
        // Return the specified value whenever the spied put function is called 
        ddbMock.on(PutCommand).resolves({
            returnedItem
        }); 
 
        const event = { 
            httpMethod: 'POST', 
            body: '{"id": "id1","name": "name1"}' 
        }; 
     
        // Invoke addItemStockHandler() 
        const result = await addItemStockHandler(event); 
        
        const expectedResult = { 
            statusCode: 200, 
            body: JSON.stringify(returnedItem) 
        }; 
 
        // Compare the result with the expected result 
        expect(result).toEqual(expectedResult); 
    }); 
}); 
 