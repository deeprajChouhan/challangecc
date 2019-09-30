import React, { Component } from 'react';
import './score.css'

class ScoreBoard extends Component{
    constructor(){
        super();
        this.state = {ranks: []}
    }
    componentDidMount() {
        fetch("posts/ranking")
            .then(res => res.json())
            .then(ranks => this.setState({ranks}))
    }
    render() {
        return (
 <div id="wrapper">
  <table id="keywords" cellspacing="0" cellpadding="0">
    <thead>
      <tr>
        <th><span>Secret Name</span></th>
        <th><span>Story Title</span></th>
        <th><span>Votes</span></th>
      </tr>
    </thead>
    <tbody>
    {this.state.ranks.map(rank =>
        <tr>
            <td class="lalign">{rank.post_user}</td>
            <td>{rank.post_title}</td>
            <td>{rank["count(*)"]}</td>
        </tr>
    )}
      
    </tbody>
  </table>
 </div> 
        )
    }
}
export default ScoreBoard;