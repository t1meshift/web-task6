var express = require('express');
var router = express.Router();
var mongo = require("mongodb").MongoClient;
var config = require("../config");

function renderError(response, errCode, errDescr) {
    console.error(errDescr);
    response.status(500);
    response.render('user', {
        task: config.siteName,
        err: errCode,
        errDesc: errDescr,
    });
}

/* GET home page. */
router.get('', function(req, res, next) {
    res.status(403);
    res.send("Nope c:");
});
router.get('/:page([0-9]+)', function(req, res, next) {
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
                    res.render('user', {
                        task: config.siteName,
                        custId: cid,
                        customer: docs[0],
                        err: 0,
                    });
                }
            });
        }
    });
});

module.exports = router;
