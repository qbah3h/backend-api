const store = require('../app');
const assert = require('assert')
const request = require('supertest')

describe('Check if the login validation works (/stores)', function() {
    it('Should return error 401', async () => {
        const response = await request(store).get('/api/stores').auth('fakeusername', 'fakepassword').send()
        assert.equal(response.statusCode, 401)
    })
    it('Should return error 200', async () => {
        const response = await request(store).get('/api/stores').auth('test@koibanx.com', 'admin').send()
        assert.equal(response.statusCode, 200)
    })
})

// Get all stores API

// inputs = username

// if there is a username and is not valid return 401
// if there is a valid user then return 200