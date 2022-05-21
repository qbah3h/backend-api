const mongoose = require('mongoose');
const logger = require('./utils/logger');
mongoose.Promise = Promise;

const express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const config = require('config');

app.use('/api', require('./routes/stores'));


mongoose.connect(config.get('mongodb.fake'), { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(config.get('port'), () => {
            require('./utils/initializer').init()
            logger.info('API initialized on port ' + config.get('port'))
        });
    })
    .catch((error) => console.log(error))


module.exports = app