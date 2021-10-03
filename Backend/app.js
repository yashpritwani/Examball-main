const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const adminRoutes = require('./routes/admin-routes');
const userRoutes = require('./routes/user-routes');

const HttpError = require('./util/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/images', express.static(path.join('public/images/')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Role'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

// app.use('/api/super-admin', superAdminRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user',userRoutes);
 
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  if (error.code >= 100 && error.code < 600)
    res.status(error.code);
  else
    res.status(500);
  // res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .connect(
    // `mongodb+srv://testUser:RABKIxAlXdvVz0El@cluster0.onngz.mongodb.net/ExamballDb?retryWrites=true&w=majority`
    // `mongodb+srv://testUser:RABKIxAlXdvVz0El@cluster0.onngz.mongodb.net/ExamballDb?retryWrites=true&w=majority`
    `mongodb+srv://testUser:RABKIxAlXdvVz0El@cluster0.onngz.mongodb.net/ExamballDb?retryWrites=true&w=majority`,{
      useUnifiedTopology:true,
      useNewUrlParser:true
    })
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });

