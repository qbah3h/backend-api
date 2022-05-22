const User = require('../models/user')
const Store = require('../models/store')
const logger = require('../utils/logger')

exports.init = async function () {
    try {
        if (await User.countDocuments({ "username": "test@koibanx.com" })) {
            return
        }

        let user = new User();
        user.username = "test@koibanx.com";
        user.password = "admin";
        await User.create(user);

        logger.info("Test User created")
    } catch (err) {
        logger.error(err)
    }
}

exports.seeder = async () => {
    try {
        for (let i = 0; i < 4; i ++) {
            if (await Store.countDocuments({ "cuit": `ABCD23${i}` })) {
                return
            }

            let store = new Store();
            store.name = `Store ${i}`;
            store.cuit = `ABCD23${i}`;
            store.concepts = [`concept ${i}`, `concept ${i + 1}`, `concept ${i + 2}`];
            store.currentBalance = 100 * i;
            store.active = true;
            store.lastSale = new Date();
            await Store.create(store);

            logger.info(`Test Store number ${i} created`)
        }
    } catch (err) {
        logger.error(err)
    }
}
