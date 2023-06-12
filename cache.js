const redis=require('redis');
const client=redis.createClient();

client
    .connect()
    .then(async (res)=>{
        const value=await client.lRange('data',0,-1);
        client.quit();
    })
    .catch((err)=>{
        console.log('cache_Error'+err.message);
    })

module.exports={
    client
}