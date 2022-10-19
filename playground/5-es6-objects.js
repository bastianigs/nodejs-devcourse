// Object property shorthand

const name = 'Sebastian'
const userAge = 26

const user = {
    name,
    age: userAge,
    location: 'Iasi'
}

console.log( user );

// Object destructuring

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
    rating: 4.5
}

// const label = product.label
// const stock = product.stock

// const { label:productLabel, stock, rating = 5 } = product;
// console.log( productLabel, stock, rating );

const transaction = (type, { label, stock }) => {
    console.log( type, label, stock );
}

transaction( 'order', product );