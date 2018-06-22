const siteName = "Задание №6";
const needAuth = false; // necessity in authorization

const db = Object.freeze({
    url: "mongodb://localhost:27017",
    user: "USERNAME_GOES_HERE",
    pass: "PASSWORD_GOES_HERE",
    name: "web_classes",
});

let dbConnectOptions;
if (needAuth) {
    dbConnectOptions = {
        auth: {user: db.user, password: db.pass},
        authSource: "admin", // see mongo documentation
    };
}
else {
    dbConnectOptions = {};
}

let userRouter = require('./routes/user');
let usersRouter = require('./routes/users');
let apiRouter = require('./routes/api');

let routers = {
    user: userRouter,
    users: usersRouter,
    api: apiRouter,
};

module.exports.siteName = siteName;
module.exports.db = db;
module.exports.dbConnection = dbConnectOptions;
module.exports.routers = routers;