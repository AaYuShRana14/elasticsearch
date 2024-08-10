const client=require('../Client');
async function createIndex(indexname){
    try{
        const res=await client.indices.create({
            index:indexname,
            mappings:{
                // dynamic:"strict",
                properties:{
                    "name":{
                        type:'text'
                    },
                    "age":{
                        type:'integer'
                    },
                    "phone":{
                        type:'long'
                    }
                }
            }
        });
        console.log("index created")
    }
    catch(e){
        console.log(e);
    }
}
async function deleteIndex(indexname){
    try{
        const res=await client.indices.delete({
            index:indexname
        })
        console.log(res);
    }
    catch(e){
        console.log(e);
    }
    
}

async function reindex(src,target){
    try{
        const res=await client.reindex({
            source:{
                index:src,
                query:{
                    match_all:{}
                },
                _source:["age","name"]
            },
            dest:{
                index:target
            },
            script:{
                source:'ctx._source.uniqueid=ctx._source.age+ctx._source.name',
                lang:'painless',
            }
        })
    }
    catch(e){
        console.log(e);
    }
}
// deleteIndex('bank_new')
// createIndex('bank');
// createIndex('bank_new');
reindex('bank','bank_new');
