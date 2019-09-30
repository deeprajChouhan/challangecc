import React, { Component } from 'react';
import MetisMenu from 'react-metismenu';
import './Navbar.css';
import ScoreBoard from './scoreboard'
class Navbar extends Component{
    state = {
        log : 1,
        feed: "Feed",
        logout: ""
    }
    render(){
        return (
            <div>
            <ul className="main-nav">
              <li className="brand list-nav">Tell Me ..</li>
              <li className="list-nav"><a >{this.props.logout}</a></li>
              <li className="list-nav"><a href="home"><i class="fa fa-user"></i>  {this.props.user}</a></li>
              <li className="list-nav"><a href="feed"><i class="fa fa-newspaper-o"></i>  Feed</a></li>
              <li className="list-nav"><a data-toggle="modal" data-target="#score"><i class="fa fa-star-o"></i>  ScoreBoard</a></li>
            </ul>
            <div id="score" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Top Tellers</h4>
      </div>
      <div class="modal-body">
        <ScoreBoard />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
            </div>
        )
    }
}
export default Navbar;