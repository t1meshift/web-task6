# A simple website on Node.js
## Description
A simple website made for web programming classes. It shows some data from DB and uses
templates. I could make it RESTful but I find it overkill for simple task which was just
to use templates.
##### It uses the next libraries:
| Dependency                   | Description                              |
|------------------------------|------------------------------------------|
| Express                      | Web routing framework                    |
| Pug (ex-Jade)                | Template engine                          |
| MongoDB                      | DB which is used for storing users' data |
| Bootstrap, JQuery, Popper.js | Frontend                                 |

## Installation
1. Install MongoDB if it is not then run it with DB data in separate directory, e.g. `mongod --dbpath ./mongo`;
2. Import database from archive: `mongorestore --archive=web_classes.archive --db web_classes`;
3. Do `npm install` in project directory.

**Optionally:** To restrict DB access, you can create a user in DB with read permission and set a password on 
it, you just need to fix some lines in `config.js` after it: set `needAuth` to true and enter your credentials in 
`db.user` and `db.pass`.


## Running
1. Run MongoDB;
2. Do `npm start`;
2. Open `http://localhost:3000` in your browser.

## Icons
I have used free icons from fontawesome.com and used mixins for their integration.

The mixins are stored in `views/bootstrap.pug`, and they look like this:
```
mixin icn-wheelchair
    i.far(class="fa-accessible-icon")
```
The example above is equivalent to `<i class="far fa-accessible-icon"></i>`.

**You can add more FontAwesome icon mixins, but I'll really appreciate it if you do pull request.**