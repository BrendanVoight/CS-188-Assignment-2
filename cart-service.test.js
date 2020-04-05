const uuid = require('uuid');

const {
    getAllCarts,
    getCartsByCartId,
    getCartsByCustomerId,
    addCart,
    modifyCart,
    removeCartByCartId
} = require('../services/cart-service');
const {
    selectCarts,
    selectCartByCartId,
    selectCartsByCustomerId,
    insertCart,
    updateCart,
    deleteCartByCartId
} = require('../repositories/cart-repository');

jest.mock('../repositories/cart-repository');

describe('getAllCarts', () => {
    let expectedFirstCart,
        expectedFirstCartId,
        expectedCustomerId;

    beforeEach(() => {
        expectedFirstCartId = uuid.v4();
        expectedCustomerId = uuid.v4();

        expectedFirstCart = {
            cartId: expectedFirstCartId,
            customerId: expectedCustomerId
        };

        selectCarts.mockReturnValue({
            rows: [{
                'cart_id': expectedFirstCartId,
                'customer_id': expectedCustomerId
            }]
        });

        selectCartsByCustomerId.mockReturnValue({
            rows: [{
                'cart_id': expectedFirstCartId,
                'customer_id': expectedCustomerId
            }]
        });

        selectCartByCartId.mockReturnValue({
            'cart_id': expectedFirstCartId,
            'customer_id': expectedCustomerId
        });
    });

    it('should get all the carts', () => {
        const actualCarts = getAllCarts();

        expect(selectCarts).toHaveBeenCalledTimes(1);

        expect(actualCarts).toEqual([
            expectedFirstCart
        ]);
    });

    it('should get a cart by a specific cartId', () => {
        const actualCart = getCartByCartId(expectedFirstCartId);

        expect(selectCartByCartId).toHaveBeenCalledTimes(1);
        expect(selectCartByCartId).toHaveBeenCalledWith(expectedFirstCartId);

        expect(actualCart).toEqual(expectedFirstCart);
    });

    it('should get all the carts by customerId', () => {
        const actualCarts = getCartsByCustomerId(expectedCustomerId);

        expect(selectCartsByCustomerId).toHaveBeenCalledTimes(1);
        expect(selectCartsByCustomerId).toHaveBeenCalledWith(expectedCustomerId);

        expect(actualCarts).toEqual([
            expectedFirstCart
        ]);
    });

    it('should return null if cartId is non existent', () => {
       selectCartByCartId.mockReturnValue(null);
       const actualCart = getCartsByCartId(expectedFirstCartId);
       expect(actualCart).toBeNull();
    });

    it('should get all carts by a customerId', () => {
       const actualCarts = getCartsByCustomerId(expectedCustomerId);
       expect(selectCartsByCustomerId).toHaveBeenCalledWith(expectedCustomerId);
       expect(selectCartsByCustomerId).toHaveBeenCalledTimes(1);
       expect(actualCarts).toEqual([
           expectedFirstCart
       ]);
    });

    it('should return null if customer id does not exist', () =>{
       selectCartsByCustomerId.mockReturnValue(null);
       const actualCarts = getCartsByCustomerId(expectedCustomerId);
       expect(actualCarts).toBeNull();
    });

    it('should insert a new cart', () => {
       const actualNewCart = addCart(expectedFirstCart);
       expect(insertCart).toHaveBeenCalledWith(expectedFirstCart);
       expect(insertCart).toHaveBeenCalledTimes(1);
       expect(actualNewCart).toEqual(expectedFirstCart);
    });

    it('should update a cart given a cart id', () => {
       const actualCart = modifyCart(expectedFirstCart);
       expect(updateCart).toHaveBeenCalledWith(expectedFirstCart);
       expect(updateCart).toHaveBeenCalledTimes(1);
       expect(actualCart).toEqual(expectedFirstCart);
    });

    it('should delete a cart given a cart id', () => {
       const actualCart = removeCartByCartId(expectedFirstCartId);
       expect(deleteCartByCartId).toHaveBeenCalledWith(expectedFirstCartId);
       expect(deleteCartByCartId).toHaveBeenCalledTimes(1);
       expect(actualCart).toEqual(expectedFirstCart);
    });
});
