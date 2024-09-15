import { MongoClient, ServerApiVersion } from 'mongodb';

let cacheURI = process.env.URI_MONGODB || null;
if (!cacheURI) { process.exit(1); }
cacheURI = cacheURI.replace('<db_user>'    , process.env.USER_MONGODB    )
cacheURI = cacheURI.replace('<db_password>', process.env.PASSWORD_MONGODB)

const client = new MongoClient(cacheURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export default client;
