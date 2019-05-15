//allow us to read and write files
const fs = require('fs');
//configure absolute paths
const path = require('path');
const express = require('express');
const { accounts, users, writeJSON } = require('./data')

const app = express();
//where our views can be found
//shows that what we rendering is from views
app.set('views',path.join(__dirname, 'views'));
//sets all my templates(view engines ) to be on '.ejs'
app.set('view engine', 'ejs');
//tell express how to find our static directory and how to serve those files 
//express.static() is a bit of middleware that maps directory names to the path directory for easy lookup. Usually you'll have
//Static files are best considered as files that are not include by something like NPM or Bower. They are your own scripts, stylesheets, images, etc
//Serve static content for the app from the “public” directory in the application directory
app.use(express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({ extended: true }));


//render
//http GET retrieves info from server
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

app.get('/transfer', (req, res ) => res.render('transfer'));
app.post('/transfer', (req, res) =>{
    accounts[req.body.from].balance = accounts[req.body.from].balance - req.body.amount
    accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount, 10)
    writeJSON();
    res.render('transfer', {message: 'Transfer Completed'})
})

app.get('/payment', (req, res ) => res.render('payment', { account: accounts.credit }));
app.post('/payment', (req, res ) => {
    accounts.credit.balance -= req.body.amount;
    accounts.credit.available += parseInt(req.body.amount, 10);
    writeJSON();
    res.render('payment', { message: 'Payment Successful', account: accounts.credit })
})

app.get('/profile', (req, res) =>{
    res.render('profile', { user: users[0] })
})

app.listen(3000, () => console.log('listening on port 3000'))