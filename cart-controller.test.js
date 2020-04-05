const Hapi = require('@hapi/hapi');
const uuid = require('uuid');
const {when} = require('jest-when');

const {initCartControllers} = require('../controllers/cart-controller');
const {
    getAllCarts,
    getCartsByCartId,
    getCartsByCustomerId,
    addCart,
    modifyCart,
    removeCartByCartId
} = require('../services/cart-service');

jest.mock('../services/cart-service');

describe('cart controller', () => {
    let fakeServer,
        expectedCart,
        expectedCartId,
        expectedCustomerId,
        expectedCarts;

    beforeAll(() => {
        fakeServer = Hapi.server({
            host: 'localhost',
            port: 3000
        });

        expectedCustomerId = uuid.v4();
        expectedCartId = uuid.v4();
        expectedCart = {
            cartId: expectedCartId
        };
        expectedCarts = [expectedCartId, uuid.v4()];

        getAllCarts.mockReturnValue(expectedCarts);

        when(getCartByCartId)
            .calledWith(expectedCartId)
            .mockReturnValue(expectedCart);

        initCartControllers(fakeServer);
    });

    it('should return all carts', async () => {
        const response = await fakeServer.inject({
            method: 'GET',
            url: '/carts'
        });

        expect(response.statusCode).toEqual(200);
        expect(response.result).toEqual(expectedCarts);
    });

    it('should return a cart by cartId', async () => {
        const response = await fakeServer.inject({
            method: 'GET',
            url: `/carts/${expectedCartId}`
        });

        expect(getCartByCartId()).toHaveBeenCalledWith(expectedCartId);

        expect(response.statusCode).toEqual(200);
        expect(response.result).toEqual(expectedCart);
    });

    it('should return NOT_FOUND if a cart does not exist', async () => {
        const randomCartId = uuid.v4();

        const response = await fakeServer.inject({
            method: 'GET',
            url: `/customers/${randomCartId}`
        });

        expect(getCartByCartId()).toHaveBeenCalledWith(randomCartId);
        expect(response.statusCode).toEqual(404);
    });

    it('should return all carts given a customer id', async () => {
        const response = await fakeServer.inject({
            method: 'GET',
            url: `/customers/${expectedCustomerId}/carts`
        });

        expect(response.statusCode).toEqual(200);
        expect(response.result).toEqual(expectedCarts);
    });

    it('should return NOT_FOUND if a customer does not exist when looking for their carts', async () => {
        const randomCustomerId = uuid.v4();

        const response = await fakeServer.inject({
            method: 'GET',
            url: `/customers/${randomCustomerId}/carts`
        });

        expect(response.statusCode).toEqual(404);
    });

    it('should create a new cart', async () =>{
        expectedCart = {
            cartId: uuid.v4(),
            customerId: uuid.v4()
        };
        const response = await fakeServer.inject({
           method: 'POST',
           payload: expectedCart,
           url: '/carts'
        });
       expect(response.statusCode).toEqual(201);
       expect(response.result).toEqual(expectedCart);
       expect(addCart).toHaveBeenCalledWith(expectedCart);
       expect(addCart).toHaveBeenCalledTimes(1);
    });

    it('should update a cart', async () => {
        const updatedCart = {
            cartId: expectedCartId,
            customerId: expectedCustomerId
        };
        const response = await fakeServer.inject({
           method: 'PUT',
           payload: updatedCart,
           url: '/carts/${expectedCartId}'
        });
        expect(response.statusCode).toEqual(204);
        expect(modifyCart).toHaveBeenCalledWith(updatedCart);
        expect(modifyCart).toHaveBeenCalledTimes(1);
    });

    it('should remove a cart given a cartId', async () => {
       const response = await fakeServer.inject({
          method: 'DELETE',
          url: '/carts/${expectedCartId}'
       });
       expect(response.statusCode).toEqual(204);
       expect(removeCartByCartId).toHaveBeenCalledWith(expectedCartId);
       expect(removeCartByCartId).toHaveBeenCalledTimes(1);
    });
});
