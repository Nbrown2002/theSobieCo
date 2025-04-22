const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
app.set('view engine', 'ejs');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/media'))

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Sobie-Admin:Sobie123456789@cluster0.9qwxe.mongodb.net/?appName=Cluster0"//process.env.MONGO_URI;
console.log(uri);


app.use(session({
  secret: 'your-secret-key', // Replace with a secure secret key
  resave: false,
  saveUninitialized: true
}));

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


const mongoCollection = client.db("Sobie").collection("Registrants");
const mongoCollection2 = client.db("Sobie").collection("Users"); 

  
  app.get('/', async function (req, res) {
   // let result = await mongoCollection.find({}).toArray();
   // console.log(result);
   // res.render('registrants',
     // { profileData: result });
    res.render('login', {user : req.session.user}); 
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
    if (username === 'guest' && password === 'password') {
      req.session.user = username;
      res.redirect('/profile'); // Redirect to a dashboard or another page
    } else if (username === 'admin' && password === 'password2') {
      req.session.user = username; 
      res.redirect('/admin')
    }
    else {
      res.status(401).send('Invalid credentials');
    }
  });


  app.get('/admin', (req, res) => {
    res.render('admin', {user : req.session.user}); 
  });

  app.get('/profile', (req, res) => {
    res.render('profile', {user : req.session.user}); 
  });

  app.get('/registration', (req, res) => { 
    res.render('registration', {user : req.session.user}); 
  })

  app.get('/lost_password', (req, res) => { 
    res.render('lost_password', {user : req.session.user}); 
  })

  app.get('/registrants', (req, res) => { 
    let result = mongoCollection.find({}).toArray();
    console.log(result);
    res.render('registrants',
    {user : req.session.user, profileData: result});
  })  

  app.get('/login', (req, res) => { 
    res.render('login', {user : req.session.user}); 
  })  

  app.get('/users', (req, res) => { 
    res.render('users', {user : req.session.user}); 
  })  

  app.get('/research', (req, res) => { 
    res.render('research', {user : req.session.user}); 
  })  

  app.get('/Help', (req, res) => { 
    res.render('Help', {user : req.session.user});
  })

  app.post('/insert', async (req, res) => {
    let results = await mongoCollection.insertOne({
      title: req.body.title,
      post: req.body.post,
    });
    res.redirect('/');
  });
  
  app.post('/insert', async (req, res) => {
    let result = await mongoCollection2.insertOne({
      Registrant_Name: req.body.Registrant_Name,
      Registrant_Status: req.body.Registrant_Status,
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

  app.post('/delete', async function (req, res) {
    let result = await mongoCollection2.findOneAndDelete(
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
        Registrant_Name: req.body.updateTitle,
        Registrant_Status: req.body.updatePost
      }
    }
    ).then(result => {
      console.log(result);
      res.redirect('/');
    })
  });
  
  app.post('/update', async (req, res) => {
    let result = await mongoCollection2.findOneAndUpdate(
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
