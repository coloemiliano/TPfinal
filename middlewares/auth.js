const verifyAdmin = (req, res, next) => {
    if(req.session.admin == 1){
        next();
    }
    else{
        res.render('noAutorizado');
    }
}

module.exports = {verifyAdmin}