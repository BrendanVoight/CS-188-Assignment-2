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
        expectedFirstCustId = 'd83ff143-9f8b-445a-8d8f-b9b8fe0f9f28';

        expectedFirstCust = {
            'customer_id': 'd83ff143-9f8b-445a-8d8f-b9b8fe0f9f28',
            'email': 'jason.bradley@drake.edu',
            'first_name': 'Jason',
            'last_name': 'Bradley'
        };

        selectCustomers.mockReturnValue({
            rows: [{
                'customer_id': expectedFirstCustId
            }]
        });

        selectCustomerByCustomerId.mockReturnValue({
                'customer_id': expectedFirstCustId,
                'email': 'jason.bradley@drake.edu',
                'first_name': 'Jason',
                'last_name': 'Bradley'
        });
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
