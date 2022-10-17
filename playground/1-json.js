const fs = require("fs");
const filePath = "1-json.json";

// const book = {
//     title: "Ego is the Enemy",
//     author: "Ryan Holiday"
// }

// const bookJSON = JSON.stringify(book);

// fs.writeFileSync('1-json.json', bookJSON);

// const dataBuffer = fs.readFileSync( filePath );
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);

// console.log( data.title );

// for the challenge

const dataBuffer = fs.readFileSync(filePath);
const dataJSON = dataBuffer.toString();
const user = JSON.parse(dataJSON);

user.name = "Sebastian";
user.age = 26;

const userJSON = JSON.stringify(user);
fs.writeFileSync( filePath, userJSON );

console.log( fs.readFileSync(filePath).toString() );