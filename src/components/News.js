import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  render() {
    return (
      <div>
        <h1>Top Headlines Today</h1>
        <div className="row">
          <div className="col-md-4">
            <NewsItem title="Hello World" newsUrl="Todo" description="Ebola La La La La La" imageUrl="https://static.files.bbci.co.uk/ws/simorgh-assets/public/sport/images/metadata/poster-1024x576.png" />
          </div>
          <div className="col-md-4">
            <NewsItem title="Hello World" description="Ebola La La La La La" />
          </div>
          <div className="col-md-4">
            <NewsItem title="Hello World" description="Ebola La La La La La" />
          </div>
        </div>
      </div>
    );
  }
}

export default News;
