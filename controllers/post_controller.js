import db from '../models/db.js';
import Post from '../models/PostModel.js';
import Comment from '../models/CommentModel.js';
import fs from 'fs';

const post_controller = {
    editPost: function (req, res) {
        db.updateOne(Post, {postid: req.query.postid}, {postDesc: req.query.postDesc}, (data) => {
            res.render('post', {
                postDesc: req.query.postDesc
            })
        })
    },

    deletePost: function (req, res) {
        
        db.findOne(Post, {postid: req.query.postid}, {}, (data) => {
            var image = data['image'];
            if(image != ""){
                var dir = './public/save-photos/' + image;
                fs.unlink(dir, function(err){
                    if(err) throw err;
                    console.log('delete image');
                })
            }
        })
        
        db.deleteOne(Post, {postid: req.query.postid}, (data) => {
            db.deleteMany(Comment, {postid: req.query.postid}, (data) => {
                res.render('forum');
            });
        })
        
    },

    addComment: function (req, res) {
        var author = req.user.username; 
        var text = req.query.text;
        var date = req.query.date;
        var postid = req.query.postid;
        var postTitle = req.query.postTitle;

        const comment = {
            author: author,
            text: text,
            date: date,
            postid: postid,
            postTitle: postTitle
        }
        db.findOne(Post, {postid: postid}, {}, (input) => {
            if(input){
                var data = {
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
                var commentNo = data['commentNo'];
                commentNo++;
                data['commentNo'] = commentNo;
                db.updateOne(Post, {postid: postid}, data, (data) => {
                })
            }
        })
        db.insertOne(Comment, comment, (flag) => {
            if (flag) {
                res.render('post', {
                    commentbox : {
                        author : author,
                        text : text,
                        date : date,
                    }
                })
            }
        })
    },

    checkUsername: function (req, res) {
        db.findOne(Post, {postid: req.query.postid, username: req.user.username}, {}, (data) => {
            res.send(data);
        })
    },

    editVotes: function (req, res) {
        db.updateOne(Post, {postid: req.query.postid}, {vote: req.query.vote}, (data) => {
            res.render('post', {
                vote: req.query.vote
            })
        })
    },

    isUpvoted: function (req, res) {
            
            db.findOne(Post, {postid: req.query.postid}, {}, (post) => {
                  var check = false;
                  if (post){
                        for (var username of post['upvoters']){
                              if (username == req.user.username){
                                    check = true;
                              }
                        }
                        if (check)
                              res.send({message: 'found'});
                        else
                              res.send({message: 'notfound'});     
                  }
            })
    },

    isDownvoted: function (req, res) {
            
            db.findOne(Post, {postid: req.query.postid}, {}, (post) => {
                  var check = false;
                  if (post){
                        for (var username of post['downvoters']){
                              if (username == req.user.username){
                                    check = true;
                              }
                        }
                        if (check)
                              res.send({message: 'found'});
                        else
                              res.send({message: 'notfound'});     
                  }
            })
      },



    addUpvoter: function (req, res) {
            db.findOne(Post, {postid: req.query.postid}, {}, (post) => {
                  if (post){
                        post['upvoters'].push(req.user.username);
                        db.updateOne(Post, {postid: req.query.postid}, {upvoters: post['upvoters']}, (flag)=>{})
                        res.end();
                        
                  }
            })
    },

    removeUpvoter: function (req, res) {
            db.findOne(Post, {postid: req.query.postid}, {}, (post) => {
                  if (post){
                        var index = post['upvoters'].indexOf(req.user.username);
                        post['upvoters'].splice(index, 1);

                        db.updateOne(Post, {postid: req.query.postid}, {upvoters: post['upvoters']}, (flag)=>{})

                        res.end();
                  }
            })
   },

   addDownvoter: function (req, res) {
            db.findOne(Post, {postid: req.query.postid}, {}, (post) => {
                  if (post){
                        post['downvoters'].push(req.user.username);
                        db.updateOne(Post, {postid: req.query.postid}, {downvoters: post['downvoters']}, (flag)=>{})

                        res.end();
                        
                  }
            })
   },

   removeDownvoter: function (req, res) {
            db.findOne(Post, {postid: req.query.postid}, {}, (post) => {
                  if (post){
                        
                        var index = post['downvoters'].indexOf(req.user.username);
                        post['downvoters'].splice(index, 1);

                        
                        db.updateOne(Post, {postid: req.query.postid}, {downvoters: post['downvoters']}, (flag)=>{})

                        res.end();
                  }
            })
   },

}

export default post_controller;
