const {
    selectCartItems,
    selectCartItemsByCartId,
    selectCartItemByCartItemId
} = require('../repositories/cart-items-repository');

const mapToModel = (cartItems) => ({
    cartId: cartItems['cart_id'],
    cartItemId: cartItems['cart_item_id'],
    itemId: cartItems['item_id'],
    quantity: cartItems['quantity']
});

const getAllCartItems = () => {
    const {rows} = selectCartItems();

    return rows.map(mapToModel);
};

const getCartItemByCartItemId = (cartItemId) => {
    const cart = selectCartItemByCartItemId(cartItemId);

    return mapToModel(cart);
};

const getCartsByCustomerId = (cartId) => {
    const {rows} = selectCartItemsByCartId(cartId);

    return rows.map(mapToModel);
};

module.exports = {
    getAllCartItems,
    getCartItemByCartItemId,
    getCartsByCustomerId
};
