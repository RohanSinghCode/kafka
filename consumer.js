const {Kafka} =  require("kafkajs");
run();
async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["rohan:9092"]
        })

        const consumer = kafka.consumer({"groupId": "test"});
        console.log("Connecting...");
        await consumer.connect();
        console.log("Connected!");

        await consumer.subscribe({
            "topic": "Users",
            "fromBeginning": true
        })

        await consumer.run({
            "eachMessage": async result => {
                console.log(result.message.value);
            }
        })
    } 
    catch(ex) {
        console.error(ex);
    }
}