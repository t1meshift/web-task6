let express = require('express');
let router = express.Router();
let mongo = require("mongodb").MongoClient;
let config = require("../config");

function renderError(response, errName, errDescr = null, errCode = 500) {
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

/* GET home page. */
router.get('', function(req, res, next) {
    renderError(res, "YOU SHALL NOT PASS!", "Nothing personal, just 403.", 403);
});
router.get('/:userName', function(req, res, next) {
    let userName = req.params.userName;
    mongo.connect(config.db.url, config.dbConnection, function(err, client) {
        if (err) {
            renderError(res, "Ошибка БД", err.toString());
        } else {
            const dataBase = client.db(config.db.name);
            const users = dataBase.collection("users");
            users.find({login: userName}).toArray(function(err, docs) {
                if (err) {
                    renderError(res, "Ошибка БД", err.toString());
                } else if (docs.length !== 1) {
                    renderError(res, `Пользователь ${userName} не найден :с`, null, 404);
                } else {
                    res.render('user', {
                        task: config.siteName,
                        user: docs[0]
                    });
                }
            });
        }
    });
});

module.exports = router;
