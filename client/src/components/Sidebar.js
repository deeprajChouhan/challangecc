import React, { Component } from 'react';
import './Sidebar.css'
class Sidebar extends React.Component {
  
  render() {
    return (
        <div className="sidebar">
            <a href="" >Add New Post</a>
            <a href="#news">My Post</a>
            <a href="#contact">Notifications</a>
            <a href="#about">About</a>
        </div>
    );
  }
}

export default Sidebar;