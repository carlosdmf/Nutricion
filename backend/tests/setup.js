const db = require('../db');

afterAll((done) => {

  db.end(() => {

    done();

  });

});