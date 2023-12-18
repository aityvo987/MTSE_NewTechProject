const mongoose = require('mongoose');

exports.getsession = (req, res) => {
  
        if(typeof(req.session.userinfo)==='undefined' || req.session.userinfo===null){
            res.status(402).json({message:"Session not found"})
        }
        else{
          res.status(200).json({userinfo:req.session.userinfo,roles:req.session.roles,accessToken:req.session.accessToken})
        }
};