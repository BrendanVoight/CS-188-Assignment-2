const {
    getAllItems,
    getItemByItemId
} = require('../services/item-service');

const getItemsRoute = (server) => {
    server.route({
        path: '/items',
        method: 'GET',
        handler: (request, h) => {
            return getAllItems();
        }
    });
};

const getItemByItemIdRoute = (server) => {
    server.route({
        path: '/items/{itemId}',
        method: 'GET',
        handler: (request, h) => {
            const item = getItemByItemId(request.params.itemId);

            if (!item) {
                return h.response().code(404);
            }

            return item;
        }
    });
};

const initItemControllers = (server) => {
    getItemByItemIdRoute(server);
    getItemsRoute(server);
};

module.exports = {
    initItemControllers
};
