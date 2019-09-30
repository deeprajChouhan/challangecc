import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import SimpleCrypto from 'simple-crypto-js'
import NewLogin from './newlogin'
import './css/Home.css';
import './css/CreatePost.css';
import axios from 'axios';
import './css/PreviousPost.css'
import '../components/Sidebar.css'

class Home extends Component{
    state = {users: [],posts: [],greeting: "",num: "",showCreateForm: true,sname: ""}
    constructor(props){
        super();

    }
    componentDidMount() {
        if(this.getuserid === 0){
            window.location.assign("/login")
        } 
        var secretKey = "encryptkarle";
        var crypt = new SimpleCrypto(secretKey)
        var user_id = this.getuserid()
        fetch('/users/details?id='+user_id)
        .then(res => res.json())
        .then(users => this.setState({ users }));
        this.getMyPosts(user_id)
        this.getGreeting()
    }
    getMyPosts = (user_id) =>{
        axios.get('users/myposts?user_id='+user_id)   
          .then(res => res.json())
          .then(posts => this.setState({ posts }));
    }
    getuserid = () =>{
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
        return 0;
    }
    showCreateForm = () =>{
        if(this.state.showCreateForm) this.setState({showCreateForm : false})
        else this.setState({showCreateForm : true})
    }
    getGreeting = () => {
        var d = new Date();
        var time = d.getHours();

        if (time < 12) {
          this.setState({greeting : "Good Morning"})
        }
        if (time > 12 && time < 16) {
            this.setState({greeting : "Good Afternoon"})
        }
        console.log(time)
        if (time > 16 || time === 16 ) {
            this.setState({greeting : "Good Evening"})
        }
    }
    logout = () =>{
        //session destroy
        var res = document.cookie;
        var multiple = res.split(";");
        for(var i = 0; i < multiple.length; i++) {
           var key = multiple[i].split("=");
           document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
        }
        window.location.assign("/login");
    }
    render (){
        var name = ""
        var uname = ""
        var dob = ""
        var uid = ""
        var sname = ""
        var country = ""
        {this.state.users.map(user => this.state.sname = user.sname)}
        {this.state.users.map(user => name = user.name)}
        {this.state.users.map(user => uname = user.uname)}
        {this.state.users.map(user => dob = user.dob)}
        {this.state.users.map(user => uid = user.id)}
        {this.state.users.map(user => sname = user.sname)}
        {this.state.users.map(user => country = user.country)}
        const secretName = sname
        return (
            <div className="main">
            <Navbar user={sname} />
            <div className="">
                <div className="row jumbotron header" >
                <div className="col-md-8 user-info">
                    
                        <h2 className="username">{name}</h2>
                        <h4 className="secretname">@{sname}</h4>
                </div>
                <div className="col-md-4 sidebar" style={{float:"right"}}>
                
                <a data-toggle="modal" data-target="#editProfile"><i class="fa fa-user"></i> Edit Profile</a>
                <a data-toggle="modal" data-target="#notify"><i class="fa fa-bell"></i>  Notifications</a>
                <Notification />
                <a onClick={this.logout}><i class="fa fa-sign-out"></i>  Logout</a>
                <a href="/about"><i class="fa fa-building"></i>  About</a>
                <EditProfile name={name} uname={uname} dob={dob} uid={uid} sname={sname} country={country}/>
                </div>
                    
                    {/* <div className="col-md-5">
                    <div id="Awesome" className="anim750">
	
                        <div className="reveal circle_wrapper">
                              <div className="circle">{this.state.greeting}</div>
                          </div>

                          <div className="sticky anim750">
                              <div className="front circle_wrapper anim750">
                                  <div className="circle anim750"></div>
                            </div>
                          </div>

                        <h4>Hey There !</h4>

                        <div className="sticky anim750">
                              <div className="back circle_wrapper anim750">
                                  <div className="circle anim750"></div>
                              </div>
                          </div>
                          
                        </div>
                    </div> */}
                </div>
                
            </div>
            {/* <div className="row">
                <div className="col-md-4 sidebar">
                <a onClick={this.showCreateForm}><i class="fa fa-pencil-square-o"></i>  Add New Post</a>
                <a ><i class="fa fa-calendar-o"></i>  My Post</a>
                <a href="#contact"><i class="fa fa-bell"></i>  Notifications</a>
                <a href="#about"><i class="fa fa-sign-out"></i>  Logout</a>
                <a href="#about"><i class="fa fa-building"></i>  About</a>
                </div>
                <div className="col-md-8 content ">
                    {this.state.showCreateForm ? null : <CreatePost user_id={secretName} /> }
                    
                </div>
            </div> */}
          
          <div className="row">
            <div className="col-md-4"><CreatePost user_id={secretName}/></div>
            <div className="col-md-8"><PreviousPosts user_id={secretName}/></div>
          </div>
  </div>
        )
    }
}
class CreatePost extends Component{
    constructor(props){
        super(props)
        this.state = {title: "",text: "",sname: ""}
        this.onSubmit= this.onSubmit.bind(this);    
    }
    getsname = () =>{
        return this.state.sname;
    }
    onSubmit = e =>{
        e.preventDefault();
        var tittle = this.state.title;
        var story = this.state.text;
        var uid = new Home().getuserid()
        var name = this.state.sname;
        
        axios.post('/posts/createpost?uid='+uid+'&title='+tittle+'&story='+story+'&name='+name)
            .then((res) =>{
                if(res.data === "done"){
                    alert("post added");
                }
            })
    }
    onChange = e =>{
        this.setState({ [e.target.id]: e.target.value });
    }
    render (){

        const uname = this.props.user_id;
        this.state.sname = uname;
        return (
            <div>
                <div id="form-main">
                
  <div id="form-div" style={{left:300}}>
  <h2 className="heading">What's Today ?</h2>
    <form className="form" id="form1" onSubmit={this.onSubmit}>
      
      <p className="name">
        <input name="title" 
        id="title" 
        type="text" 
        className="validate[required,custom[onlyLetter],length[0,100]] feedback-input" 
        placeholder="Give a Title" 
        id="title" 
        onChange={this.onChange}
        value={this.state.title} 
        required
        />
      </p>
      <p className="text">
        <textarea 
            id="text" 
            name="text" 
            onChange={this.onChange} 
            value={this.state.text} 
            
            className="validate[required,length[6,3000]] feedback-input" 
            id="text" 
            placeholder="Start Writing...." required></textarea>
            
      </p>
      
      
      <div className="submit">
        <input type="submit" value="POST" id="button-blue"/>
        <div className="ease"></div>
      </div>
    </form>
  </div>
  </div>
            </div>
        )
    }
}
class PreviousPosts extends Component{
    state = {posts: [],users: [],votes: 0}
    componentDidMount(){
        var sname = new Home().getuserid();
        fetch('posts/fetchuserposts?user_id='+sname)
      .then(res => res.json())
      .then(users => this.setState({ users }));
    }
    // }
    // getvotes = (post_id) =>{
    //     axios.get("posts/likes?post_id="+post_id)
    //         .then((res) => {
    //             this.setState({votes: res.data})
    //         })
    // }
    // postagain = (post_id) =>{
    //     axios.post("posts/postagain?post_id="+post_id)
    //         .then((res) => {})
    // }
    render (){
        return(
            <div>
            <div id="notification-div" style={{marginLeft: 0}}>
                    <h2 className="heading">Previous Posts</h2>
                    <div className="clearfix"></div>
                    <ul class="w3-ul w3-border" >
                    {this.state.users.map((user,index) =>
                    <div>
                        <li class="w3-padding-large" data-toggle="modal" data-target={"#"+index+"mymodal"}>
                            {user.post_title}
                            <PreviousPostLikes post_id={user.post_id}/>
                        </li>
                        <div id={index+"mymodal"} class="modal fade" role="dialog">
                            <div class="modal-dialog">
                
                              <div class="modal-content">
                                <div class="modal-header">
                                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                                  <h4 class="modal-title">{user.post_title}</h4>
                                </div>
                                <div class="modal-body">
                                  <p>{user.post_content}</p>
                                </div>
                                <div class="modal-footer">
                                  <PostAgainButton post_id={user.post_id}/>
                                </div>
                              </div>
                
                            </div>
                            </div>
                    </div>
                    )}
                    </ul> 
                </div>
                
            </div>
        )
    }
}
class PreviousPostLikes extends Component{
    constructor(props){
        super(props)
        this.state = {votes:0,post_id:0}
    }
    componentDidMount(){
        var post_id = this.state.post_id;
        axios.get("posts/likes?post_id="+post_id)
               .then((res) => {
                     this.setState({votes: res.data})
        })
    }
    render(){
        this.state.post_id = this.props.post_id;
        return (
            <h6>Votes <span class="badge badge-secondary">{this.state.votes}</span></h6>
        )
    }
}
class PostAgainButton extends Component{
    constructor(props){
        super(props)
        
    }
    componentDidCatch(){

    }
    render(){
        return (
            <button type="button" class="btn btn-default" data-dismiss="modal" >Post Again</button>
        )
    }
}
class EditProfile extends Component{
    constructor(props){
        super(props)
        this.state = {name: "",dob: "",sname: "",country: ""}
        this.onChange = this.onChange.bind(this)
    }
    onSubmit = e =>{
        e.preventDefault();
        var name = this.state.name;
        var dob = this.state.dob;
        var sname = this.state.sname;
        var country = this.state.country;
        var uid = new Home().getuserid()
        axios.post('/users/updateuser?name='+name+'&user_id='+uid+'&dob='+dob+'&sname='+sname+'&country='+country)
            .then((res) =>{
                if(res.data === "done"){
                    alert("profile updated");
                }
        })
    }
    onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
    };
    render(){
        // this.state.name = this.props.name
        // this.state.sname = this.props.sname
        // this.state.country = this.props.country
        // this.state.dob = this.props.dob
        return (
            <div id="editProfile" class="modal fade" role="dialog" style={{marginRight:0}}>
                
            <div id="form-div" style={{marginRight: 0,left:300}}>
            <h2 className="heading">Edit Profile</h2>
              <form className="form" id="form1" onSubmit={this.onSubmit}>
                
                <p className="name">
                <input type="text" class="form-control" name="uname" id="uname" placeholder="Name" required="" autofocus="" onChange={this.onChange} value={ this.props.name } />
                </p>
                
                <p className="name">
                  <input name="dob" 
                  
                  type="date" 
                  
                  placeholder="Give a Title" 
                  id="dob " 
                  onChange={this.onChange}
                  value={this.props.dob} 
                  required
                  />
                </p>
                
                <p className="sname">
                  <input name="sname" 
                  id="sname" 
                  type="text" 
                  
                  placeholder="Give a Title" 
                   
                  onChange={this.onChange}
                  value={this.props.sname} 
                  required
                  />
                </p>
                
                <p className="name">
                  <input name="country" 
                  id="country" 
                  type="text" 
                  
                  placeholder="Give a Title" 
                  
                  onChange={this.onChange}
                  value={this.props.country} 
                  required
                  />
                </p>
                <div className="submit">
                  <input type="submit" value="Update" id="button-blue"/>
                  <div className="ease"></div>
                </div>
              </form>
            </div>
            </div>
        )
    }
}
class Notification extends Component{
    constructor(props){
        super(props)
        this.state = {
            comments: [],
            votes_sname: "",
            votes_values: "",
            isnotify: true,
            comments: []
        }
        this.getVotesText = this.getVotesText.bind(this)
    }
    componentDidMount(){
        var user_id = new Home().getuserid();
        axios.get("notifications/votes?user_id="+user_id)
         .then((res) => {
             this.setState({votes_sname: res.data[0].sname,votes_values: res.data[0].title})
         })
         fetch("notifications/comments?user_id="+user_id)
             .then(res => res.json())
             .then(comments => this.setState({comments}))
        if(this.state.votes_sname == ""){
            this.setState({isnotify: false})
        }else{
            this.setState({isnotify: true})
        }
    }   
    clearnotification = () =>{
        // Requests to clear all Notifications
        var user_id = new Home().getuserid();
        axios.post("notifications/clear?user_id="+user_id)
            .then((res) => {
                if(res.status === 200){
                        window.location.reload();
                }
            })
    }
    getVotesText = (vote_id,user_id) => {
        // fetch("notifications/getvotes?vote_id="+vote_id+"&user_id="+user_id)
        //     .then(res => res.json())
        //     .then(values => this.setState({values}))
    }
    render(){
        return(
            <div id="notify" class="modal fade" role="dialog">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      
                      <h4 class="modal-title">All Notifications</h4>
                    </div>
                    <div class="modal-body">
                      {/* Notifications */}
                      <h4>Today..</h4>
                      <ul class="list-group">
                            {this.state.isnotify == true? <li class="list-group-item">{this.state.votes_sname} voted on your post {this.state.votes_values}</li>: null }
                            
                            {this.state.comments.map(comment =>
                                <li class="list-group-item">{comment.user_comment_name} Commented {comment.comment_content} on your post </li>
                            )}
                      </ul>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal" onClick={this.clearnotification}>Clear All</button>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
}
export default Home;