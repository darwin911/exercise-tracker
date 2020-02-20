const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

const uri = process.env.MONGODB_URI_CONTACT;
// current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('*** MongoDB database connection established successfully ***');
});

const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

const contactsRouter = require('./routes/contacts');

// app.use('/exercises', exerciseRouter);
// app.use('/users', userRouter);
app.use('/contact', contactsRouter);

app.get('/', (req, res) => {
  res.json({ message: `Server is running on port: ${port}` });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
