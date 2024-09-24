import express from 'express';
import ejs     from 'ejs'    ;

import { viewsPath } from './paths/utils.mjs';

import client from './db/config_db.mjs';

const app  = express();
const PORT = process.env.PORT || 5050;

import {
  indexEJS, loginEJS, registerEJS, remembermeEJS,
  chickenCatalogEJS, fishCatalogEJS,

  dashboardEJS, profileEJS, settingsEJS,

  notFoundEJS
} from './paths/pathsEJS.mjs';

app.set('view engine', ejs);

app.use(express.static(viewsPath))             ;
app.use(express.urlencoded({ extended: true }));
app.use(express.json())                        ;


(async () => {
  try {
    await client.connect();
    console.log('  ~Connected to MongoDB.~');

    let db;
    const DBNAME_MONGODB = process.env.DBNAME_MONGODB;
    if (DBNAME_MONGODB) {
      console.log(`  ~Using database: ${DBNAME_MONGODB}~`);
      db = client.db(DBNAME_MONGODB);
    }
    else {
      console.log(`  ~ENV-Error: the database doesn't exist.~`);
      process.exit(1);
    }

    // >>-------- GET - Endpoints - Below --------<<
    app.get('/', (_, res) => {
      try {
        res.render(indexEJS, {
          title: 'SupplyGPS - Home',
        });
      }
      catch (_) { res.sendStatus(503); }
    });

    app.get('/login', (req, res) => {
      const {
        username, password,
        userNotExistFlag, invalidPasswordFlag,
        successRegisterFlag
      } = req.query;

      let errorFlag, errorMessage;

      if (userNotExistFlag) {
        errorFlag    = true;
        errorMessage = 'El usuario no existe.';

      } else if (invalidPasswordFlag) {
        errorFlag    = true;
        errorMessage = 'La contraseña es inválida.';
      }

      try {
        res.render(loginEJS, {
          title: 'SupplyGPS - Login',

          username: username ?? '',
          password: password ?? '',

          userNotExistFlag   : userNotExistFlag    === 'true',
          invalidPasswordFlag: invalidPasswordFlag === 'true',
          
          successRegisterFlag: successRegisterFlag === 'true',

          errorFlag   : errorFlag    ?? false,
          errorMessage: errorMessage ?? ''   ,
        });
      }
      catch (_) { res.sendStatus(503); }
    });

    app.get('/register', (req, res) => {
      const {
        username, firstname, lastname, phone, email, password,
        alreadyExistUsernameFlag, spacesOnUsernameFlag,
        spacesOnFirstnameFlag, spacesOnLastnameFlag,
        alreadyExistEmailFlag, unsimilarPasswordFlag
      } = req.query;

      let errorFlag, errorMessage;

      if (alreadyExistUsernameFlag) {
        errorFlag    = true;
        errorMessage = 'El nombre de usuario ya existe.';

      } else if (
          spacesOnUsernameFlag  ||
          spacesOnFirstnameFlag ||
          spacesOnLastnameFlag
        ) {
        errorFlag    = true;
        errorMessage = 'No puede contener espacios.';

      } else if (alreadyExistEmailFlag) {
        errorFlag    = true;
        errorMessage = 'El correo ya existe.';

      } else if (unsimilarPasswordFlag) {
        errorFlag    = true;
        errorMessage = 'La contraseña no coincide.';
      }

      try {
        res.render(registerEJS, {
          title: 'SupplyGPS - Register',

          username : username  ?? '',
          firstname: firstname ?? '',
          lastname : lastname  ?? '',
          phone    : phone     ?? '',
          email    : email     ?? '',
          password : password  ?? '',

          alreadyExistUsernameFlag: alreadyExistUsernameFlag ?? false,
          alreadyExistEmailFlag   : alreadyExistEmailFlag    ?? false,
          spacesOnUsernameFlag    : spacesOnUsernameFlag     ?? false,
          spacesOnFirstnameFlag   : spacesOnFirstnameFlag    ?? false,
          spacesOnLastnameFlag    : spacesOnLastnameFlag     ?? false,
          unsimilarPasswordFlag   : unsimilarPasswordFlag    ?? false,

          errorFlag   : errorFlag    ?? false,
          errorMessage: errorMessage ?? ''   ,
        });
      }
      catch (_) { res.sendStatus(503); }
    });

    app.get('/rememberme', (_, res) => {
      try {
        res.render(remembermeEJS, {
          title: 'SupplyGPS - Rememberme',
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

    app.get('/*', (_, res) => {
      try {
        res.render(notFoundEJS, {
          title: 'SupplyGPS - 404',
        });
      }
      catch (_) { res.sendStatus(503); }
    });
    // >>-------- GET - Endpoints - Above --------<<


    // >>-------- POST - Endpoints - Below --------<<
    app.post('/test', (_, res) => {
      try       { res.sendStatus(202); }
      catch (_) { res.sendStatus(503); }
    });

    app.post('/login', async (req, res) => {
      const { username, password } = req.body;

      if (!username) {
        return res.status(404).send(
          { msg: 'Username not specified.' }
        );
      } else if (!password) {
        return res.status(404).send(
          { msg: 'Password not specified.' }
        );
      }

      try {
        const user = await db.collection('users').findOne(
          { username: username },
          {
            projection: {
              _id: 0,
              password: 1
            }
          }
        );

        if (!user) {
          return res.redirect('/login?' +
            'userNotExistFlag=true'
          );
        }

        if (user.password !== password) {
          return res.redirect('/login?' +
            `username=${username}&` +
            'invalidPasswordFlag=true'
          );
        }

        //TODO generate token and save in database

        res.redirect(`/dashboard?token=${token}`)
      }
      catch (_) { res.sendStatus(503); }
    });

    app.post('/register', async (req, res) => {
      const {
        username, firstname, lastname, phone, email, password, re_password
      } = req.body;

      if (!username) {
        return res.status(404).send({ msg: 'Username not specified.' });

      } else if (!firstname) {
        return res.status(404).send({ msg: 'Firstname not specified.' });

      } else if (!lastname) {
        return res.status(404).send({ msg: 'Lastname not specified.' });
      
      } else if (!email) {
        return res.status(404).send({ msg: 'E-mail not specified.' });
      
      } else if (!password) {
        return res.status(404).send({ msg: 'Password not specified.' });

      } else if (!re_password) {
        return res.status(404).send({ msg: 'Re-Password not specified.' });
      }

      try {
        const usernameExist = await db.collection('users').findOne(
          { username: username }, { projection: { _id: 1 } }
        );

        const emailExist = await db.collection('users').findOne(
          { email: email }, { projection: { _id: 1 } }
        );
        
        if (usernameExist) {
          return res.redirect('/register?' +
            `firstname=${encodeURIComponent(firstname)}&` +
            `lastname=${encodeURIComponent(lastname)}&` +
            `phone=${encodeURIComponent(phone)}&` +
            `email=${encodeURIComponent(email)}&` +
            `password=${encodeURIComponent(password)}&` +
            'alreadyExistUsernameFlag=true'
          );
        } else if (username.includes(' ')) {
          return res.redirect('/register?' +
            `firstname=${encodeURIComponent(firstname)}&` +
            `lastname=${encodeURIComponent(lastname)}&` +
            `phone=${encodeURIComponent(phone)}&` +
            `email=${encodeURIComponent(email)}&` +
            `password=${encodeURIComponent(password)}&` +
            'spacesOnUsernameFlag=true'
          );
        } else if (firstname.includes(' ')) {
          return res.redirect('/register?' +
            `username=${encodeURIComponent(username)}&` +
            `lastname=${encodeURIComponent(lastname)}&` +
            `phone=${encodeURIComponent(phone)}&` +
            `email=${encodeURIComponent(email)}&` +
            `password=${encodeURIComponent(password)}&` +
            'spacesOnFirstnameFlag=true'
          );
        } else if (lastname.includes(' ')) {
          return res.redirect('/register?' +
            `username=${encodeURIComponent(username)}&` +
            `firstname=${encodeURIComponent(firstname)}&` +
            `phone=${encodeURIComponent(phone)}&` +
            `email=${encodeURIComponent(email)}&` +
            `password=${encodeURIComponent(password)}&` +
            'spacesOnLastnameFlag=true'
          );
        } else if (emailExist) {
          return res.redirect('/register?' +
            `username=${encodeURIComponent(username)}&` +
            `firstname=${encodeURIComponent(firstname)}&` +
            `lastname=${encodeURIComponent(lastname)}&` +
            `phone=${encodeURIComponent(phone)}&` +
            `password=${encodeURIComponent(password)}&` +
            'alreadyExistEmailFlag=true'
          );
        } else if (password !== re_password) {
          return res.redirect('/register?' +
            `username=${encodeURIComponent(username)}&` +
            `firstname=${encodeURIComponent(firstname)}&` +
            `lastname=${encodeURIComponent(lastname)}&` +
            `phone=${encodeURIComponent(phone)}&` +
            `email=${encodeURIComponent(email)}&` +
            `password=${encodeURIComponent(password)}&` +
            'unsimilarPasswordFlag=true'
          );
        }

        const structureUserData = {
          username : username,
          firstname: firstname,
          lastname : lastname,
          phone    : phone,
          email    : email,
          password : password,

          is_enabled: false,
          is_closed : false,
          is_manager: false,
          is_admin  : false,

          order: {}
        }

        const products = await db.collection('products').find({},
          {
            projection: {
              _id: 0,
              product_name: 1
            }
          }
        ).toArray();
        
        products.forEach((product) => {
          structureUserData.order[product.product_name] = 0;
        });

        await db.collection('users').insertOne(structureUserData);

        return res.redirect('/login?' +
          'successRegisterFlag=true'
        );
      }
      catch (_) { res.sendStatus(503); }
    });
    // >>-------- POST - Endpoints - Above --------<<
  

    app.listen(PORT, () => {
      console.log(`  ~Servidor web escuchando en puerto [ ${PORT} ]...~\n`);
    });
    
  } catch (err) {
    console.error(
      '\n  ~An error occurred while starting the server.~' +
      `\n    -> ${err.message}`
    );
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
