const mongoose = require('mongoose');
const logger = require('./utils/logger');
mongoose.Promise = Promise;

const express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const config = require('config');
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/api', require('./routes/stores'));

mongoose.connect(`mongodb+srv://${config.get('mongodb.dbname')}:${config.get('mongodb.password')}@cryptocommerce.udldu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(config.get('port'), () => {
            require('./utils/initializer').init().then(require('./utils/initializer').seeder())
            logger.info('API initialized on port ' + config.get('port'))
        });
    })
    .catch((error) => console.log(error))


module.exports = app