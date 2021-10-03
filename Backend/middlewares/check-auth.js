const jwt = require('jsonwebtoken');

const HttpError = require('../util/http-error');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error('Authentication failed!');
    }
    // console.log(req.headers);
    let decodedToken = null;
    // if(req.headers.role == 'SuperAdmin'){
    //   decodedToken = jwt.verify(token, 'SuperAdminTokenPrivateKey');
    // }else 
    if(req.headers.role === 'Admin'){
      decodedToken = jwt.verify(token, 'adminTokenPrivateKey');
    }else if(req.headers.role === 'Student'){
      decodedToken = jwt.verify(token, 'userPrivateKey');
    }
    // console.log(decodedToken)
    req.userData = decodedToken ;
    next();
  } catch (err) {
    console.log(err);
    const error = new HttpError('Authentication failed!!', 403);
    return next(error);
  }
};
