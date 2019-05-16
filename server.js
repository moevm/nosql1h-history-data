var http = require('http');
var url = require('url')
var fs = require('fs')

http.createServer(function (req, res) {
    var MongoClient = require('mongodb').MongoClient;

   if(req.url === "/?name=Export"){
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
       return
   }

    if(req.url === "/?name=Import"){
        MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
            var rawdata = fs.readFileSync('backup.json');
            var data = JSON.parse(rawdata);
           // if (err) throw err;
            var dbo = db.db("history_data");
            dbo.collection("data").insertMany(data)
            console.log("import finished from backup.json");
            db.close()
        });
        return
    }

    if(req.url === "/?name=Drop"){
        MongoClient.connect("mongodb://localhost:27017/", function(err, db) {
            var dbo = db.db("history_data");
            dbo.collection("data").drop(function(err, delOK) {
                if (err) throw err;
                if (delOK) console.log("Collection deleted");
                db.close();
            });
        });
        return
    }

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

