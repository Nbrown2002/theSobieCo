const express = require('express')
// require('dotenv').config()
const app = express()
// const shajs = require('sha.js')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
// const { ObjectId } = require('mongodb')
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = process.env.MONGO_URI;
app.set('view engine', 'ejs');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))


app.use(session({
  secret: 'your-secret-key', // Replace with a secure secret key
  resave: false,
  saveUninitialized: true
}));

// const client = new MongoClient(uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });
  
  // const mongoCollection = client.db("nbsobie-profiledb").collection("nb-sobie-profile");
  
  // function initProfileData() {
  //   mongoCollection.insertOne({
  //     title: "this is blog title",
  //     post: "this is the post"
  //   });
  // }
  
  app.get('/', async function (req, res) {
  
    // let results = await mongoCollection.find({}).toArray();



    res.render('login',
      { profileData: 'results' });
  })
  
  // Middleware to sanitize input
function sanitizeInput(input) {
  return input.trim().replace(/<[^>]*>?/gm, '');
}

  app.post('/authenticate', (req, res) => {
    const username = sanitizeInput(req.body.uname);
    const password = sanitizeInput(req.body.psw);
    
    console.log(username, password); 


    // Example authentication logic (replace with your own logic)
    if (username === 'admin' && password === 'password') {
      req.session.user = username;
      res.redirect('/profile'); // Redirect to a dashboard or another page
    } else {
      res.status(401).send('Invalid credentials');
    }
  });


  app.get('/profile', (req, res) => {

    res.render('profile', {user : req.session.user}); 
  });

  app.post('/insert', async (req, res) => {
    let results = await mongoCollection.insertOne({
      title: req.body.title,
      post: req.body.post,
    });
    res.redirect('/');
  });
  
  
  app.post('/delete', async function (req, res) {
    let result = await mongoCollection.findOneAndDelete(
      {
        "_id": new ObjectId(req.body.deleteId)
      }
    ).then(result => {
      res.redirect('/');
    })
  
  });
  
  app.post('/update', async (req, res) => {
    let result = await mongoCollection.findOneAndUpdate(
      { _id: ObjectId.createFromHexString(req.body.updateId) }, {
      $set:
      {
        title: req.body.updateTitle,
        post: req.body.updatePost
      }
    }
    ).then(result => {
      console.log(result);
      res.redirect('/');
    })
  });
  
  
  app.listen(port, () => console.log(`server is running on ... localhost:${port}`));
