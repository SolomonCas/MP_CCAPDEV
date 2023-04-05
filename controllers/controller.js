import db from '../models/db.js';
import Post from '../models/PostModel.js';
import Comment from '../models/CommentModel.js';
import User from '../models/UserModel.js';
import upload from "../models/uploadMiddleware.js";


function dateFormat(){
    var today = new Date();

    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();

    var monthArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

    return "" +monthArray[month]+ " " +day+ ", " +year;
}

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getError: function (req, res) {
        res.render('error', {
            title: 'File not found'
        });
    },

    getAbout: function(req, res) {
        console.log('@/about');
        res.render('about');
    },

    //Temporary Home page 
    getHome: function(req, res) {
        console.log("@/home");
        db.findMany(Post, {}, {}, function(data){
            if(data.length >= 1){
                var details = [];
                var i = 0;
                for(var input of data){
                    var detail = {
                        postDate: input['postDate'],
                        postTitle: input['postTitle'],
                        postDesc: input['postDesc'],
                        postid: input['postid'],
                    }
                    details[i] = detail; 
                    i++;
                }
                details = details.reverse();
                res.render('home', {
                    title: "Homepage",
                    posts: details.slice(0,5),
                })
            }
            else{
                res.render('home',{
                    title:"Homepage",
                });
            }
            
        })
        
    },

    getSignup: function(req, res) { 
        console.log("@signup")
        res.render('signup',{
            title: "Signup"
        });
    },

    getLogin: function(req, res) {
        console.log("@login")
        res.render('login', {
            title: "Login",
            message: req.flash('error')
        });
    },

    //Temporary Profile page
    getProfile: function(req, res) {
        console.log("@/profile");
        var username = req.params.username;
        var ArrComments = [], ArrPosts = [];
        var i;

        if(username == null){
            username = req.user.username;
        }
        
            //Get comments of user
            db.findMany (Comment, {author: username}, {}, function (usercomments) {
                if (usercomments) {
                
                    for(i = 0; i < usercomments.length; i++) {
                        var obj = {
                            posttitle : usercomments[i]['postTitle'],
                            comment : usercomments[i]['text'],
                            commentdate : usercomments[i]['date'],
                            postid: usercomments[i]['postid']
                        }
                        ArrComments[i] =  obj;
                    }
                }
            });

            //Get Posts
            db.findMany(Post, {username: username}, {}, function (userposts) {
                if (userposts) {

                    for(i = 0; i < userposts.length; i++) {
                        var obj = {
                            postTitle : userposts[i]['postTitle'],
                            postDesc : userposts[i]['postDesc'],
                            postDate : userposts[i]['postDate'],
                            postid: userposts[i]['postid']
                        }

                        ArrPosts[i] = obj;
                    }
                }
            })

            ArrPosts.reverse();

            //Get user page
            db.findOne(User, {username: username}, {}, function(data){
                  if (data != null) {
                            res.render('profile', 
                            {
                                title:"Profile",
                                username: data['username'],
                                picture: data['picture'],
                                profileDesc: data['profileDesc'],
                                recentpost : ArrPosts.reverse().slice(0,5),
                                recentcomment: ArrComments.reverse().slice(0,5),
                            });
                  }
                  else {
                        res.redirect('/error');
                  }
            })
        
    },
    //Genre page
    getGenre: function(req, res) {
        console.log("@/genre");
        
        res.render('genre',{
            title:"Genre"
        });
        
    },

    getAllposts: function(req, res){
        console.log("@/view-post");
        var username = req.params.username;

        if(username == null){
            username = req.user.username;
        }

        db.findMany(Post, {username: username}, {}, (result) => {
            if(result.length >= 1) {
                var details = [];
                var i = 0;
                for(var input of result){
                    var detail = {
                        game: input['game'],
                        username: input['username'],
                        postDate: input['postDate'],
                        postTitle: input['postTitle'],
                        image: input['image'],
                        postDesc: input['postDesc'],
                        vote: input['vote'],
                        commentNo: input['commentNo'],
                        postid: input['postid'],
                    }
                    details[i] = detail; 
                    i++;
                }
                details = details.reverse();
                res.render('posts', {
                    title: "All Post",
                    items: details
                })
            }
            else{
                res.redirect('/error');
            }
        })
    },

    getAllcomments: function(req, res){
        console.log("@/view-comments");
        var username = req.params.username;

        if(username == null){
            username = req.user.username;
        }
        console.log(username);
        db.findMany(Comment, {author: username}, {}, (result) => {
            if(result.length >= 1) {
                var details = [];
                var i = 0;
                for(var input of result){
                    var detail = {
                        posttitle : input['postTitle'],
                        comment : input['text'],
                        commentdate : input['date'],
                        postid: input['postid']
                    }
                    details[i] = detail; 
                    console.log(detail);
                    i++;
                }
                details = details.reverse();
                res.render('comments', {
                    title: "All Comments",
                    recentcomment: details
                })
            }
            else{
                res.redirect('/error');
            }
        })
    },

    //Temporary Forum page (Need to fix uploading images)
    getForum: function(req, res) {
        console.log("@/forum");
        db.findMany(Post, {}, {}, function(result){
            if(result.length >= 1){
                var details = [];
                var i = 0;
                for(var input of result){
                    var detail = {
                        game: input['game'],
                        username: input['username'],
                        postDate: input['postDate'],
                        postTitle: input['postTitle'],
                        image: input['image'],
                        postDesc: input['postDesc'],
                        vote: input['vote'],
                        commentNo: input['commentNo'],
                        postid: input['postid'],
                    }
                    details[i] = detail; 
                    i++;
                }
                details = details.reverse();
                res.render('forum', {
                    title: "Forum",
                    items: details
                })
            }
            else{
                res.render('forum', {
                    title: "Forum"
                })
            }
        })
        
    },


    //Create page
    getCreate: function(req, res) {
        console.log("@/create");
        res.render('create',{
            title:"Create"
        });
    },

    //Temporary adding post function (need to fix saving images)
    postAddPost: function(req, res) {
        console.log("@/postAddPost");
        upload(req, res, function(err) {
            if(err){
                console.log(err);
                return res.end("Something went wrong");
            }

                var username = req.user.username;
                var game = req.body.game;
                var content = req.body.postDesc;
                var postTitle = req.body.postTitle;
                var postDate = dateFormat();
                var postid = Math.random().toString(36).slice(2);
                var image;
                
            if(!req.file){
                image = "";
            }
            else{
                image = req.file.filename;
            }

            while(db.findOne(Post, {postid:postid}, {}, function(flag){})){
                postid = Math.random().toString(36).slice(2);
            }

            var post = {
                postid: postid,
                game:game,
                username:username,
                postDate:postDate,
                postTitle:postTitle,
                image:image,
                postDesc:content,
                vote:0,
                commentNo:0
            }

            db.insertOne(Post, post, function(flag){
                if(flag){
                    res.redirect('/forum');
                }
            })

        });
    },

    //Maybe temporary Game page
    getPage: function(req, res) {
        var game = req.params.game;
        console.log("@/page/"+ game);

        if(game == "apexlegends"){
            db.findMany(Post, {game: "Apex Legends"}, {}, function(data){
                if(data.length >= 1){
                    var details = [];
                    var i = 0;
                    for(var input of data){
                        var detail = {
                            game: input['game'],
                            postDate: input['postDate'],
                            postTitle: input['postTitle'],
                            postDesc: input['postDesc'],
                            postid: input['postid'],
                        }
                        details[i] = detail; 
                        i++;
                    }
                    details = details.reverse();
                    res.render('page', {
                        title: "Apex Legends",
                        background: "apex-wallpaper",
                        gamepost:"APEX LEGENDS",
                        posts: details.slice(0,5)
                    })
                }
                else{
                    res.render('page',{
                        title:"Apex Legends",
                        background:"apex-wallpaper",
                        gamepost:"APEX LEGENDS"
                    });
                }
            })
            
        }
        else if(game == "valorant"){
            db.findMany(Post, {game: "Valorant"}, {}, function(data){
                if(data.length >= 1){
                    var details = [];
                    var i = 0;
                    for(var input of data){
                        var detail = {
                            game: input['game'],
                            postDate: input['postDate'],
                            postTitle: input['postTitle'],
                            postDesc: input['postDesc'],
                            postid: input['postid'],
                        }
                        details[i] = detail; 
                        i++;
                    }
                    details = details.reverse();
                    res.render('page', {
                        title: "Valorant",
                        background: "valorant-wallpaper",
                        gamepost:"VALORANT",
                        posts: details.slice(0,5)
                    })
                }
                else{
                    res.render('page',{
                        title:"Valorant",
                        background:"valorant-wallpaper",
                        gamepost:"VALORANT"
                    });
                }
            })
            
        }
        else if(game == "fortnite"){
            db.findMany(Post, {game: "Fortnite"}, {}, function(data){
                if(data.length >= 1){
                    var details = [];
                    var i = 0;
                    for(var input of data){
                        var detail = {
                            game: input['game'],
                            postDate: input['postDate'],
                            postTitle: input['postTitle'],
                            postDesc: input['postDesc'],
                            postid: input['postid'],
                        }
                        details[i] = detail; 
                        i++;
                    }
                    details = details.reverse();
                    res.render('page', {
                        title: "Fortnite",
                        background: "fortnite-wallpaper",
                        gamepost:"FORTNITE",
                        posts: details.slice(0,5)
                    })
                }
                else{
                    res.render('page',{
                        title:"Fortnite",
                        background:"fortnite-wallpaper",
                        gamepost:"FORTNITE"
                    });
                }
            })
            
        }
        else if(game == "eldenring"){
            db.findMany(Post, {game: "Elden Ring"}, {}, function(data){
                if(data.length >= 1){
                    var details = [];
                    var i = 0;
                    for(var input of data){
                        var detail = {
                            game: input['game'],
                            postDate: input['postDate'],
                            postTitle: input['postTitle'],
                            postDesc: input['postDesc'],
                            postid: input['postid'],
                        }
                        details[i] = detail; 
                        i++;
                    }
                    details = details.reverse();
                    res.render('page', {
                        title: "Elden Ring",
                        background: "eldenring-wallpaper",
                        gamepost:"ELDEN RING",
                        posts: details.slice(0,5)
                    })
                }
                else{
                    res.render('page',{
                        title:"Elden Ring",
                        background:"eldenring-wallpaper",
                        gamepost:"ELDEN RING"
                    });
                }
            })
            
        }
        else if(game == "odyssey"){
            db.findMany(Post, {game: "Mario Odyssey"}, {}, function(data){
                if(data.length >= 1){
                    var details = [];
                    var i = 0;
                    for(var input of data){
                        var detail = {
                            game: input['game'],
                            postDate: input['postDate'],
                            postTitle: input['postTitle'],
                            postDesc: input['postDesc'],
                            postid: input['postid'],
                        }
                        details[i] = detail; 
                        i++;
                    }
                    details = details.reverse();
                    res.render('page', {
                        title: "Mario Odyssey",
                        background: "odyssey-wallpaper",
                        gamepost:"MARIO ODYSSEY",
                        posts: details.slice(0,5)
                    })
                }
                else{
                    res.render('page',{
                        title:"Mario Odyssey",
                        background:"odyssey-wallpaper",
                        gamepost:"MARIO ODYSSEY"
                    });
                }
            })
            
        }
        else{
            res.redirect('/error');
        }
        
    },

    //Maybe temporary Post page
    getPost: function(req, res) {
        console.log("@/post/"+ req.params.id);
        var query = {postid: req.params.id};

        db.findOne(Post, query, {}, function(data){
            if(data != null){
                var background;
                if(data['game'] == "Apex Legends"){
                    background = "apex-wallpaper";
                }
                else if(data['game'] == "Elden Ring"){
                    background = "eldenring-wallpaper";
                }
                else if(data['game'] == "Fortnite"){
                    background = "fortnite-wallpaper";
                }
                else if(data['game'] == "Mario Odyssey"){
                    background = "odyssey-wallpaper";
                }
                else if(data['game'] == "Valorant"){
                    background = "valorant-wallpaper";
                }
            
                db.findMany(Comment, {postid: data['postid']}, {}, function(comments){
                  if (comments != null) {
                        var commentArr = [];
                        for (let i = 0; i < comments.length; i++) {
                              var comment = {
                                    author: comments[i].author,
                                    text: comments[i].text,
                                    date: comments[i].date
                              }

                              commentArr[i] = comment;
                        }

                        commentArr.reverse();

                        res.render('post', {
                        title: data['game'],
                        background: background,
                        game: data['game'],
                        username: data['username'],
                        postDate: data['postDate'],
                        postTitle: data['postTitle'],
                        image: data['image'],
                        postDesc: data['postDesc'],
                        vote: data['vote'],
                        commentbox: commentArr,
                        postid: data['postid']
                        })

                  }
                  else {
                        res.render('post', {
                        title: data['game'],
                        background: background,
                        game: data['game'],
                        username: data['username'],
                        postDate: data['postDate'],
                        postTitle: data['postTitle'],
                        image: data['image'],
                        postDesc: data['postDesc'],
                        vote: data['vote'],
                        postid: data['postid']
                        })
                  }
                })
            }
            else{
                res.redirect('/error');
            }
        })
    },
}

export default controller;