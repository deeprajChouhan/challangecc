import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
class Register extends Component{
    constructor(){
        super();
        this.state = {
           name : "",
           username: "",
           password: "",
           cpassword: "",
           date: "",
           country: "",
           sname:"",
           matchpasserr: "",
           login: ""
        }
        this.onSubmit= this.onSubmit.bind(this);
    }
    onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = (e) =>{
      e.preventDefault();
      if(this.state.password != this.state.cpassword){
        this.setState({matchpasserr: "Password dosent match"});
      }else{
        this.setState({matchpasserr: ""});
        var params = new URLSearchParams()
        params.append('name', this.state.name);
        params.append('username' , this.state.username);
        params.append('password' , this.state.password);
        params.append('dob' , this.state.date);
        params.append('country' , this.state.country);
        const newuser = this.state;
        axios.post('/users/register?username='+this.state.username+"&pass="+this.state.password+"&name="+this.state.name+"&dob="+this.state.date+"&country="+this.state.country+"&sname="+this.state.sname)
          .then((res) => {
              console.log(res);
              if(res.data === "created"){
                window.location.assign("/login");
              }
          });
          this.setState({ login: "Login Now"})
      }
    }
    render () {
      const errstyle = {
        color: "red"
      }
        return (
            <div class="wrapper">
            
            <form class="form-signin" noValidate onSubmit={this.onSubmit}>     
              <p><a href="/login">{this.state.login}</a><i className="fa fa-arrow-right"></i></p>
              <h2 class="form-signin-heading">Please Register</h2>
              <input type="text" class="form-control" name="name" id="name" placeholder="Name" required="" autofocus="" onChange={this.onChange} value={ this.state.name } />
              <input type="text" class="form-control" name="username" id="username" placeholder="Email Address" required="" autofocus="" onChange={this.onChange} value={ this.state.username } />
              <input type="password" class="form-control" name="password" id="password" placeholder="Password" required="" onChange={this.onChange} value = {this.state.password}/>      
              <input type="password" class="form-control" name="cpassword" id="cpassword" placeholder="Confirm Password" required="" onChange={this.onChange} value = {this.state.cpassword}/>      
              <p style={ errstyle }>{ this.state.matchpasserr }</p>
              <input type="date" class="form-control" name="date" id="date" placeholder="Date of Birth" required="" onChange={this.onChange} value = {this.state.date}/>      
              <input type="text" class="form-control" name="sname" id="sname" placeholder="Provide a secret Name" required="" onChange={this.onChange} value = {this.state.sname}/>      
              <div class="form-group">
                <select class="form-control" name="country" id="country"  onChange={this.onChange} value = {this.state.country}>
                  <option value="-1">Select Country</option>
                  <option value="India">India</option>
                  <option value="Pakistan">Pakistan</option>
                </select>
              </div>
              <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>   
              
            </form>
            </div>
        );
    }
}

export default Register;