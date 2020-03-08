const uuid = require('uuid');

const {
    selectCustomers,
    selectCustomerByCustomerId
} = require('../repositories/customer-repository');

describe('customer repository', () => {
    let firstCustId,
        secondCustId,
        expectedCustId,
        expectedFirstCust,
        expectedSecondCust;

    beforeEach(() => {
        firstCustId = '056db235-433b-479d-9bab-3177140d46aa';
        secondCustId = 'd3d55b74-d783-4095-afd6-415cd0e3c92a';

        expectedFirstCust = {
            'customer_id': firstCustId,
        };

        expectedSecondCust = {
            'customer_id': secondCustId,
        };
    });


    describe('selectCustomers', () => {
        it('should return all customers', () => {
            const actualCustomers = selectCustomers();
            const [actualFirstCust, actualSecondCust] = actualCustomers.rows;

            expect(actualFirstCust).toEqual(expectedFirstCust);
            expect(actualSecondCust).toEqual(expectedSecondCust);
        });
    });

    describe('selectCustomerByCustomerId', ()=>{
        it('should return a specific customer by cusomterId', () => {
            const actualFirstCust = selectCustomerByCustomerId(firstCustomerId);

            expect(actualFirstCust).toEqual({
                'customer-id': expectedCustomerId
            });

            const actualSecondCust = selectCustomerByCustomerId(secondCustomerId);

            expect(actualSecondCust).toEqual({
                'customer-id': expectedCustomerId
            });
        });
    });
});
