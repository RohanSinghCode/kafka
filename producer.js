const {Kafka} =  require("kafkajs");
const msg = process.argv[2];
run();
async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["rohan:9092"]
        })

        const producer = kafka.producer();
        console.log("Connecting...");
        await producer.connect();
        console.log("Connected!");
        const partition = msg[0] < "N" ? 0 : 1;
        const result = await producer.send({
            "topic": "Users",
            "messages": [{
                "value": msg,
                "partition": partition
            }
            ]
        })
        console.log(`Send Successfully ${JSON.stringify(result)}`);
        await producer.disconnect();
    } 
    catch(ex) {
        console.error(ex);
    } finally{
        process.exit();
    }
}