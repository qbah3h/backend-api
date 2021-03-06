const logger = require('../utils/logger');
const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Store = require('../models/store')
let bcrypt = require('bcrypt-nodejs');
const { check, validationResult } = require('express-validator');

router.route('/stores')
  .get(function (req, res, next) {
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    logger.info("get pending validations")
    User.find({
      'username': username
    })
      .then(user => {
        if (!user[0]) {
          res.status(401).send({
            message: 'Invalid password or username.'
          });
          logger.error('Invalid password or username.')
        } else {
          bcrypt.compare(password, user[0].password, function (err, result) {
            if (result) next()
            else {
              res.status(401).send({
                message: 'Invalid password or username.'
              });
              logger.error('Invalid password or username.')
            }
          });

        }
      })
      .catch(err => {
        logger.error(err)
        res.status(501).send(error);
      })
  },
    function (req, res) {
      logger.info("get pending use case")
      const limit = req.query.limit ? parseInt(req.query.limit) : 0
      const page = req.query.page ? parseInt(req.query.page) : 0

      Store.find({}).limit(limit).skip(limit * page)
        .then(store => {
          let response = {
            data: store,
            page: page,
            pages: 30,
            limit: limit,
            total: 300
          }
          res.status(200).json(response);
        })
        .catch(err => {
          logger.error(err)
          res.status(502).send(error);
        })
    })
  .post([
    check('name', 'This field is mandatory and 3+ characters long.')
      .notEmpty()
      .isLength({ min: 3 }),
    check('cuit', 'In the future this field will be autogenerated.')
      .notEmpty()
  ], (req, res, next) => {
    logger.info("post pending validations")
    //similar login validator as get, can be refactored as a midleware
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    } else {
      next()
    }
  },
    function (req, res) {
      logger.info("post pending use case")
      //same as seeder function
      res.send('post')
    });

module.exports = router;
