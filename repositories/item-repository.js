const uuid = require('uuid');

const items = [
    {
        'description': 'It can hold coffee and thumbtacks',
        'item_id': uuid.v4(),
        'name': 'Griff Mug',
        'price': 12.99
    },
    {
        'description': '2017 volkswagen beetle',
        'item_id': uuid.v4(),
        'name': 'GriffMobile',
        'price': 23000
    }
];

const selectItems = () => ({
    driver: 'postgres',
    error: new Error(),
    rows: items
});

const selectItemByItemId = (itemId) =>
    items.find((item) => item['item_id'] === itemId);

module.exports = {
    selectItemByItemId,
    selectItems
};
