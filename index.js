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
    cartId: 'def5cd03-7bf4-49e9-8f0b-380f90c86ec1',
    belongsTo: customer,
    createdDate: '2019-07-21',
    purchasedDate: '2019-09-2'
};

const cartitem = {
  cartId: 'def5cd03-7bf4-49e9-8f0b-380f90c86ec1',
  whatItems: '[]',
  quantity: 0
};

console.log('item', item);
console.log('customer', customer);
console.log('cart', cart);
console.log('cartitem', cartitem);
