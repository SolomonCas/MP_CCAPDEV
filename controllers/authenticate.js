const authenticate = {
    ensureAuthenthicated: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/login');
    },
    ensureNotAuthenthicated: function(req, res, next){
        if(req.isAuthenticated()){
            return res.redirect('/home');
        }
        next();
    }
}

export default authenticate;