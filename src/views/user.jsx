import React, { Component } from 'react'

export default class User extends Component {
  componentDidMount() {
    // console.log(this.props);
  }

  render() {
    const { avatarUrl, userName } = this.props;
    return (
      <li>
        <img src={avatarUrl} height="150" width="150"/>
        <div>{userName}</div>
        <a href="javascript:void(0)" className="close1">x</a>
      </li>
    );
  }
}
