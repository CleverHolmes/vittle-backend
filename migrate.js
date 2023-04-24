import mongoose from "mongoose";
import createModel from "./src/models/users.model";


const connectionString = 'mongodb://127.0.0.1:27017/vittle_2_admin_server';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {
  console.log('Connected to MongoDB');

  // Create the users collection with the new schema
  await createModel.createCollection();

  // Close the database connection
  mongoose.connection.close();
});