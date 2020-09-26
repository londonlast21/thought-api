const mongoose = require('mongoose');
const express = require('express');

// server 
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//app.use(require('./routes'));

// log mongo queries
mongoose.set('debug', true);

// start
app.listen(PORT, () => console.log(`Now connected on localhost:${PORT}`));