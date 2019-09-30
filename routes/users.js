var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var cookieParser = require('cookie-parser')
var morgan = require('morgan')
var app = express()

app.use(morgan('dev'))
app.use(cookieParser())

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'social'
})
app.set('trust proxy', 1)
connection.connect();

router.post('/login' , function(req ,res ,next){
  connection.query("select * from users where uname = '"+req.query.uname+"' and upass = '"+req.query.upass+"'" , function (err, rows, fields) {
    if (err) throw err
    if(Array.isArray(rows) && rows.length){
      if(req.query.uname === rows[0].uname){
        res.json([{
          user_id: rows[0].id
        }]);  
     }else{
      res.send("error").status(500);
     }
    }else{
      res.send("error").status(500);
    }
    
  });
});

router.post('/register' , function(req ,res ,next){
  connection.query("insert into users (uname,upass,name,dob,country,sname) values ('"+req.query.username+"' , '"+req.query.pass+"' , '"+req.query.name+"' , '"+req.query.dob+"' , '"+req.query.country+"' , '"+req.query.sname+"')" , (err , rows, feilds) =>{
    if (err) throw err
    console.log("Record Created");
    res.send("created");
  });
 
});
router.get('/details' , function(req,res,next){
 user_id = req.query.id;
 connection.query("select * from users where id = "+user_id , function(err , rows , feilds) {
   if (err) throw err
   res.json([{
     id: rows[0].id,
     name: rows[0].name,
     dob: rows[0].dob,
     uname: rows[0].uname,
     sname: rows[0].sname,
     country: rows[0].country
   }]);
 });
});
router.get('/myposts' ,(req,res,next) => {
  connection.query('select * from posts where post_user = (select sname from users where id = '+req.query.user_id+')' , function(err , rows, feilds){
    if(err) throw err
    var posts = []
    for(var i in rows){
      var timestamp = rows[i].post_date.toString()
      var stamp = timestamp.split('T');
      console.log(stamp)
      post = {
        "post_title": rows[i].post_title,
        "post_content": rows[i].post_content,
        "psot_date": stamp
      }
      posts.push(post)
    }
    console.log(posts)
  });
});
router.get('/getnotifications' , (req,res,next) => {
  res.send("confirm");
})
router.post('/updateuser' , (req,res,next)=>{
  connection.query("update users set name = '"+req.query.name+"',dob = '"+req.query.dob+"',country='"+req.query.country+"',sname='"+req.query.sname+"' where id = "+req.query.user_id+"" , (err,rows,feilds)=>{
    if(err) throw err
    res.send("done");
  })
})
module.exports = router;