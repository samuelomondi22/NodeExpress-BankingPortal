const fs = require('fs');
const path = require('path');

//readFileSync() is synchronous and blocks execution until finished. doesnt take a call back
//readFile() are asynchronous and return immediately while they function in the background. takes a callback(function argument)
const accountData = fs.readFileSync(
    path.join(__dirname, 'json', 'accounts.json'), 'utf8'
);
//parse takes string and returns as a javascript object
//The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(
    path.join(__dirname, 'json', 'users.json'), 'utf8'
);
const users = JSON.parse(userData);


const writeJSON = () => {
    const accountsJSON = JSON.stringify(accounts, null, 4);
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8')
}

module.exports = { accounts, users, writeJSON }