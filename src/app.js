//allow us to read and write files
const fs = require('fs');
//configure absolute paths
const path = require('path');
const express = require('express');
const { accounts, users, writeJSON } = require('./data')
const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services')

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

app.use('/account', accountRoutes);

app.use('/services', servicesRoutes)

app.get('/profile', (req, res) =>{
    res.render('profile', { user: users[0] })
})

app.listen(3000, () => console.log('listening on port 3000'))