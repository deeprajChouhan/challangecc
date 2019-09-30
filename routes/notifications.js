var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var cookieParser = require('cookie-parser')
var session = require('express-session')
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

  connection.connect();

  router.get("/votes", (req,res,next) => {
      connection.query("select * from notification_votes where user_id = "+req.query.user_id+" order by date desc" , (err,rows0,feilds) => {
        if(Array.isArray(rows0) && rows0.length){
            
        var vote_id = rows0[0]["vote_id"]
        connection.query("select sname from users where id = "+req.query.user_id+"" , (err,rows,feilds) => {
            sname = rows[0]["sname"];
            connection.query("select posts.post_title from votes join posts on votes.post_id = posts.post_id where votes.id = "+vote_id+"" , (err,rows,feilds) => {
              var title = rows[0]['post_title']
              var obj = {
                  "sname": sname,
                  "title": title
                }
                console.log(obj)
                res.json([{
                    sname: sname,
                    tittle: title
                }]); 
          });
      });
        }
  })
})
router.get("/comments" , (req,res,next) => {
    connection.query("select * from notification_comments join comments on notification_comments.comment_id = comments.comment_id join posts on comments.post_id = posts.post_id where post_user = (select sname from users where id = "+req.query.user_id+")" , (err,rows,feilds) => {
        if(err) throw err
        res.json(rows)
    });
})
  router.get("/getvotes", (req,res,next) => {
      connection.query("select sname from users where id = "+req.query.user_id+"" , (err,rows,feilds) => {
          sname = rows[0]["sname"];
          connection.query("select posts.post_title from votes join posts on votes.post_id = posts.post_id where votes.id = "+req.query.vote_id+"" , (err,rows,feilds) => {
            var title = rows[0]['post_title']
            var obj = {
                "sname": sname,
                "title": title
              }
              console.log(obj)
              res.send(obj);
        });
      });
  })
  router.post("/clear" , (req,res,next) => {
    connection.query("delete from notification_votes where user_id = "+req.query.user_id+"" , (err,rows,feilds)=> {
        if (err) throw err
        connection.query("delete from notification_comments" , (err,rows,feilds)=>{
            if(err) throw err
            res.send("done");
        })
    })
  })
  module.exports = router;