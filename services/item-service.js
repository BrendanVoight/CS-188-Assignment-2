const {
    selectItems,
    selectItemByItemId
} = require('../repositories/item-repository');

const mapToModel = (item) => ({
    description: item['description'],
    itemId: item['item_id'],
    name: item['name'],
    price: item['price']
});

const getAllItems = () => {
    const {rows} = selectItems();

    return rows.map(mapToModel);
};

const getItemByItemId = (itemId) => {
    const item = selectItemByItemId(itemId);

    return mapToModel(item);
};

module.exports = {
    getAllItems,
    getItemByItemId
};
