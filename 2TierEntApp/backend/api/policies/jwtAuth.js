/**
 * Created by johnny on 3/9/2015.
 */

/*
  l'l decrypt a jwt and extract the user id,
  It gets the jwt from the header being set by satellizer on every request it sends
 */

var jwt = require('jwt-simple');

module.exports = function(req, res, next) {

    // check header for jwt to get an id
    if (!req.headers.authorization) {
        return res.status(401).send({
            error: 'You are not authorized'
        });
    }

    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, config.TOKEN_SECRET);

    if (!payload.sub)
        return res.status(401).send({
            error: 'You are not authorized'
        });

    req.userId = payload.sub;
    next();

};
/*
function handleError(){
    return res.status(401).send({
        error: 'You are not authorized'
    });
}
*/

