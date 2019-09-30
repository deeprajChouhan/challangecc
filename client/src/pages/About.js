import React, { Component } from 'react';
import './css/about.css'
class About extends React.Component {
  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }
  render() {
    return (
      <div className="row">
          <video poster="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/polina.jpg" id="bgvid" playsinline autoplay muted loop>
<source src="http://thenewcode.com/assets/videos/polina.webm" type="video/webm"/>
<source src="http://thenewcode.com/assets/videos/polina.mp4" type="video/mp4"/>

</video>
<div id="polina">
<h1>Tell Me</h1>
<p>About Tell Me</p>
<p>Tell me is a blog platform where you can share your review or your thoughs on litrally anything people can have new content daily to read and the winner is decided by voting</p>
<a href="home"><button>Go back</button></a>
</div>
      </div>
      
    );
  }
}

export default About;