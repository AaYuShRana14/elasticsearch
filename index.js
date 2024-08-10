const client=require('./Client');
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
async function deleteDocument({indexname,id}){
    try{
        const res=await client.delete({
            index:indexname,
            id
        })
        console.log(res);
    }
    catch(e){
        console.log(e);
    }
}

async function updateDocument({indexname,id},{...updatedFields}){
    try{
        const res=await client.update({
            index:indexname,
            id,
            body:{
                doc:updatedFields
            }
        })
        console.log(res);
    }
    catch(e){
        console.log(e);
    }
}
// getDocument({"indexname":'bank'})
// createindex('bank');
// createDocument({"indexname":'characters',"age":'22',"name":'Jamie',house:'Lannister'})
// deleteDocument({indexname:'characters',id:'72EKM5EBbam2yBRlZ6hU'})
// updateDocument({indexname:'characters',id:'7mEAM5EBbam2yBRlQ6jx'},{name:'Jon Snow the king in the north',age:21,house:'stark'})