# Exercise Tracker | React, Express, MongoDB, Mongoose

- Authentication (Email/Pass) with JSONWebTokens + Bcrypt
- Create, Read, Update, Delete (CRUD) API

This web application is hobby project developed with a basic CRA (Create React App) for the Front-end, and an Express back-end API. The goal was to build up development experience and exemplify some of my skills with modern tooling, hopefully becoming an web app with a finished look that allowing for a quick way to demo/present my work.

Exercise Tracker allows a user to Register and Log in with an email address and password. Currently the application's Authentication flow is very simple, but that is sufficient for this hooby project.

### API / Backend

Once Logged in, a user is persisted on the browser, this is done via a JSON Web Token that stores a users identifiable information, which should only be parsed by the application (backend), and returned back to the Front-end. A users password is hashed when the request is received on the back-end, so we never store the users password, only a hashed version of it.

```JavaScript
// Backend
// Register Route

router.route('/register').post(async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.find({ email });

    if (userExists.length) {
      return res.status(409).json({ error: 'Email has already been taken' });
    }
    const newUser = new User({ username, email });
    await newUser.setPassword(password);
    newUser.save();
    const userData = await newUser.toAuthJSON();
    return res.json(userData);
  } catch (error) {
    console.error(error);
  }
});

// User Modal / Schema methods

userSchema.methods.toClient = function () {
  return {
    id: this._id,
    name: this.name,
    username: this.username,
    email: this.email,
    unitSystem: this.unitSystem,
    weight: this.weight,
    friends: this.friends,
    friendRequests: this.friendRequests,
    friendRequestsSent: this.friendRequestsSent,
  };
};

userSchema.methods.toAuthJSON = function () {
  const user = this.toClient();
  return {
    ...user,
    token: this.generateJWT(),
  };
};

userSchema.methods.generateJWT = function () {
  const data = {
    id: this._id,
    passwordDigest: this.passwordDigest,
  };
  return encode(data);
};

userSchema.methods.setPassword = async function (password) {
  const digest = await hash(password);
  this.passwordDigest = digest;
};

const encode = (data) => {
 // SECRET is a string that can be stored as a env var
  return jwt.sign(data, SECRET);
};

const verify = (token) => {
     // SECRET is a string that can be stored as a env var
  return jwt.verify(token, SECRET);
};
```

### Front-End - UI

## Libraries / Packages / Dependencies

- Nodemon
- Passport
- Moment.js - Formatting Time
- Axios - Wrapper for native fetch API, used for making requests to API's
- React Router - User for routing to different sections of WebApp
- MongoDb / Mongoose - NoSQL Database
- Framer Motion - Animation
- Formik + Yup (Forms / Validation)

## Features

- User can create new account with email and password (Auth)
- User can login to previously created account (Auth)
- User can add Exercises with duration and a note (Create)
- User can edit an Exercise (Update)
- User can delete an Exercise (Delete)
- User can view all of his/her previoulsy added Exercises (Read)
- User can filter by exercise type and exercise time

## Exercise Types

- General
- Run
- Gym
- Yoga
- Cycling
- Rock Climbing
- Swimming
- Tennis

## Charts - Recharts (not implemented)

- LineCharts (Incomplete)
- BarChart (Incomplete)
