const { Client, errors } = require('@elastic/elasticsearch');
const fs = require('fs');
const client = new Client({
    node: 'https://127.0.0.1:9200',
    auth: {
        username: 'elastic',
        password: '+xu=jwvrP6eh4jgIDCkt'
    },
    tls: {
        ca: fs.readFileSync('./http_ca.crt'),
        rejectUnauthorized: false
    },
    requestTimeout: 30000 
});
async function createindex(indexname){
    try{
        const res=await client.indices.create({
            index:indexname,
            settings:{
                number_of_shards:1,
                number_of_replicas:1
            }
        });
        console.log("index created ",res);
    }
    catch(e){
        console.log("error while making index")
    }
}

async function createDocument({indexname,name,age,house}){
    try{
        const res=await client.index({
            index:indexname,
            body:{name,age,house}
        })
        console.log("created document")
    }
    catch(e){
        console.log("error while creating")
    }
}
async function getDocument({indexname,id}){
    try{
        let res;
        if(id!=='' && id!==undefined){
            res=await client.get({
            index:indexname,
            id
           })
           console.log(res._source)
        }
        else{
            res=await client.search({
                index:indexname,
                query:{
                    match_all:{}
                }
            })
            console.log(res.hits.hits);
        }
    }
    catch(e){
        console.log(e);
    }
}
// getDocument({"indexname":'characters',id:'72EKM5EBbam2yBRlZ6hU'})
// createindex('characters');
// createDocument({"indexname":'characters',"age":'22',"name":'Jamie',house:'Lannister'})