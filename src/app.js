//allow us to read and write files
const fs = require('fs');
//configure absolute paths
const path = require('path');
const express = require('express');

const app = express();
//where our views can be found
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//tell express how to find our static directory nad how to serve those files 
app.use(express.static(path.join(__dirname,'public')));

const accountData = fs.readFileSync(
    path.join(__dirname, 'json', 'accounts.json'), 'utf8'
);
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(
    path.join(__dirname, 'json', 'users.json'), 'utf8'
);
const users = JSON.parse(userData);

//render
app.get('/', (req, res ) => {
    res.render('index', {title: 'Account Summary', accounts })
});

app.get('/savings', (req, res) => {
    res.render('account', { account: accounts.savings })
})

app.get('/checking', (req, res) => {
    res.render('account', { account: accounts.checking })
})

app.get('/credit', (req, res) => {
    res.render('account', { account: accounts.credit })
})

app.get('/profile', (req, res) =>{
    res.render('profile', { user: users[0] })
})

app.listen(3000, () => console.log('listening on port 3000'))