import express from 'express';
import ejs     from 'ejs'    ;

import { viewsPath } from './paths/utils.mjs';

import client from './db/config_db.mjs';

const app  = express();
const PORT = process.env.PORT || 5050;

import {
  indexEJS, loginEJS, registerEJS,
  chickenCatalogEJS, fishCatalogEJS
} from './paths/pathsEJS.mjs';

app.set('view engine', ejs);

app.use(express.static(viewsPath))             ;
app.use(express.urlencoded({ extended: true }));
app.use(express.json())                        ;


(async () => {
  try {
    await client.connect();
    console.log('  ~Connected to MongoDB.~');

    // >>-------- GET - Endpoints - Below --------<<
    app.get('/', (_, res) => {
      try {
        res.render(indexEJS, {
          title: 'SupplyGPS - Home',
        });
      }
      catch (_) { res.sendStatus(503); }
    });

    app.get('/chicken-catalog', (_, res) => {
      try {
        res.render(fishCatalogEJS, {
          title: 'SupplyGPS - Chicken-Catalog',
        });
      }
      catch (_) { res.sendStatus(503); }
    });

    app.get('/fish-catalog', (_, res) => {
      try {
        res.render(chickenCatalogEJS, {
          title: 'SupplyGPS - Fish-Catalog',
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

    app.listen(PORT, () => {
      console.log(`  ~Servidor web escuchando en puerto [ ${PORT} ]...~`);
    });
    
  } catch (err) {
    console.error(
      '\n  ~An error occurred while starting the server.~' +
      `\n    -> ${err.message}`
    );
    process.exit(1);
  }
})();


// Handling Ctrl+C or exit the program.
process.on('SIGINT', async () => {
  try {
    await client.close();

    console.log('\n  ~MongoDB connection closed.~\n');

    process.exit(0);
  } catch (err) {
    console.error(
      '\n  ~An error occurred while closing MongoDB connection.~' +
      `\n    -> ${err.message}`
    );
    process.exit(1);
  }
});
