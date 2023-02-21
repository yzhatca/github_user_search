import React, { Component } from "react";
import PubSub from "pubsub-js";

import "./index.css";

export default class List extends Component {
  // 初始状态设置
  state = {
    users: [],
    isLoading: false,
    isFirst: true,
    err: "",
  };

  componentDidMount() {
    this.token = PubSub.subscribe("getUpdateUser", (msg, stateObj) => {
      this.setState(stateObj);
    });
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.token);
  }

  render() {
    const { users, isFirst, isLoading, err } = this.state;
    return (
      <div>
        <div className="row">
          {/*获取App传过来的用户列表并遍历*/}
          {
            //三元表达式
            isFirst ? (
              <h2>Welcome to use</h2>
            ) : isLoading ? (
              <h2>Loading...</h2>
            ) : err ? (
              <h2 style={{ color: "red" }}>{err}</h2>
            ) : (
              users.map((userObj) => {
                return (
                  <div key={userObj.id} className="card">
                    <a rel="noreferrer" href={userObj.html_url} target="_blank">
                      <img
                        alt="head_portrait"
                        src={userObj.avatar_url}
                        style={{ width: "100px" }}
                      />
                    </a>
                    {/*展示用户对象的登录名*/}
                    <p className="card-text">{userObj.login}</p>
                  </div>
                );
              })
            )
          }
        </div>
      </div>
    );
  }
}
