var express = require('express');
var router = express.Router();


module.exports = router;

// new user registration/ sign up
router.post('/user', function (req, res, next) {
    try {
        var reqObj = req.body;
        console.log(reqObj);
        req.getConnection(function (err, conn) {
            if (err) {
                console.error('SQL Connection error:', err);
                return next(err);
            }
            else {
                var insertsql = "INSERT INTO profiles SET ?";
                var insertvalues = {
                    "username": reqObj.usern,
                    "email_id": reqObj.email,
                    "D_O_B": reqObj.dob,
                    "status": reqObj.stat,
                    "password": reqObj.pass
                };
                var query = conn.query(insertsql, insertvalues, function (err, result) {
                    if (err) {
                        console.error('SQL error', err);
                    }
                    console.log(result);
                    res.end();

                });
            }
        });
    }
    catch (ex) {
        console.error("internal error:" + ex);
        return next(ex);
    }
});
// Get All Profiles
router.get('/profile', function (req, res, next) {
    try {
        req.getConnection(function(err,conn){
            if(err){
                console.error('SQL Connection error:', err);
                return next(err);
            } else {
                conn.query('SELECT username, email_id, D_O_B, status FROM profiles', function(err, rows){
                    if (err){
                        console.error('SQL error:', err);
                        return next(err);
                    }
                    res.json(rows);
                    });
            }

            });
    } catch(ex){
        console.error("Internal error:"+ ex);
        return next(ex);

    }

});
