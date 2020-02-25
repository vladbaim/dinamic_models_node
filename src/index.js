import mongoose from 'mongoose'
import express from 'express'
import io from 'socket.io'
import cors from 'cors'
import bodyParser from 'body-parser'
import config from './config'
import https from 'https'
import http from 'http'

//import { getCerts } from './utils'
import { initGfs } from './utils'
import { Model } from './models'

const app = express()
app.use(bodyParser.urlencoded({ extended: true }, { limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cors())


mongoose.connect(config.mongoConnection, config.mongoConnectionOptions, (err, db) => {
    if (err) console.log(err)
    initGfs('uploads')
})

import { BaseControler, FilesControler } from './controlers'
const Base = new BaseControler()
const File = new FilesControler()

app.get('/models', Base.list)
app.get('/model', Base.index)
app.post('/model', Base.create)
app.put('/model', Base.update)
app.delete('/model', Base.delete)

app.get('/file', File.get)

let server = null
if (!config.https)
    server = http.createServer(null, app)
// else 
// 	server = https.createServer(getCerts(config.certPaths), app)

if (server) {
    server.keepAliveTimeout = 60000 * 2
    server.listen(config.port)
    io.listen(server);
    console.log("server started!")
}