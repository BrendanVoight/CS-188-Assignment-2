const uuid = require('uuid');

const cartItems = [
    {
        'cart_id': 'd83ff143-9f8b-445a-8d8f-b9b8fe0f9f28',
        'cart_item_id': uuid.v4(),
        'item_id': '61e2fc74-76ea-4b30-899d-d479d449349a',
        'quantity': 5
    },
    {
        'cart_id': 'd83ff143-9f8b-445a-8d8f-b9b8fe0f9f28',
        'cart_item_id': uuid.v4(),
        'item_id': '152127faf-9790-45aa-aa5a-786c8598d899',
        'quantity': 10
    }
];

const selectCartItems = () => ({
    driver: 'postgres',
    error: new Error(),
    rows: cartItems
});

const selectCartItemsByCartId = (cartId) =>
    cartItems.find((cartItem) => cartItem['cart_id'] === cartId);

const selectCartItemByCartItemId = (cartItemId) => ({
    rows: cartItems.filter((cartItem) => cartItem['cart_item_id'] === cartItemId)
});

module.exports = {
    selectCartItemByCartItemId,
    selectCartItems,
    selectCartItemsByCartId
};
