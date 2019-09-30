import React, { Component } from 'react';
import axios from 'axios';
import './css/newlogin.css'
import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import { createStore } from 'redux';
import { sessionService } from 'redux-react-session';
class NewLogin extends Component{
    constructor() {
        super();
        this.state = {
          gmail: "",
          password: "",
          alert: "",
          errors: {},
           name : "",
           username: "",
           pass: "",
           cpass: "",
           date: "",
           country: "",
           sname:"",
           matchpasserr: "",
           login: "",
          isLoggedIn: false,
          isLoggedout: true
        };
        this.onSubmit= this.onSubmit.bind(this);
      }
      onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };
      onSubmit = e => {
        e.preventDefault();
        const newUser = {
            gmail: this.state.gmail,
            password: this.state.password,
          };
          const reducers = {
            session: sessionReducer
          };
          const reducer = combineReducers(reducers);
          const store = createStore(reducer)
          sessionService.initSessionService(store);
          axios.post('/users/login?uname='+this.state.gmail+'&upass='+this.state.password)
            .then((res) => {
                if(res.status === 200){
                    var user_id = res.data[0].user_id
                    document.cookie = "user_id="+user_id
                    console.log(user_id)
                    console.log(document.cookie)
                    if(res.data != "error") window.location.assign("/home");
                    
                }
                if(res.data === "error"){
                    this.setState({alert : "Invalid username or password"})     
                }
            })
        };
        register = () => {
          this.state.name = document.getElementById("uname").value
          this.state.sname = document.getElementById("sname").value
          this.state.date = document.getElementById("dob").value
          this.state.country = document.getElementById("country").value
          this.state.pass = document.getElementById("pass").value
          this.state.cpass = document.getElementById("cpass").value
          this.state.username = document.getElementById("uemail").value
          console.log(this.state)
          if(this.state.pass != this.state.cpass){
            this.setState({matchpasserr: "Password dosent match"});
          }else{
            axios.post('/users/register?username='+this.state.username+"&pass="+this.state.pass+"&name="+this.state.name+"&dob="+this.state.date+"&country="+this.state.country+"&sname="+this.state.sname)
              .then((res) => {
                  console.log(res);
                  if(res.data === "created"){
                    window.location.assign("/login");
                  }
              });
          }
        }
    render (){
        const { errors } = this.state;
        const errorStyle = {
            color: "red"
        }
        return (
            <div>
            <div className="pen-title">
            <h1></h1>
  <h1>Tell Me</h1><span><a href='#'>Login</a></span>
</div>
<div className="container">
  <div className="card"></div>
  <div className="card">
    <h1 className="title">Login</h1>
    <form  noValidate onSubmit={this.onSubmit}>
      <div className="input-container">
        <input type="email" name="gmail" id="gmail" required="" autofocus="" onChange={this.onChange} value={ this.state.gmail } error = {errors.gmail} style={{backgroundImage: ""}}/>
        <label for="#{label}">Username</label>
        <div className="bar"></div>
      </div>
      <div className="input-container">
        <input type="password" name="password" id="password" required="" onChange={this.onChange} value = {this.state.password} error = {errors.password}/>
        <label for="#{label}">Password</label>
        <div className="bar"></div>
      </div>
      <div className="button-container">
        <button><span>Go</span></button>
      </div>
      <div className="footer"><a href="#">Forgot your password?</a></div>
      <h4><p style = {errorStyle}>{this.state.alert}</p></h4>
    </form>
  </div>
  <div className="card alt">
    <div className="toggle"></div>
    <h1 className="title">Register
      <div className="close"></div>
    </h1>
    <form>
    <div className="input-container">
        <input type="#{type}" id="uname" required="required"/>
        <label for="#{label}">Name</label>
        <div className="bar"></div>
      </div>
      <div className="input-container">
        <input type="#{type}" id="sname" required="required"/>
        <label for="#{label}">Username</label>
        <div className="bar"></div>
      </div>
      
      <div className="input-container">
        <input type="email" id="uemail" required="required"/>
        <label for="#{label}">Email / Username</label>
        <div className="bar"></div>
      </div>
      <div className="input-container">
        <input type="#{type}" id="pass" required="required"/>
        <label for="#{label}">Password</label>
        <div className="bar"></div>
      </div>
      <div className="input-container">
        <input type="#{type}" id="cpass" required="required"/>
        <label for="#{label}">Repeat Password</label>
        <div className="bar"></div>
      </div>
    <div className="input-container">
        <input type="date" id="dob" required="required"/>
        <label for="#{label}">DOB</label>
        <div className="bar"></div>
      </div>
      
    <div className="input-container">
        <input type="text" id="country" required="required"/>
        <label for="#{label}">Country</label>
        <div className="bar"></div>
      </div>
      
      <div className="button-container">
        <button onClick={this.register} type="button"><span>Next</span></button>
        {this.state.matchpasserr}
      </div>
    </form>
  </div>
</div>
</div>
        )
    }
}
export default NewLogin;