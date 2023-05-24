const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('user');

// SerializeUser is used to provide some identifying token that can be saved
// in the users session.  We traditionally use the 'ID' for this.
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user.id);
  });
});

// The counterpart of 'serializeUser'.  Given only a user's ID, we must return
// the user object.  This object is placed on 'req.user'.
passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findById(id);
    cb(null, user);
  } catch (err) {
    cb(err);
  }
});

// Instructs Passport how to authenticate a user using a locally saved email
// and password combination.  This strategy is called whenever a user attempts to
// log in.  We first find the user model in MongoDB that matches the submitted email,
// then check to see if the provided password matches the saved password. There
// are two obvious failure points here: the email might not exist in our DB or
// the password might not match the saved one.  In either case, we call the 'done'
// callback, including a string that messages why the authentication process failed.
// This string is provided back to the GraphQL client.
passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, cb) => {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return cb(null, false, { message: 'Incorrect email or password.' });
      }

      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return cb(err);
        }
        if (isMatch) {
          return cb(null, user);
        }

        return cb(null, false, { message: 'Incorrect email or password.' });
      });
    } catch (err) {
      return cb(err);
    }
  })
);

// Creates a new user account.  We first check to see if a user already exists
// with this email address to avoid making multiple accounts with identical addresses
// If it does not, we save the existing user.  After the user is created, it is
// provided to the 'req.logIn' function.  This is apart of Passport JS.
// Notice the Promise created in the second 'then' statement.  This is done
// because Passport only supports callbacks, while GraphQL only supports promises
// for async code!  Awkward!
async function signup({ username, email, password, req }) {
  return new Promise((resolve, reject) => {
    if (!username || !email || !password)
      reject('You must provide a username, email, and password.');
    const user = new User({ username, email, password });
    user
      .save()
      .then((user) => {
        req.logIn(user, (err) => {
          if (err) {
            reject(err);
          }
          resolve(user);
        });
      })
      .catch(({ keyValue }) => {
        let errorMessage;
        for (let entry of Object.entries(keyValue)) {
          const [key, value] = entry;
          errorMessage = `The ${key} "${value}" is already in use. Please choose a different one.`;
        }

        reject(errorMessage);
      });
  });
}

// Logs in a user.  This will invoke the 'local-strategy' defined above in this
// file. Notice the strange method signature here: the 'passport.authenticate'
// function returns a function, as its indended to be used as a middleware with
// Express.  We have another compatibility layer here to make it work nicely with
// GraphQL, as GraphQL always expects to see a promise for handling async code.
function login({ email, password, req }) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (!email || !password) {
        console.log('Issue');
        reject('You must provide an email and password.');
      }
      if (err) {
        reject(err);
      }
      if (!user) {
        reject('Invalid credentials');
      }

      req.logIn(user, (err) => {
        if (err) {
          reject(err);
        }
        resolve(user);
      });
    })({ body: { email, password } });
  });
}

// Logout the user
function logout(req) {
  const { user } = req;
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  return user;
}

module.exports = { signup, login, logout };
