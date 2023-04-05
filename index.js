import 'dotenv/config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
// import module `express`
import express from 'express';

// import module `hbs`
import exphbs from 'express-handlebars';

// import module `routes` from `./routes/routes.js`
import routes from './routes/routes.js';

// import module `database` from `./model/db.js`
import db from './models/db.js'

import bodyParser from 'body-parser';

import passport from 'passport';

import flash from 'express-flash';

import session from 'express-session';

import fs from 'fs';

import bcrypt from 'bcrypt';

const app = express();
const port = process.env.PORT;
const __dirname = dirname(fileURLToPath(import.meta.url));

import passconfig from './controllers/passport-config.js';
passconfig(passport);

app.engine("hbs", exphbs.engine({extname: 'hbs', partialsDir: __dirname + '/views/partials/'}));
// set `hbs` as view engine
app.set('view engine', 'hbs');

//use json objects
app.use(bodyParser.json());
// parses incoming requests with urlencoded payloads
app.use(bodyParser.urlencoded({extended: true})); 

app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// set the folder `public` as folder containing static assets
// such as css, js, and image files
app.use(express.static('public'));

// define the paths contained in `./routes/routes.js`
app.use('/', routes);

// if the route is not defined in the server, render `../views/error.hbs`
// always define this as the last middleware

app.use(function (req, res) {
    res.render('error', {
        title:"File not Found"
    });
});

// connects to the database
db.connect();

// binds the server to a specific port
app.listen(port, function () {
    console.log('app listening at port ' +'http://localhost:'+ port);
});

import Post from './models/PostModel.js';
import Comment from './models/CommentModel.js'
import User from './models/UserModel.js'

db.findMany(Post, {}, {}, function(result){
    if(result){
        for(var input of result){
            var s = input['image'];
            if(s.includes('image')){
                var dir = './public/save-photos/' + s;
                console.log('img dir: ' + dir);
                fs.unlink(dir, function(err){
                    if(err) throw err;
                    console.log('deleted file');
                })
            }
        }
    }
})

//Sample Users
const users = [
      {
          username: "BigChungus",
          email: "yaboichungus@gmail.com",
          password: "thereturnofthebigchungus",
          picture: "bigchungus.jpg",
          profileDesc: "Just your average random passerby!"
      },
      {
          username: "RhRhage",
          email: "rhonnyboy@gmail.com",
          password: "rhageboy04",
          picture: "rhrhage.jpg",
          profileDesc: "I love games especially Elden Ring but I tend to rage too much..."     
      },
      {
          username: "Salty",
          email: "saltygamer@gmail.com",
          password: "saltedpassword12",
          picture: "salty.jpg",
          profileDesc: "I am just a very salty person."     
      },   
      {
          username: "ThatOneGuy",
          email: "thatoneguy22@gmail.com",
          password: "thatonepassword",
          picture: "thatoneguy.jpg",
          profileDesc: "I love games and memes."     
      }, 
      {
          username: "YourOnlyFriend",
          email: "nofriends@gmail.com",
          password: ("YoUhAvEnOfRiEnDs"),
          picture: "youronlyfriend.jpg",
          profileDesc: "I love socializing and being friends with everybody UwU"
      }
];

//Sample Posts
const posts = [
      {
          game:"Apex Legends",
          username:"YourOnlyFriend",
          postDate:"April 25, 2022",
          postTitle:"Punching someone makes their eyes pop out",
          image: "post1.jpg",
          postDesc:"I dont know if this is a glitch or something but it looks hilarious!",
          vote:0,
          commentNo:5,
          postid: "0a", //test id
          upvoters: [],
          downvoers: [],
      },
      {
          game:"Mario Odyssey",
          username:"ThatOneGuy",
          postDate:"April 25, 2022",
          postTitle:"Rendering glitch in Mario Odyssey",
          image: "post2.jpg",
          postDesc:"Theres was a glitch in rendering while I was playing Mario odyssey...",
          vote:0,
          commentNo:5,
          postid: "0b",
          upvoters: [],
          downvoers: [],  
      },
      {
          game:"Valorant",
          username:"Salty",
          postDate:"April 27, 2022",
          postTitle:"This bug just ruined my match",
          image: "post3.jpg",
          postDesc:"I was in a middle of the match and was playing sage when i just clipped throught the floor. It happened in split and we lost the round cause of this damn bug! Riot please fix it!",
          vote:0,
          commentNo:5,
          postid: "0c",
          upvoters: [],
          downvoers: [],          
      },   
      {
          game:"Valorant",
          username:"BigChungus",
          postDate:"April 29, 2022",
          postTitle:"Found this new Sova Lineup",
          image: "post4.jpg",
          postDesc:"While exploring on the practice range, I found a new lineup for Sova in Haven. Just point your recon dart at this spot and charge it for one bar and shoot without bounces. It gives good info on the locations of the enemy at the start of the round.",
          vote:0,
          commentNo:5,
          postid: "0d",
          upvoters: [],
          downvoers: [],          
      }, 
      {
          game:"Elden Ring",
          username:"RhRhage",
          postDate:"April 29, 2022",
          postTitle:"New Bug Found on ER v1.01",
          image:"post5.jpg",
          postDesc: "So, I found a bug in Elden Ring where if you go to this wall and repeatedly hit it, your character will get stuck on their attack action.",
          vote:0,
          commentNo:5,
          postid: "0e",
          upvoters: [],
          downvoers: [],  
      }
];

//Sample Comments
const comments = [
      { //For Post 1
          author: "BigChungus",
          text: "This looks very ridiculous...I love it.",
          date: "April 25, 2022",
          postid: "0a",
          postTitle: "Punching someone makes their eyes pop out"
      },
      {
          author: "YourOnlyFriend",
          text: "LMAO I hope I get this glitch! Looks funny as hell.",
          date: "April 25, 2022",
          postid: "0a",
          postTitle: "Punching someone makes their eyes pop out"
      },
      {
          author: "ThatOneGuy",
          text: "lol",
          date: "April 25, 2022",
          postid: "0a",
          postTitle: "Punching someone makes their eyes pop out"    
      },   
      {
          author: "Salty",
          text: "XD",
          date: "April 25, 2022",
          postid: "0a",
          postTitle: "Punching someone makes their eyes pop out" 
      }, 
      {
          author: "RhRhage",
          text: "HAHAHAHAHAHAHAHAHAHAHAHAHAHA",
          date: "April 25, 2022",
          postid: "0a",
          postTitle: "Punching someone makes their eyes pop out"
      },

      { //For Post 2
          author: "RhRhage",
          text: "Doesnt seem to be that bad...",
          date: "April 26, 2022",
          postid: "0b",
          postTitle: "Rendering glitch in Mario Odyssey"
      },
      {
          author: "ThatOneGuy",
          text: "bruh",
          date: "April 26, 2022",
          postid: "0b",
          postTitle: "Rendering glitch in Mario Odyssey"
      },
      {
          author: "Salty",
          text: "What are your specs?",
          date: "April 26, 2022",
          postid: "0b",
          postTitle: "Rendering glitch in Mario Odyssey"    
      },   
      {
          author: "YourOnlyFriend",
          text: "Been a while since I last played this.",
          date: "April 26, 2022",
          postid: "0b",
          postTitle: "Rendering glitch in Mario Odyssey"    
      }, 
      {
          author: "BigChungus",
          text: "I have a budget pc and I havent had any rendering issues...",
          date: "April 27, 2022",
          postid: "0b",
          postTitle: "Rendering glitch in Mario Odyssey"
      },

      { //For Post 3
          author: "RhRhage",
          text: "Sucks to be you..",
          date: "April 27, 2022",
          postid: "0c",
          postTitle: "This bug just ruined my match"
      },
      {
          author: "ThatOneGuy",
          text: "LMAO",
          date: "April 27, 2022",
          postid: "0c",
          postTitle: "This bug just ruined my match"
      },
      {
          author: "Salty",
          text: "This has never happened to me, but I hope it doesnt.",
          date: "April 27, 2022",
          postid: "0c",
          postTitle: "This bug just ruined my match"
      },   
      {
          author: "YourOnlyFriend",
          text: "They better fix that bug pronto. It's game breaking.",
          date: "April 28, 2022",
          postid: "0c",
          postTitle: "This bug just ruined my match"    
      }, 
      {
          author: "ThatOneGuy",
          text: "It's not a bug, your internet just sucks...",
          date: "April 28, 2022",
          postid: "0c",
          postTitle: "This bug just ruined my match"
      },
      
      { //For Post 4
          author: "BigChungus",
          text: "This actually works! very useful in-game.",
          date: "April 29, 2022",
          postid: "0d",
          postTitle: "Found this new Sova Lineup"
      },
      {
          author: "ThatOneGuy",
          text: "LMAO",
          date: "April 29, 2022",
          postid: "0d",
          postTitle: "Found this new Sova Lineup"
      },
      {
          author: "YourOnlyFriend",
          text: "I dont play Sova, but thanks for the new info.",
          date: "April 29, 2022",
          postid: "0d",
          postTitle: "Found this new Sova Lineup" 
      },   
      {
          author: "RhRhage",
          text: "Lets go! more Sova tricks!!!!",
          date: "April 30, 2022",
          postid: "0d",
          postTitle: "Found this new Sova Lineup"    
      }, 
      {
          author: "Salty",
          text: "I cannot Sova.",
          date: "April 30, 2022",
          postid: "0d",
          postTitle: "Found this new Sova Lineup"
      },
      
      { //For Post 5
          author: "BigChungus",
          text: "woah, you can totally abuse the bug!",
          date: "April 29, 2022",
          postid: "0e",
          postTitle: "New Bug Found on ER v1.01"
      },
      {
          author: "ThatOneGuy",
          text: "this is actually funny!",
          date: "April 29, 2022",
          postid: "0e",
          postTitle: "New Bug Found on ER v1.01"
      },
      {
          author: "YourOnlyFriend",
          text: "I tried it, it really bugs out.",
          date: "April 29, 2022",
          postid: "0e",
          postTitle: "New Bug Found on ER v1.01"    
      },   
      {
          author: "RhRhage",
          text: "I hope they patch this bug...",
          date: "April 30, 2022",
          postid: "0e",
          postTitle: "New Bug Found on ER v1.01"    
      }, 
      {
          author: "Salty",
          text: "The bug will probably be fixed by the time I get the game...",
          date: "April 30, 2022",
          postid: "0e",
          postTitle: "New Bug Found on ER v1.01"
      }
];


db.deleteMany(User, {}, function(clear){
    if (clear){
          console.log("USERS CLEARED");
          db.insertMany(User, users, function(flag){
            if(flag){
                console.log('import Users success');
            }
            else{
                console.log('import Users error');
            }
      })
      
    }
})

db.deleteMany(Post, {}, function(clear){
    if (clear){
          console.log("POSTS CLEARED");
          db.insertMany(Post, posts, function(flag){
            if(flag){
                console.log('import Posts success');
            }
            else{
                console.log('import Posts error');
            }
        })
        
    }
})

db.deleteMany(Comment, {}, function(clear){
    if (clear){
          console.log("COMMENTS CLEARED");
          db.insertMany(Comment, comments, function(flag){
            if(flag){
                console.log('import Comments success');
            } 
            else{
                console.log('import Comments error');
            }
      })
    }
})