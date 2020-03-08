const uuid = require('uuid');

const {
    getAllCustomers,
    getCustomerByCustomerId
} = require('../services/customer-service');

const {
    selectCustomers,
    selectCustomerByCustomerId
} = require('../repositories/customer-repository');

jest.mock('../repositories/customer-repository');

describe('getAllCustomers', () => {
    let expectedFirstCust,
        expectedFirstCustId;

    beforeEach(() => {
        expectedFirstCustId = uuid.v4();

        expectedFirstCust = {
            custId: expectedFirstCustId,
        };

        selectCustomers.mockReturnValue({
            rows: [{
                'customer_id': expectedFirstCustId
            }]
        });

        selectCustomerByCustomerId.mockReturnValue({
            rows: [{
                'customer_id': expectedFirstCustId
            }]
        });

        it('should get all customers', () => {
            const actualCustomers = getAllCustomers();

            expect(selectCustomers).toHaveBeenCalledTimes(1);

            expect(actualCustomers).toEqual([
                expectedFirstCust
            ]);
        });

        it('should get a customer by a customer ID', () => {
            const actualCustomers = getCustomerByCustomerId(expectedFirstCustId);

            expect(selectCustomerByCustomerId).toHaveBeenCalledTimes(1);
            expect(selectCustomerByCustomerId).toHaveBeenCalledWith(expectedFirstCustId);

            expect(actualCustomers).toEqual(expectedFirstCust);
        });
    });
});