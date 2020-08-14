// native.js
const hypercore = require('hypercore')
const hypertrie = require('hypertrie')
const hyperswarm = require('hyperswarm')
var pump = require('pump')
const WebSocketServer = require('websocket').server;
const http = require('http');
const DatastoreWorker = require('./peerStore.js')
const KBIDstoreWorker = require('./kbidStore.js')
const fs = require('fs')
var os = require("os")

let peerStoreLive
let kbidStoreLive
var feed
var datastore
var datastorek
let clicks = 0

let peer1Key = ''
let swarm = hyperswarm()

const server = http.createServer((request, response) => {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});
server.listen(9888, () => {
  console.log('listening on *:9888');

  if (fs.existsSync(os.homedir() + '/peerlink')) {
    // Do something
    console.log('yes path existings')
  } else {
    console.log('no path ')
    fs.mkdir(os.homedir() + '/peerlink', function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log("New directory successfully created.")
      }
    })
  }

  feed = hypercore(os.homedir() + '/peerlink/peerlog', {
    valueEncoding: 'json'
  })
  datastore = hypertrie(os.homedir() + '/peerlink/datapeer1.db', {valueEncoding: 'json'})
  peerStoreLive = new DatastoreWorker(datastore, swarm)
  datastoreK = hypertrie(os.homedir() + '/peerlink/kbidpeer1.db', {valueEncoding: 'json'})
  kbidStoreLive = new KBIDstoreWorker(datastoreK)
  console.log('store and KBID workers live')
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

  connection.on('message', async msg => {

    function callback (err, data) {
      console.log('data from hyperieiee')
      console.log(err)
      console.log(data)
      connection.sendUTF(JSON.stringify(data))
    }
    if (msg.type === 'utf8') {
      const o = JSON.parse(msg.utf8Data)
      console.log('incoming message')
      console.log(o.reftype.trim())
      if (o.reftype.trim() === 'hello') {
        console.log('conversaton')
        connection.sendUTF(JSON.stringify('talk to CALE'));
      } else if (o.reftype.trim() === 'replicatekey') {
        // two peer syncing reference contracts
        peer1Key = Buffer.from(o.publickey, "hex")
        console.log(peer1Key)
        swarm.join(peer1Key, {
          lookup: true, // find & connect to peers
          announce: true // optional- announce yourself as a connection target
        })
      } else if (o.reftype.trim() === 'datatype') {
        // query peer hypertrie for datatypes
        if (o.action === 'GET') {
          const datatypeList = await peerStoreLive.peerGETRefContracts('datatype', callback)
        } else {
          // save a new refContract
          const newRefContract = o.refContract
          const savedFeedback = peerStoreLive.peerStoreRefContract(o)
          connection.sendUTF(JSON.stringify(savedFeedback))
        }
      } else if (o.reftype.trim() === 'compute') {
        // query peer hypertrie for datatypes
        if (o.action === 'GET') {
          peerStoreLive.peerGETRefContracts('compute', callback)
        } else {
          // save a new refContract
          peerStoreLive.peerStoreRefContract(o)
        }
      } else if (o.reftype.trim() === 'units') {
        // query peer hypertrie for Units
        if (o.action === 'GET') {
          peerStoreLive.peerGETRefContracts('units', callback)
        } else {
          // save a new refContract
          peerStoreLive.peerStoreRefContract(o)
        }
      } else if (o.reftype.trim() === 'packaging') {
        // query peer hypertrie for packaging
        if (o.action === 'GET') {
          peerStoreLive.peerGETRefContracts('packaging', callback)
        } else {
          // save a new refContract
          const savedFeedback = peerStoreLive.peerStoreRefContract(o)
          connection.sendUTF(JSON.stringify(savedFeedback))
        }
      } else if (o.reftype.trim() === 'module') {
        // query peer hypertrie for packaging
        if (o.action === 'GET') {
          peerStoreLive.peerGETRefContracts('module', callback)
        } else {
          // save a new refContract
          const savedFeedback = peerStoreLive.peerStoreRefContract(o)
          connection.sendUTF(JSON.stringify(savedFeedback))
        }
      } else if (o.reftype.trim() === 'visualise') {
        // query peer hypertrie for packaging
        if (o.action === 'GET') {
          peerStoreLive.peerGETRefContracts('visualise', callback)
        } else {
          // save a new refContract
          const savedFeedback = peerStoreLive.peerStoreRefContract(o)
          connection.sendUTF(JSON.stringify(savedFeedback))
        }
      } else if (o.reftype.trim() === 'experiment') {
        // query peer hypertrie for packaging
        if (o.action === 'GET') {
          peerStoreLive.peerGETRefContracts('experiment', callback)
        } else {
          // save a new refContract
          const savedFeedback = peerStoreLive.peerStoreRefContract(o)
          connection.sendUTF(JSON.stringify(savedFeedback))
        }
      } else if (o.reftype.trim() === 'kbid') {
        // query peer hypertrie for packaging
        if (o.action === 'GET') {
          kbidStoreLive.peerGETkbids('kbid', callback)
        } else {
          // save a new refContract
          const savedFeedback = kbidStoreLive.peerStoreKBIDentry(o)
          connection.sendUTF(JSON.stringify(savedFeedback))
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
