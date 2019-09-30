var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var morgan = require('morgan')
var app = express()

app.use(morgan('dev'))
app.use(cookieParser())

var sess;
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'social'
})
app.set('trust proxy', 1)
connection.connect();
var getuserid = (username) => {
  connection.query("select id from users where username = '"+username+"'" , function(err,rows,feilds){
    return rows[0]['id'];
  });
}
// request to create a new post
router.post('/createpost' ,  function(req,res, next){
  var today = new Date(); 
  var dd = today.getDate(); 
  var mm = today.getMonth() + 1; 

  var yyyy = today.getFullYear(); 
  if (dd < 10) { 
      dd = '0' + dd; 
  } 
  if (mm < 10) { 
      mm = '0' + mm; 
  } 
  var d = yyyy+'-'+mm+'-'+dd ; 
    if(req.query.name != ""){
      connection.query("insert into posts (post_title,post_content,post_user,post_date) values ('"+req.query.title+"' , '"+req.query.story+"' , '"+req.query.name+"' , '"+d+"')" , (err,rows,feilds)=>{
        if (err) throw err
        res.send("done")
      });
    }else{
      res.status(500);
    }
});
// request to get all post
router.get('/getposts' , (req,res,next) => {
        var today = new Date(); 
        var dd = today.getDate(); 
        var mm = today.getMonth() + 1; 
  
        var yyyy = today.getFullYear(); 
        if (dd < 10) { 
            dd = '0' + dd; 
        } 
        if (mm < 10) { 
            mm = '0' + mm; 
        } 
        var d = yyyy+'-'+mm+'-'+dd ; 
  connection.query("SELECT * from posts where post_date = '"+d+"' " , function(err,rows,feilds)  {
    if (err) throw err
    res.json(rows);
  });
})
// request to add a new comment
router.post('/addcomment' , (req,res,next) => {
    connection.query("insert into comments (comment_content,user_comment_name,post_id) values ('"+req.query.comment+"' , '"+req.query.username+"' , "+req.query.post_id+")" , (err,rows,feilds)=>{
      if (err) throw err  
    });
    connection.query("select max(comment_id) from comments" , function(err,rows,feilds){
      if (err) throw err
      comment_id = rows[0]['max(comment_id)'];
      console.log(comment_id)
      var username = req.query.username;
      connection.query("insert into notification_comments (user_id,comment_id) values ((select id from users where sname = '"+username+"'),"+comment_id+")" , function(err,rows1,feilds){
        if (err) throw err
        console.log("done");
      });
    });
    
    res.send("done");

  });


//request to get all comments of a post
router.get('/getcomments' , (req,res,next)=>{
  connection.query("SELECT * from comments where post_id = "+req.query.post_id+"" , function(err,rows,feilds)  {
    if (err) throw err
    res.json(rows);
  });
})
//request to like or vote a post
router.post('/addlike' , (req,res,next) => {
  connection.query('insert into votes (user_id,post_id) values ('+req.query.user_id+','+req.query.post_id+')' , (err,rows,feilds) => {
    if (err) throw err
  });
  connection.query("select max(id) from votes" , function(err,rows,feilds){
    if (err) throw err
    votes_id = rows[0]['max(id)'];
    var username = req.query.user_id;
    connection.query("insert into notification_votes (user_id,vote_id) values ("+username+","+votes_id+")" , function(err,rows1,feilds){
      if (err) throw err
      console.log("done");
    });
  });
  res.send("done")
});
// request to get all likes of a post
router.get('/likes',(req,res,next) =>{
  connection.query('select count(user_id) from votes where post_id = '+req.query.post_id+'' , (err,rows,feilds)=>{
    res.json(rows[0]['count(user_id)'])
  });
});
// request to check wether the post is previously liked or not
router.get('/checkliked',(req,res,next) =>{
  connection.query('select count(user_id) from votes where post_id = '+req.query.post_id+' and user_id = '+req.query.user_id+'' , (err,rows,feilds)=>{
    if(err) throw err
    if(rows[0]['count(user_id)'] != 0){
      res.json(1)
    }else{
      res.json(0)
    }
  });
});
//fetch all the post of the user
router.get('/fetchuserposts' , (req,res,next)=>{
  connection.query("select * from posts where post_user=(select sname from users where id = "+req.query.user_id+") order by post_date desc" , (err,rows,feilds)=>{
    if(err) throw err
    console.log(rows)
    res.send(rows)
  });
});
//update the post details and post it again
router.post("/postagain" , (req,res,next)=>{
  var today = new Date(); 
        var dd = today.getDate(); 
        var mm = today.getMonth() + 1; 
  
        var yyyy = today.getFullYear(); 
        if (dd < 10) { 
            dd = '0' + dd; 
        } 
        if (mm < 10) { 
            mm = '0' + mm; 
        } 
        var d = yyyy+'-'+mm+'-'+dd ;
  connection.query("update posts set post_date = '"+d+"' where post_id = "+req.query.post_id+"" , function(err,rows,feilds){
    if (err) throw err
    res.send("done")
  });
})
router.get("/ranking" , (req,res,next) => {
  var today = new Date(); 
        var dd = today.getDate(); 
        var mm = today.getMonth() + 1; 
  
        var yyyy = today.getFullYear(); 
        if (dd < 10) { 
            dd = '0' + dd; 
        } 
        if (mm < 10) { 
            mm = '0' + mm; 
        } 
        var d = yyyy+'-'+mm+'-'+dd ;
  connection.query("select count(*),posts.post_user,posts.post_title from votes join posts on votes.post_id = posts.post_id where posts.post_date = '"+d+"' group by votes.post_id order by count(votes.post_id) desc limit 10" , (err,rows,feilds) => {
    res.json(rows)
  });
})
module.exports = router;