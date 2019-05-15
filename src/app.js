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
app.use(express.static((path.join__dirname,'public')));

//render
app.get('/', (req, res ) => res.render('index', {title: 'Index'}));

app.listen(3000, () => console.log('listening on port 3000'))