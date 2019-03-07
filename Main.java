import com.mongodb.Block;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import static com.mongodb.client.model.Filters.eq;

public class Main {

    public static void main(String[] args) {

        Block<Document> printBlock = document -> System.out.println(document.toJson());
        //Connecting
        MongoClientURI uri = new MongoClientURI(
                "mongodb://stargen:<PASSWORD>@cluster0-shard-00-00-dkc5z.mongodb.net:27017,cluster0-shard-00-01-dkc5z.mongodb.net:27017,cluster0-shard-00-02-dkc5z.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true");

        MongoClient mongoClient = new MongoClient(uri);
        MongoDatabase database = mongoClient.getDatabase("DB");

        MongoCollection<Document> collection = database.getCollection("Dates");

        //Reading
        collection.find(eq("district", " 8; Черноморский пер."))
                .forEach(printBlock);

        mongoClient.close();
    }
}
