const {
    selectCustomers,
    selectCustomerByCustomerId
} = require('../repositories/customer-repository');

describe('customer repository', () => {
    let firstCustId,
        secondCustId,
        expectedFirstCust,
        expectedSecondCust;

    beforeEach(() => {
        firstCustId = 'd83ff143-9f8b-445a-8d8f-b9b8fe0f9f28';
        secondCustId = 'd83ff143-9f8b-445a-8d8f-b9b8fe0f9f27';

        expectedFirstCust = {
            'customer_id': firstCustId,
            'email': 'jason.bradley@drake.edu',
            'first_name': 'Jason',
            'last_name': 'Bradley'

        };

        expectedSecondCust = {
            'customer_id': secondCustId,
            'email': 'email.email@drake.edu',
            'first_name': 'Samuel',
            'last_name': 'Downey'
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

    describe('selectCustomerByCustomerId', () => {
        it('should return a specific customer by cusomterId', () => {
            const actualFirstCust = selectCustomerByCustomerId(firstCustId);

            expect(actualFirstCust).toEqual(expectedFirstCust);

            const actualSecondCust = selectCustomerByCustomerId(secondCustId);

            expect(actualSecondCust).toEqual(expectedSecondCust);
        });
    });
});
