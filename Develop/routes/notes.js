const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

//GET '/api/notes' should read the db.json file and return all saved notes as JSON.
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//POST '/api/notes' should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. 
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;
   
  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.errored(`Erroe in adding tip`);
  }
});

module.exports = notes