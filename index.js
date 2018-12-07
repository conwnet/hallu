#!/usr/bin/env node

const program = require('commander');
const client = require('hallu-client');
const server = require('hallu-server');

program
    .option('-p, --ports <ports>', 'control,mock,proxy', '5260,5261,5262')
    .parse(process.argv);

const [cp, mp, pp] = program.ports.split(',').map(i => +i);

client.listen(cp || 5260);
server.listen(mp || 5261);

console.log('Frontend Host: http://0.0.0.0:' + cp);
console.log('Mock Server Host: http://0.0.0.0:' + mp);
