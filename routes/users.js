let express = require('express');
let router = express.Router();
let mongo = require("mongodb").MongoClient;
let config = require("../config");

function renderError(response, errCode, errDescr) {
    console.error(errDescr);
    response.status(500);
    response.render('index', {
        task: config.siteName,
        err: errCode,
        errDesc: errDescr,
    });
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    mongo.connect(config.db.url, config.dbConnection, function(err, client) {
        if (err) {
            renderError(res, 1, err.toString());
        } else {
            const dataBase = client.db(config.db.name);
            const users = dataBase.collection("users");
            users.find({login: {$ne: "admin"}}).sort({login: 1}).toArray(function(err, docs) {
                if (err) {
                    renderError(res, 1, err.toString());
                } else {
                    res.render('users', {
                        task: config.siteName,
                        users: docs,
                        err: 0,
                    });
                }
            });
        }
    });
});

module.exports = router;
