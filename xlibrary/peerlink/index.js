// native.js
const hypercore = require('hypercore')
const hypertrie = require('hypertrie')
const hyperswarm = require('hyperswarm')
var pump = require('pump')
const WebSocketServer = require('websocket').server;
const http = require('http');
const DatastoreWorker = require('./peerStore.js')

let peerStoreLive
var feed
var datastore
let clicks = 0

const server = http.createServer((request, response) => {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});
server.listen(9888, () => {
  console.log('listening on *:9888');
  feed = hypercore('./single-chat-feed', {
    valueEncoding: 'json'
  })
  datastore = hypertrie('./datapeer1.db', {valueEncoding: 'json'})
  peerStoreLive = new DatastoreWorker(datastore)
  console.log('store worker live')
  // console.log(peerStoreLive)
});

// create the server
let wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket server
wsServer.on('request', request => {
  let connection = request.accept(null, request.origin);
  console.log('someone connected');

  connection.on('message', msg => {
    if (msg.type === 'utf8') {
      const o = JSON.parse(msg.utf8Data)
      console.log('incoming message')
      console.log(o)
      console.log(o.reftype)
      if (o.reftype.trim() === 'hello') {
        console.log('conversaton')
        connection.sendUTF(JSON.stringify('talk to CALE'));
      } else if (o.reftype.trim() === 'Datatypes') {
        // query peer hypertrie for datatypes
        if (o.action === 'GET') {
          peerStoreLive.peerDatatypes('Datatypes')
        } else {
          // save a new refContract
          const newRefContract = o.refContract
          peerStoreLive.peerStoreRefContract(newRefContract)
        }
      } else if (o.reftype.trim() === 'Compute') {
        // query peer hypertrie for datatypes
        if (o.action === 'GET') {
          peerStoreLive.peerDatatypes('Datatypes')
        } else {
          // save a new refContract
          const newRefContract = o.refContract
          peerStoreLive.peerStoreRefContract(newRefContract)
        }
      } else if (o.reftype.trim() === 'Units') {
        // query peer hypertrie for Units
        if (o.action === 'GET') {
          peerStoreLive.peerDatatypes('Units')
        } else {
          // save a new refContract
          const newRefContract = o.refContract
          peerStoreLive.peerStoreRefContract(newRefContract)
        }
      } else if (o.reftype.trim() === 'Packaging') {
        // query peer hypertrie for packaging
        if (o.action === 'GET') {
          peerStoreLive.peerDatatypes('Packaging')
        } else {
          // save a new refContract
          const newRefContract = o.refContract
          peerStoreLive.peerStoreRefContract(newRefContract)
        }
      } else {
        clicks += 1
        console.log('incrementing clicks to', clicks);
      }
    }
  });

  connection.on('close', connection => {
  });
});
