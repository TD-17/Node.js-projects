const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

let note = [{ id: 1, body: 'This is first text' }, { id: 2, body: 'This is a second text' }];

const hostname = 'localhost';
const port = 3000;

let app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
    }));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('notes', {
      note: note
    });
  });

  app.post("/addNotes",(req, res) => {
    const userNote = {};
    userNote.id = Math.random() * 100;
    userNote.body = req.body.newNote
    note.push(userNote);
    res.redirect('/');
  });

  app.post('/deleteNote/:id', (req, res) => {
    console.log(req.params.id);
    const deleteNotes = note.filter(item => item.id != req.params.id);
    note = deleteNotes;
    return res.redirect('/');
  });

app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);

});
