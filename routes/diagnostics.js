const diagnostics = require('express').Router();
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const moment = require('moment');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // Logic for sending all the content of db/diagnostics.json
  fs.readFile("./db/diagnostics.json", "utf-8", (err, data) => {
    if (err) {
      throw err
    } else {
      const diagnosticsdata = JSON.parse(data);
      res.json(diagnosticsdata)
    }
  })

});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // Logic for appending data to the db/diagnostics.json file
  fs.readFile("./db/diagnostics.json", "utf-8", (err, data) => {
    if (err) {
      throw err
    } else {
      let diagnosticsdata = JSON.parse(data);
      const newError = {
        "time": moment().valueOf(),
        "error_id": uuidv4(),
        "errors": req.body.errors,
      };

      // if (!req.body.isValid) do this
      diagnosticsdata.push(newError);
      fs.writeFile("./db/diagnostics.json", JSON.stringify(diagnosticsdata,null, 2), (err, data) => {
        if (err) {
          throw err
        } else {
          res.json(diagnosticsdata)
        }
      })
    }
  })
});

module.exports = diagnostics;
