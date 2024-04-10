const {Kafka} =  require("kafkajs");

run();
async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["rohan:9092"]
        })

        const admin = kafka.admin();
        console.log("Connecting...");
        await admin.connect();
        console.log("Connected!");
        await admin.createTopics({
            "topics": [{
                "numPartitions": 2,
                "topic": "Users"
            }]
        })
        console.log("Created Successfully");
        await admin.disconnect();
    } 
    catch(ex) {
        console.error(ex);
    } finally{
        process.exit();
    }
}