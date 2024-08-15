const client=require('../Client');
async function alias(indexname,aliasName){
    try{
        const res=await client.indices.putAlias({
            index:indexname,
            name:aliasName,
            filter:{
                match:{
                    "name":'theon'
                }
            },
            // is_write_index:true
            // apply to the one index where u wanna write doc
        })
        // const r=await client.indices.deleteAlias({
        //     index:indexname,
        //     name:aliasName
        // })
        console.log('alias created');
    }
    catch(e){
        console.log(e);
    }
}
// alias('students','school');
async function createDocument(aliasName,name,age){
    try{
        const res=await client.index({
            index:aliasName,
            body:{name,age}
        })
        console.log("created document")
    }
    catch(e){
        console.log("error while creating")
    }
}
// alias('teachers','school');
// createDocument('school','theon','19');
