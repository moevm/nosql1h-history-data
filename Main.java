import com.mongodb.*;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import static com.mongodb.client.model.Filters.eq;

public class Main {

    public static void main(String[] args) {
        //Connecting
        MongoClient mongoClient = new MongoClient("localhost", 27017);


        MongoDatabase database = mongoClient.getDatabase("testBase");
        MongoCollection collection = database.getCollection("testCollection");


        //Read a Document from a Collection


        Document myDoc = (Document) collection.find(eq("event_name", "TEST_EVENT")).first();
        System.out.println(myDoc.toJson());



        mongoClient.close();

    }
}
