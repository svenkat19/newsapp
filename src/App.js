import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <h1 className='text-center'>Top Headlines Today</h1>
        <div className="news-container">
          <News pageSize={5} catagory='technology' />
        </div>
      </div>
    );
  }
}
