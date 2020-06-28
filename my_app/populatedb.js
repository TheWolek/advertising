#! /usr/bin/env node

console.log('This script populates some test adverts, categories and users to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Advert = require('./models/advert')
var User = require('./models/user')
var Category = require('./models/category')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = []
var categories = []
var adverts = []

function userCreate(nickname, name, email, date_of_join, password, cb) {
    var userDetail = { nickname: nickname, name: name, email: email, date_of_join: date_of_join, password: password };
    var user = new User(userDetail);

    user.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New User: ' + user);
        users.push(user)
        cb(null, user)
    });
}

function catCreate(name, cb) {
    var cat = new Category({ name: name });

    cat.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Category: ' + cat);
        categories.push(cat)
        cb(null, cat);
    });
}

function advertCreate(title, desc, price, owner, cat, expire_date, cb) {
    advertdetail = {
        title: title,
        desc: desc,
        price: price,
        owner: owner,
        cat: cat,
        expire_date: expire_date
    }
    //if (genre != false) bookdetail.genre = genre

    var advert = new Advert(advertdetail);
    advert.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Advert: ' + advert);
        adverts.push(advert)
        cb(null, advert)
    });
}


// function bookInstanceCreate(book, imprint, due_back, status, cb) {
//     bookinstancedetail = {
//         book: book,
//         imprint: imprint
//     }
//     if (due_back != false) bookinstancedetail.due_back = due_back
//     if (status != false) bookinstancedetail.status = status

//     var bookinstance = new BookInstance(bookinstancedetail);
//     bookinstance.save(function (err) {
//         if (err) {
//             console.log('ERROR CREATING BookInstance: ' + bookinstance);
//             cb(err, null)
//             return
//         }
//         console.log('New BookInstance: ' + bookinstance);
//         bookinstances.push(bookinstance)
//         cb(null, book)
//     });
// }

function createUsers(cb) {
    async.series([
        function (callback) {
            userCreate('admin1', 'admin', 'admin@gmail.com', '2020-06-28', '132', callback);
        },
        function (callback) {
            userCreate('jan', 'jan', 'jan@gmail.com', '2020-06-28', '1332', callback);
        }
    ],
        cb)
}

function createCats(cb) {
    async.series([
        function (callback) {
            catCreate('dom', callback);
        },
        function (callback) {
            catCreate('ogród', callback);
        },
        function (callback) {
            catCreate('motoryzacja', callback);
        },
        function (callback) {
            catCreate('elektronika', callback);
        }
    ],
        cb)
}


// function createGenreAuthors(cb) {
//     async.series([
//         function (callback) {
//             authorCreate('Patrick', 'Rothfuss', '1973-06-06', false, callback);
//         },
//         function (callback) {
//             authorCreate('Ben', 'Bova', '1932-11-8', false, callback);
//         },
//         function (callback) {
//             authorCreate('Isaac', 'Asimov', '1920-01-02', '1992-04-06', callback);
//         },
//         function (callback) {
//             authorCreate('Bob', 'Billings', false, false, callback);
//         },
//         function (callback) {
//             authorCreate('Jim', 'Jones', '1971-12-16', false, callback);
//         },
//         function (callback) {
//             genreCreate("Fantasy", callback);
//         },
//         function (callback) {
//             genreCreate("Science Fiction", callback);
//         },
//         function (callback) {
//             genreCreate("French Poetry", callback);
//         },
//     ],
//         // optional callback
//         cb);
// }

function createAdverts(cb) {
    async.parallel([
        function (callback) {
            advertCreate('monitor', 'dobry uzywany monitor', 400, users[0], categories[3], '2020-06-29', callback);
        },
        function (callback) {
            advertCreate('donice', 'duże nowe donice do kwiatów', 200, users[1], categories[1], '2020-06-30', callback);
        }
    ])
}


// function createBooks(cb) {
//     async.parallel([
//         function (callback) {
//             bookCreate('The Name of the Wind (The Kingkiller Chronicle, #1)', 'I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.', '9781473211896', authors[0], [genres[0],], callback);
//         },
//         function (callback) {
//             bookCreate("The Wise Man's Fear (The Kingkiller Chronicle, #2)", 'Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.', '9788401352836', authors[0], [genres[0],], callback);
//         },
//         function (callback) {
//             bookCreate("The Slow Regard of Silent Things (Kingkiller Chronicle)", 'Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.', '9780756411336', authors[0], [genres[0],], callback);
//         },
//         function (callback) {
//             bookCreate("Apes and Angels", "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...", '9780765379528', authors[1], [genres[1],], callback);
//         },
//         function (callback) {
//             bookCreate("Death Wave", "In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...", '9780765379504', authors[1], [genres[1],], callback);
//         },
//         function (callback) {
//             bookCreate('Test Book 1', 'Summary of test book 1', 'ISBN111111', authors[4], [genres[0], genres[1]], callback);
//         },
//         function (callback) {
//             bookCreate('Test Book 2', 'Summary of test book 2', 'ISBN222222', authors[4], false, callback)
//         }
//     ],
//         // optional callback
//         cb);
// }

async.series([
    createUsers,
    createCats,
    createAdverts
],
    // Optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        else {
            console.log('done');

        }
        // All done, disconnect from database
        mongoose.connection.close();
    });



