let express = require('express');
let router = express.Router();
let mongo = require("mongodb").MongoClient;
let config = require("../config");

function renderError(response, errName, errDescr = null) {
    console.error(`Error "${errName}" invoked:`, errDescr);
    response.status(500).render('error', {
        task: config.siteName,
        message: errName,
        error: {
            stack: errDescr,
            status: ""
        }
    });
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    mongo.connect(config.db.url, config.dbConnection, function(err, client) {
        if (err) {
            renderError(res, "Ошибка БД", err.toString());
        } else {
            const dataBase = client.db(config.db.name);
            const users = dataBase.collection("users");
            users.find({login: {$ne: "admin"}}).sort({login: -1}).toArray(function(err, docs) {
                if (err) {
                    renderError(res, "Ошибка БД", err.toString());
                } else {
                    res.render('users', {
                        task: config.siteName,
                        users: docs
                    });
                }
            });
        }
    });
});

module.exports = router;
