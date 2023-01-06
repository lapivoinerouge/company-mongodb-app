const express = require('express');
const cors = require('cors');

/* mongoose */
const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

/* routes */
const employeesRoutes = require('./routes/employees.routes');
const departmentsRoutes = require('./routes/departments.routes');
const productsRoutes = require('./routes/products.routes');

/* express */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use('/api', employeesRoutes);
app.use('/api', departmentsRoutes);
app.use('/api', productsRoutes);

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
})

const NODE_ENV = process.env.NODE_ENV;
let dbURI = '';
let isTestEnv = NODE_ENV === 'test';

if(NODE_ENV === 'production') dbURI = '<url_to_remote_db>';
else if(isTestEnv) dbURI = 'mongodb://localhost:27017/companyDBtest';
else dbURI = 'mongodb://localhost:27017/companyDB';

/* connects our backend code with the database */
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  if (!isTestEnv) {
    console.log('Connected to the database');
  }
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen('8000', () => {
  if (!isTestEnv) {
    console.log('Server is running on port: 8000');
  }
});

module.exports = server;
  
