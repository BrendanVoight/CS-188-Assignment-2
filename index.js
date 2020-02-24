const Hapi = require('@hapi/hapi');
const uuid = require('uuid');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    const johnId = uuid.v4();
    const customerJohn = {
        customerId: johnId,
        name: 'John',
        lname: 'Smith',
        email: 'jsmith@drake.edu'
        phone: '5152713004'
    };

    const customerJill = {
        customerId: uuid.v4(),
        name: 'Jill',
        lname: 'Smith',
        email: 'jillsmith@drake.edu',
        phone: '5152713003'
    };

    const customerBrendan = {
        customerId: uuid.v4(),
        name: 'Brendan',
        lname: 'Voight',
        email: 'brendan.voight@drake.edu',
        phone: '5152713002'

    };

    const customerTanner = {
        customerId: uuid.v4(),
        name: 'Tanner',
        lname: 'Krause',
        email: 'tanner.krause@kumandgo.com',
        phone: '5152713001'

    };


    let customers = [customerJohn, customerJill, customerBrendan, customerTanner];

    server.route({
        method: 'GET',
        path: '/customers',
        handler: (request, h) => {
            return customers;
        }
    });

    server.route({
        method: 'POST',
        path: '/customers',
        handler: (request, h) => {
            const customer = request.payload;
            const existingcust = customers.find((cust) => cust.customerId === customer.customerId);

            if (existingcust) {
                return h.response(existingcust).code(303);
            } else {
                customers.push(customer);

                return h.response(customer).code(201);
            }

        }
    });


    server.route({
        method: 'GET',
        path: '/customers/{customerId}',
        handler: (request, h) => {
            const {customerId} = request.params;
            const customer = customers.find((cust) => cust.customerId === customerId);

            if (!customer) {
                return h.response().code(404);
            }

            return customer;
        }
    });

    server.route({
        method: 'PUT',
        path: '/customers/{customerId}',
        handler: (request, h) => {
            const {customerId} = request.params;
            const updatedcustomer = request.payload;
            const customer = customers.find((cust) => cust.customerId === customerId);

            if (!customer) {
                return h.response().code(404);
            }

            if (customerId !== updatedcustomer.customerId) {
                return h.response().code(409);
            }

            let newcustomers = [];

            customers.forEach((cust) => {
                if (cust.customerId === customerId) {
                    newcustomers.push(updatedcustomer);
                } else {
                    newcustomers.push(cust);
                }
            });

            customers = newcustomers;

            return h.response().code(204);
        }
    });

    server.route({
        method: 'DELETE',
        path: '/customers/{customerId}',
        handler: (request, h) => {
            const {customerId} = request.params;
            const customer = customers.find((cust) => cust.customerId === customerId);

            if (!customer) {
                return h.response().code(404);
            }

            let newcustomers = [];

            customers.forEach((cust) => {
                if (cust.customerId !== customerId) {
                    newcustomers.push(cust);
                }
            });

            customers = newcustomers;

            return h.response().code(204);
        }
    });


    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();