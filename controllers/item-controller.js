const {
    getAllItems,
    getItemByItemId
} = require('../services/item-service');

const getItemsRoute = (server) => {
    server.route({
        handler: () => getAllItems(),
        method: 'GET',
        path: '/items'
    });
};

const getItemByItemIdRoute = (server) => {
    server.route({
        handler: (request, h) => {
            const item = getItemByItemId(request.params.itemId);

            if (!item) {
                return h.response().code(404);
            }

            return item;
        },
        method: 'GET',
        path: '/items/{itemId}'
    });
};

const initItemControllers = (server) => {
    getItemByItemIdRoute(server);
    getItemsRoute(server);
};

module.exports = {
    initItemControllers
};
