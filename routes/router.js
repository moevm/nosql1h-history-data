var express = require('express');
var router = express.Router();


var MongoClient = require('mongodb').MongoClient;


/* GET auction members. */
router.post('http://localhost:3001/export', function(req, res, next) {
    res.render('members', { members: auctMembers });
    console.log("Я ТЫТ")
    MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
        if (err) throw err;
        var dbo = db.db("history_data");
        var array = [];
        dbo.collection("data").find({}).toArray(function(err, result) {
            if (err) throw err;
            for ( i = 0; i < result.length; i++) {
                array.push(result[i]);
            }
            file = JSON.stringify(array);
            fs.writeFileSync('backup.json', file);
            console.log("export finished backup.json");
            db.close();
        })
    });

});


module.exports = router;
