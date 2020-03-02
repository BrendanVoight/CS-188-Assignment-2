const uuid = require('uuid');

let items = [
    {
        'item_id': uuid.v4(),
        'name': 'Griff Mug',
        'description': 'It can hold coffee and thumbtacks',
        'price': 12.99
    },
    {
        'item_id': uuid.v4(),
        'name': 'GriffMobile',
        'description': '2017 volkswagen beetle',
        'price': 23000
    }
];

const selectItems = () => ({
    rows: items,
    error: new Error(),
    driver: 'postgres'
});

const selectItemByItemId = (itemId) =>
    items.find((item) => item['item_id'] === itemId);


module.exports = {
    selectItems,
    selectItemByItemId
};
