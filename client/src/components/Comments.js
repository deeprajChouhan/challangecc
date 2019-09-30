import React, { Component } from 'react';
import '../pages/css/Feed.css';
import '../pages/css/Home.css';
import axios from 'axios';
class Comments extends Component{
    state = {userid: 0,username: "",users: [],posts: []}
    componentDidMount (){
        var postid = this.state.userid
        fetch('/posts/getcomments?post_id='+postid)
        .then(res => res.json())
        .then(users => this.setState({ users }));
        
    }
    addComment = () => {
        var comment = document.getElementById(this.state.userid+"some").value
        var postid = this.state.userid
        var username = this.state.username
        axios.post('/posts/addcomment?post_id='+postid+"&comment="+comment+"&username="+username)
            .then((res) => {
                var newcomment = document.createElement("div");
                newcomment.innerHTML = '<div class="comment-main-level"><div class="comment-box"><div class="comment-head"><h6 class="comment-name"><a href="">'+username+'</a></h6></div><div class="comment-content">'+comment+'</div></div></div>';
                document.getElementById(this.state.userid).appendChild(newcomment);
                document.getElementById(this.state.userid+"some").innerHTML = " ";
            })
    }
    render (){
        this.state.userid = this.props.post_id;
        
        this.state.username = this.props.uname;
        
        var bgColors = {
            "Yellow" : "#f1f1f1"
          }
        return(
            <div class="comments-container">

    <ul id="comments-list" class="comments-list" style={{backgroundColor: bgColors.Yellow}}>
    {this.state.users.map(user =>

            <li>
            <div class="comment-main-level">
                
                <div class="comment-box">
                    <div class="comment-head">
                        <h6 class="comment-name"><a href="">{user.user_comment_name}</a></h6>
                        
                    </div>
                    <div class="comment-content">
                        {user.comment_content}
                    </div>
                </div>
            </div>
        </li>
        
    )}
        <li id={this.state.userid}></li>
    </ul>
    <div className="input-icons icon"> 
        <i class="fa fa-commenting-o icon"></i> 
        <a onClick={this.addComment}><i class="fa fa-play icon" style={{marginLeft: 470}}></i></a>
        <input type="text" className="comment-input" id={this.state.userid+"some"} placeholder="Add a comment"/>
        
    </div>
</div>

        )
    }
}
export default Comments;
	