import express from 'express';
import ejs     from 'ejs'    ;

import { viewsPath } from './paths/utils.mjs'

const app  = express();
const PORT = process.env.PORT || 5050;

import {
  indexEJS, loginEJS, registerEJS
} from './paths/pathsEJS.mjs';

const users = {
  "Johnny": {
    firstname: "John",
    surname  : "Doe",
    email    : "john@example.com",
    password : "ImJohnDoe"
  },
}

app.set('view engine', ejs);

app.use(express.static(viewsPath))             ;
app.use(express.urlencoded({ extended: true }));
app.use(express.json())                        ;


// >>-------- GET - Endpoints - Below --------<<
app.get('/', (_, res) => {
  try {
    res.render(indexEJS, {
      title: 'Test - Home',
    });
  }
  catch (_) { res.sendStatus(503); }
});
// >>-------- GET - Endpoints - Above --------<<


// >>-------- POST - Endpoints - Below --------<<
app.post('/test', (req, res) => {
  const { username } = req.body;

  try {
    res.status(200).send({
      msg: `Hola, ${username}.`
    });
  }
  catch (_) { res.sendStatus(503); }
});
// >>-------- POST - Endpoints - Above --------<<


// Try-Cath app.listen()
try {
  app.listen(PORT, () => {
    console.log(
      `\n  ~Servidor web escuchando en puerto [ ${PORT} ]...~` +
      `\n    -> ( http://127.0.0.1:${PORT} )`
    );
  });
} catch (err) {
  console.error(
    '\n  ~An error occurred while starting the server.~' +
    `\n    -> ${err.message}`
  );
  process.exit(1);
}
