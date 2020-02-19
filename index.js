const item = {
    itemId: '02bbdbc7-e22e-4153-abd8-b5732a4ba6b5',
    name: 'Ball cap',
    description: 'Drake stuff',
    price: 19.99,
    size: 'Large'
};

const firstName = 'Jason';
const lastName = 'Bradley';

const customer = {
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@drake.edu`,
    phoneNumber: '+15155555555'
};

const cart = {
	    cartId: 'c229050f-a8b0-4647-8d48-0895b351a762',
        cartOwner: '03d03290-60c6-4734-b9f0-567ec5f8292a',
        createDate: '2020-02-13',
        purchasedDate: '2020-02-13'
};

const cartItem = {
	itemID: 'd3ce247c-084d-47ee-8cc0-2c7747d26d70', 
    quantity: 2,
    cartID: 'c229050f-a8b0-4647-8d48-0895b351a762',
    cartItemID: '6c635974-f925-454e-9c66-a14c5b869d17'
};
console.log('item', item);
console.log('customer', customer);
console.log('cart', cart);
console.log('cartItem',cartItem);