import React, { Component } from "react";
import PubSub from "pubsub-js";
import axios from "axios";

export default class Search extends Component {
  searchUser = () => {
    //获取ref
    const { userName } = this;
    const keyWord = userName.value;
    //发布订阅
    PubSub.publish("getUpdateUser", { isLoading: true, isFirst: false });
    //发送网络请求
    axios
      .get("https://api.github.com/search/users", {
        params: {
          q: keyWord,
        },
      })
      .then(
        (response) => {
          PubSub.publish("getUpdateUser", {
            users: response.data.items,
            isLoading: false,
          });
          console.log(response.data);
        },
        (error) => {
          PubSub.publish("getUpdateUser", {
            isLoading: false,
            err: error.message,
          });
          console.log(error);
        }
      );
  };
  render() {
    return (
      <div>
        <section className="jumbotron">
          <h3 className="jumbotron-heading">Search Github Users</h3>
          <div>
            <input
              ref={(user) => (this.userName = user)}
              type="text"
              placeholder="enter the name you search"
            />
            &nbsp;<button onClick={this.searchUser}>Search</button>
          </div>
        </section>
      </div>
    );
  }
}
