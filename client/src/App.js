import React, { Component } from 'react';

import './App.css';

class App extends Component {
  state = {users: []}
  state = {newusers : []}
  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
    fetch('/newusers')
      .then(newusers => this.setState({ newusers }));
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.users.map(any =>
          <div key = {any.id}>{any.username}</div>
        )}
        <h2>{this.state.newusers.map(any =>
          <div key = {any.id}>{any.username}</div>
        )}</h2>
      </div>
    );
  }
}

export default App;
