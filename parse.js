/*



RUN THIS ONCE!



 */
const fs = require('fs');

let rawdata = fs.readFileSync('data.json');
let obj = JSON.parse(rawdata);

var Locations = {
    loc: []
}

let todb = [];
let mainobj ={
    obj:[]
}

var reg1 = /1\d\d\d[;|,]/
var reg2 = /1\d\d\d-1\d\d\d[;|,]/
var reg12 = /1\d\d\d/
var reg22 = /1\d\d\d-1\d\d\d/
var reg3 = / 1\d\d\d/  //like reg0 but with space
var reg4 = /1\d-1\d вв./
var reg41 = /1\d в./
var reg42 = /2\d в./
var reg5 = /1\d-2\d вв./


const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });

function geoCode(address) {
    googleMapsClient.geocode(
        {address: address}) .asPromise() .then((response) =>

    {
        console.log(response.json.results[0].geometry.location)

        Locations.loc.push(response.json.results[0].geometry.location)

    }) .catch((err) => { console.log(err);
        }
    );
}

obj['dataset']['heritage_sites'].forEach(function(item, i, arr) {
    str = obj['dataset']['heritage_sites'][i]['date'];
    if(str === ' ') obj['dataset']['heritage_sites'].slice(i,1)
});


obj['dataset']['heritage_sites'].forEach(function(item, i, arr) {
    str = obj['dataset']['heritage_sites'][i]['date'];
    x = str.match(reg2)

    if(x != null){
        d = parseInt(x[0].substring(5,9))
        o = {name: obj['dataset']['heritage_sites'][i]['name'] + " " + obj['dataset']['heritage_sites'][i]['name_object'], date:d, address:obj['dataset']['heritage_sites'][i]['address']}
        todb.push(o)
        obj['dataset']['heritage_sites'][i]['date'] =""
    }
});

obj['dataset']['heritage_sites'].forEach(function(item, i, arr) {
    str = obj['dataset']['heritage_sites'][i]['date'];
    x = str.match(reg22)
    if(x != null){
        d = parseInt(x[0].substring(5,9))
        o = {name: obj['dataset']['heritage_sites'][i]['name'] + " " + obj['dataset']['heritage_sites'][i]['name_object'], date:d, address:obj['dataset']['heritage_sites'][i]['address']}
        todb.push(o)
        obj['dataset']['heritage_sites'][i]['date'] =""
    }
});

obj['dataset']['heritage_sites'].forEach(function(item, i, arr) {
    str = obj['dataset']['heritage_sites'][i]['date'];
    x = str.match(reg12)
    if(x != null){
        d = parseInt(x[0].substring(0,4))
        o = {name: obj['dataset']['heritage_sites'][i]['name'] + " " + obj['dataset']['heritage_sites'][i]['name_object'], date:d, address:obj['dataset']['heritage_sites'][i]['address']}
        todb.push(o)
        obj['dataset']['heritage_sites'][i]['date'] =""
    }
});


obj['dataset']['heritage_sites'].forEach(function(item, i, arr) {
    str = obj['dataset']['heritage_sites'][i]['date'];
    x = str.match(reg1)
    if(x != null){
        d = parseInt(x[0].substring(0,4))
        o = {name: obj['dataset']['heritage_sites'][i]['name'] + " " + obj['dataset']['heritage_sites'][i]['name_object'], date:d, address:obj['dataset']['heritage_sites'][i]['address']}
        todb.push(o)
        obj['dataset']['heritage_sites'][i]['date'] =""
    }
});


obj['dataset']['heritage_sites'].forEach(function(item, i, arr) {
    str = obj['dataset']['heritage_sites'][i]['date'];
    x = str.match(reg3)
    if(x != null){
        d = parseInt(x[0].substring(1,5))
        o = {name: obj['dataset']['heritage_sites'][i]['name'] + " " + obj['dataset']['heritage_sites'][i]['name_object'], date:d, address:obj['dataset']['heritage_sites'][i]['address']}
        todb.push(o)
        obj['dataset']['heritage_sites'][i]['date'] =""
    }
});


obj['dataset']['heritage_sites'].forEach(function(item, i, arr) {
    str = obj['dataset']['heritage_sites'][i]['date'];
    x = str.match(reg4)
    if(x != null){
        d = parseInt(x[0].substring(0,2))*100
        o = {name: obj['dataset']['heritage_sites'][i]['name'] + " " + obj['dataset']['heritage_sites'][i]['name_object'], date:d, address:obj['dataset']['heritage_sites'][i]['address']}
        todb.push(o)
        obj['dataset']['heritage_sites'][i]['date'] =""
    }
});

obj['dataset']['heritage_sites'].forEach(function(item, i, arr) {
    str = obj['dataset']['heritage_sites'][i]['date'];
    x = str.match(reg5)
    if(x != null){
        d = 1900
        o = {name: obj['dataset']['heritage_sites'][i]['name'] + " " + obj['dataset']['heritage_sites'][i]['name_object'], date:d, address:obj['dataset']['heritage_sites'][i]['address']}
        todb.push(o)
        obj['dataset']['heritage_sites'][i]['date'] =""
    }
});


obj['dataset']['heritage_sites'].forEach(function(item, i, arr) {
    str = obj['dataset']['heritage_sites'][i]['date'];
    x = str.match(reg41)
    if(x != null){
        d = (parseInt(x[0].substring(0,2))-1) * 100
        o = {name: obj['dataset']['heritage_sites'][i]['name'] + " " + obj['dataset']['heritage_sites'][i]['name_object'], date:d, address:obj['dataset']['heritage_sites'][i]['address']}
        todb.push(o)
        obj['dataset']['heritage_sites'][i]['date'] =""
    }
});

obj['dataset']['heritage_sites'].forEach(function(item, i, arr) {
    str = obj['dataset']['heritage_sites'][i]['date'];
    x = str.match(reg42)
    if(x != null){
        d = 1900
        o = {name: obj['dataset']['heritage_sites'][i]['name'] + " " + obj['dataset']['heritage_sites'][i]['name_object'], date:d, address:obj['dataset']['heritage_sites'][i]['address']}
        todb.push(o)
        obj['dataset']['heritage_sites'][i]['date'] =""
    }
});


const googleMapsClient = require('@google/maps').createClient({ key: 'YOUR KEY', Promise: Promise });

for (let j = 0; j < todb.length; j++) {
    todb[j]['address'] = "Санкт-Петербург "+todb[j]['address']
}

var i = 0;
function myLoop () {
    setTimeout(function () {
        console.log(i)
        //console.log(todb[i]['address'])

        googleMapsClient.geocode(
            {address: todb[i]['address']}) .asPromise() .then((response) =>

        {
            //console.log(response.json.results[0].geometry.location)

            todb[i]['loc'] = (response.json.results[0].geometry.location)
            //console.log(todb[i]['address'])
            //console.log( todb[i]['loc'])

            push_to_db(todb[i])

            i++;

        }) .catch((err) => {
            i++;
            console.log(err);
            }
        );



        if (i < 7936) {
            myLoop();
        }
    }, 1200)
    

}


function push_to_db(object) {
    mongoClient.connect(function(err, client){

        const db = client.db("history_data");
        const collection = db.collection("data");


            collection.insertOne(object, function(err, result){

                if(err){
                    //return console.log(err);
                }
               // console.log(result.ops);

            });



    });

}

geoCode("Адмиралтейская наб. - левый берег р. Большая Нева, от Дворцового моста до Декабристов пл.")

myLoop()
