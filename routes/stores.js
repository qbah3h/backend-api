const logger = require('../utils/logger');
const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Store = require('../models/store')
let bcrypt = require('bcrypt-nodejs');
const url = require('url');
const querystring = require('querystring');

//res.status(200).json(orders);
//res.status(500).send(error);

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
          res.status(500).send({
            message: 'Invalid password or username.'
          });
          logger.error('Invalid password or username.')
        } else {
          bcrypt.compare(password, user[0].password, function (err, result) {
            if (result) next()
            else {
              res.status(500).send({
                message: 'Invalid password or username.'
              });
              logger.error('Invalid password or username.')
            }
          });

        }
      })
      .catch(err => {
        logger.error(err)
        res.status(500).send(error);
      })
  },
    function (req, res) {
      logger.info("get pending use case")
      User.find({
      'username': username
    })
      .then(user => {
        if (!user[0]) {
          res.status(500).send({
            message: 'Invalid password or username.'
          });
          logger.error('Invalid password or username.')
        } else {
          bcrypt.compare(password, user[0].password, function (err, result) {
            if (result) next()
            else {
              res.status(500).send({
                message: 'Invalid password or username.'
              });
              logger.error('Invalid password or username.')
            }
          });

        }
      })
      .catch(err => {
        logger.error(err)
        res.status(500).send(error);
      })
      let response = {
        data: [
          {
            name: 'Store 1',
            cuit: 'ABCDEFG',
            concepts: ['one', 'two', 'tree'],
            currentBalance: 500,
            active: true,
            lastSale: new Date(),
          },
          {}
        ],
        page: 1,
        pages: 30,
        limit: 10,
        total: 300
      }
      res.status(200).json(response);
    })
  .post(function (req, res, next) {
    logger.info("post pending validations")
    //similar login validator as get, can be refactored as a midleware
    next()
  },
    function (req, res) {
      logger.info("post pending use case")
      res.send('post')
    });

module.exports = router;
