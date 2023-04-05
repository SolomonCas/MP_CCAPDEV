
const searchcontroller = {

    //Search Post 
    searchPost: function(req, res) {
        console.log("@/search/post/"+req.params.id);
        
        return res.redirect('/post/'+req.params.id);

    },
    //Search Page
    searchPage: function(req, res) {
        console.log("@/search/page/"+req.params.game);
        
        return res.redirect('/page/'+req.params.game);

    },
    //Search User
    searchUser: function(req, res) {
        console.log("@/search/page/"+req.params.username);
        
        return res.redirect('/profile/'+req.params.username);

    },

}

export default searchcontroller;