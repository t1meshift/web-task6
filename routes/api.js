let express = require('express');
let router = express.Router();
let mongo = require("mongodb").MongoClient;
let config = require("../config");

function renderError(response, errCode, errDescr) {
    console.error(errDescr);
    response.status(500);
    response.json({
        error: errCode,
        errDesc: errDescr,
    });
}

/* GET users listing. */
router.get('/users', function(req, res, next) {
    mongo.connect(config.db.url, config.dbConnection, function(err, client) {
        if (err) {
            renderError(res, 1, err.toString());
        } else {
            const dataBase = client.db(config.db.name);
            const users = dataBase.collection("users");
            users.find({}).sort({uid: 1}).toArray(function(err, docs) {
                if (err) {
                    renderError(res, 1, err.toString());
                } else {
                    res.json({"response": docs});
                }
            });
        }
    });
});
router.get('/user/:page([0-9]+)', function(req, res, next) {
    let cid = parseInt(req.params.page);
    mongo.connect(config.db.url, config.dbConnection, function(err, client) {
        if (err) {
            renderError(res, 1, err.toString());
        } else {
            const dataBase = client.db(config.db.name);
            const users = dataBase.collection("users");
            users.find({uid: cid}).toArray(function(err, docs) {
                if (err) {
                    renderError(res, 1, err.toString());
                } else if (docs.length !== 1) {
                    renderError(res, 2, `Пользователь №${cid} не найден :с`);
                } else {
                    res.json({response: docs[0]});
                }
            });
        }
    });
});

module.exports = router;
