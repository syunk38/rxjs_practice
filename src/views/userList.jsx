import React, { Component } from 'react'
import User from './user.jsx'

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {suggestions: props.suggestions}
  }

  componentDidMount() {
    // console.log(this.props);
  }

  render() {
    const userNodes = this.state.suggestions.map((suggestion) => {
      return (
        <User key={suggestion.id} avatarUrl={suggestion.avatar_url} userName={suggestion.login} />
      );
    });
    return (
      <ul>
        {userNodes}
      </ul>
    );
  }
}
