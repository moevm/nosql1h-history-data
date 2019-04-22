const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });

mongoClient.connect(function(err, client){

    const db = client.db("Test");
    const collection = db.collection("Test");
    let user = {name: "Tom", age: 23};




    collection.insertOne(user, function(err, result){

        if(err){
            return console.log(err);
        }
        console.log(result.ops);

    });

   collection.findOne({'name':"Tom"})
        .then(function(doc) {
            if(!doc)
                throw new Error('No record found.');
            console.log(doc);//else case
        });

    client.close();
});