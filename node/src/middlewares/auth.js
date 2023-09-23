const passport = require('passport')
, bcrypt = require('bcryptjs')
, LocalStrategy = require('passport-local').Strategy;

const db = require('./db')
, pool = db.pool;

//New local strategy to authenticate using name of the bountie and password
passport.use(new LocalStrategy({usernameField: 'name',
passwordField: 'password'},(name, password, callback) => {
  const query = {
    name: 'search-user',
    text: 'SELECT name, password FROM bugbounties WHERE name=$1',
    values: [name]
  }
  pool.query(query, (err, table) => {
      if(err) {
        console.log('Error when selecting user on login  ' + err);
        return callback(err);
      } else {
        if(table.rows.length > 0) {
          const first = table.rows[0];
          //Comparing hashes
          bcrypt.compare(password, first.password, function(err, res) {
            if(res) {
              console.log(first.name + ' logged');
              callback(null, { id: first.id, name: first.name });
            } else {
              console.log(err);
              callback(null, false);
            }
          });
        } else {
          callback(null, false);
        }
      }
    });
  }));

passport.serializeUser((user, done) => {
    done(null, user.name);
});
  
passport.deserializeUser((name, callback) => {
    pool.query('SELECT name FROM bugbounties WHERE name = $1', [name], (err, results) => {
        if(err) {
        console.log('Error when selecting user on session deserialize ' + err)
        return callback(err)
        }

        callback(null, results.rows[0])
    })
});

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    } else{
        res.redirect('/');
    }
}

exports.isAuthenticated = isAuthenticated;
exports.passport = passport;