var http = require('http');
var url = require('url')


http.createServer(function (req, res) {

    var MongoClient = require('mongodb').MongoClient;

    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin' : '*'});

    MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
        if (err) throw err;
        var dbo = db.db("history_data");

        dbo.collection("data").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.write('[');

            for ( i = 0; i < result.length; i++) {
                var jsontext = JSON.stringify(result[i]);
                res.write(jsontext);
                if(i !== result.length-1)
                    res.write(',')
            }
            res.write(']');
            res.end();
            db.close();
        });
    });
}).listen(3001);
console.log('Server running at 3001');