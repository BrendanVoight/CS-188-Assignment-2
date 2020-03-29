const {
    getAllCartItems,
    getCartItemByCartItemId,
    getCartItemsByCartId
} = require('../services/cart-items-service');

const getCartItemsRoute = (server) => {
    server.route({
        handler: () => getAllCartItems(),
        method: 'GET',
        path: '/carts-items'
    });
};

const getCartItemByCartItemIdRoute = (server) => {
    server.route({
        handler: (request, h) => {
            const cartItem = getCartItemByCartItemId(request.params.cartItemId);

            if (!cartItem) {
                return h.response().code(404);
            }

            return cartItem;
        },
        method: 'GET',
        path: '/cart-items/{cartItemId}'
    });
};

const getCartItemsByCartIdRoute = (server) => {
    server.route({
        handler: (request, h) => {
            const cartItems = getCartItemsByCartId(request.params.cartId);

            if (!cartItems) {
                return h.response().code(404);
            }

            return cartItems;
        },
        method: 'GET',
        path: '/carts/{cartId}/cart-items'
    });
};

const initCartItemControllers = (server) => {
    getCartItemsRoute(server);
    getCartItemByCartItemIdRoute(server);
    getCartItemsByCartIdRoute(server);
};

module.exports = {
    initCartItemControllers
};
