const express = require('express')
require('dotenv').config()
const app = express()
const shajs = require('sha.js')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))
