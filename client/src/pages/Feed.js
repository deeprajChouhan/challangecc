import React, { Component } from 'react';
import Navbar from '../components/Navbar'
import './css/Feed.css';
import axios from 'axios';
import Comments from '../components/Comments'

class Votes extends Component{                // The Votes Button Component
  constructor(props){
    super(props)
    this.state = {user_id: 0,post_id: 0,likes: 0,liked: true}
  }
  componentDidMount(){
    axios.get('posts/likes?post_id='+this.state.post_id)   // Fetch all the likes on the post
      .then((res) => {
        this.setState({likes: res.data})
      })
  }
  likepost = () =>{
    axios.get('posts/checkliked?post_id='+this.state.post_id+'&user_id='+this.state.user_id) //check wether the post is liked by user previously or not
    .then((res) => {
      if(res.data == 1){
        this.setState({liked: true})
      }else{
        this.setState({liked: false})
      }
    })
    if(!this.state.liked){
      axios.post('posts/addlike?post_id='+this.state.post_id+'&user_id='+this.state.user_id) // likes the post
      .then((res) => {
          this.setState({likes: this.state.likes + 1})
      })
      this.setState({liked: true})
    }  
  }
  render (){
      this.state.user_id = this.props.u_id;
      this.state.post_id = this.props.p_id;
      return (
          <div>         
            <button onClick={this.likepost}>
              <span className="bodymovin"></span>
              <span className="text">{this.state.likes} Votes</span>
            </button>
          </div>
      )
  }
}
class Feed extends React.Component {                     //The Whole Feed Page
  state = {users: [],posts: [],username: ""}
    
    componentDidMount() {
        var user_id = this.getuserid()
        fetch('/users/details?id='+user_id) 
        .then(res => res.json())
        .then(users => this.setState({ users }));
        fetch('/posts/getposts')                            //Fetchs all the current posts
          .then(res => res.json())
          .then(posts => this.setState({ posts }));
         
    }
    getuserid = () =>{                                      //Gets the user id stored in cookies
        var name = "user_id="
        var ca = document.cookie.split(";")
        for(var i = 0;i < ca.length;i++){
            var c = ca[i]
            while(c.charAt(0) == ' '){
                c = c.substring(1)
            }
            if(c.indexOf(name) == 0){
                return c.substring(name.length,c.length)
            }
        }
        return "";
    }
  render() {
    var name = ""
        var uname = ""
        var dob = ""
        var uid = ""
        var sname = ""
        {this.state.users.map(user => name = user.name)}
        {this.state.users.map(user => uname = user.uname)}
        {this.state.users.map(user => dob = user.dob)}
        {this.state.users.map(user => uid = user.id)}
        {this.state.users.map(user => sname = user.sname)}
        this.state.username = sname;
        var bgColors = {
          "Yellow" : "#f1f1f1"
        }

    return (
      <div>
      <Navbar user={sname} />
      <div className="row feed">
          
    
{this.state.posts.map(post =>
        <div>
{/* <div className="provider">
      <p><span>@</span>{post.post_user}</p>
</div>        */}
<section>
<article >
  <div className="box">
    
  <header>
        <h1><span>{post.post_title}</span></h1>
        <div class="meta"><h2>@{post.post_user}</h2> </div>
  </header>
    <div className="feed" ><h2></h2>
    <p>{post.post_content}</p>
    </div>
    <div className="zone">
      <Votes u_id={uid} p_id={post.post_id}/>
    </div>
  </div>
  <div className="box">
      
			{/* here  */}
				  <Comments post_id={post.post_id}   uname={this.state.username}/>
      {/* to here */}
  </div>
</article>

</section>
</div>
)}
<article>
    </article>
 
      </div>
      </div>
    );
  }
}

export default Feed;