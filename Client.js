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
module.exports=client;