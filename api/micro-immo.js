const {send} = require('micro');
const url = require('url');
const level = require('level');
const promisify = require('then-levelup');
var Promise = require('bluebird');



// Configuration for the scraping Immobilienscout24
const immoRepo = require('../core/immobilienscout24/immobilienscout24Repo');
const immoConfig = require('../core/immobilienscout24/basicConfig');

const db = promisify(level('immo.db', {
    valueEncoding: 'json'
}));

var Datastore = require('nedb')
    , dbNedb = new Datastore({ filename: './storage/immo-store.json', autoload: true });


module.exports = async function (request, response) {

    const url = "https://www.immobilienscout24.de/Suche/S-2/Wohnung-Miete";

    immoRepo.listOfItems(url, immoConfig.getConfiguration()).then((data) => {

        Promise.each(data.pages, (data_i) =>{
            dbNedb.find({ id: data_i.id }, function (err, docs) {
                console.log(docs.length);

                if(docs.length == 0){
                    //INSERT New Doc
                    dbNedb.insert(data_i, function (err, newDoc) {

                        if(err){
                            console.error(err);
                        }
                        if(newDoc){
                            console.log('New Doc Inserted: ', newDoc.id);
                        }
                    });
                }else{
                    console.log('Found Docs witd id:', data_i.id);
                    console.log(docs);

                }
            });

        });

/*        for (var i in data.pages){
            console.log('IN LOOP: ', data.pages[i].id);
            try {
                db.put(data.pages[i].id, data.pages[i]);
                dbNedb.insert(data.pages[i], function (err, newDoc) {

                    if(err){
                        console.error(err);
                    }
                    if(newDoc){
                        console.log('New Doc Inserted: ', newDoc.id);
                    }
                });

/!*                dbNedb.find({ id: data.pages[i].id }, function (err, docs) {
                    if(docs.length == 0){
                        //INSERT New Doc
                        dbNedb.insert(data.pages[i], function (err, newDoc) {

                            if(err){
                                console.error(err);
                            }
                            if(newDoc){
                                console.log('New Doc Inserted: ', newDoc.id);
                            }
                        });
                    }else{
                        console.log('Found Docs witd id:', data.pages[i].id);
                        console.log(docs);

                    }
                });*!/

                // console.log(data.pages[i].id);
                db.get(data.pages[i].id).then(data => {
                   // console.log(data);
                });
            } catch (error) {
                console.log('ERROR');
                console.error(error);
                if (error.notFound) db.put(data.pages[i].id, data.pages[i]);
            }
        }*/
        send(response, 200, data);
    });
}