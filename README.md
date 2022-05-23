The App is hosted in Heroku at https://hidden-bayou-11284.herokuapp.com/api/stores.

Observations: 

-password is 'admin' instead of 'test123'.

-database connection implementation was changed to used the one provided in ATLAS.

-database example is hosted in ATLAS.

Set timeout of 5 to avoid bd connection delay or refactor the code to fix it when connecting

node ./node_modules/mocha/bin/mocha --timeout 50000