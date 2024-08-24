import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=e41f5d69497545e7976fb48853ae8bc2&page=1";
    try {
      let data = await fetch(url);
      let parsedData = await data.json();

      // Update state only after fetching data successfully
      this.setState({ articles: parsedData.articles });
    } catch (error) {
      console.error("Error fetching news:", error);
      // Handle error appropriately (e.g., show an error message)
    }
  }
  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=e41f5d69497545e7976fb48853ae8bc2&page=${this.state.page + 1}`;
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
      });
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };
  handleBackClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=e41f5d69497545e7976fb48853ae8bc2&page=${this.state.page - 1}`;
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles,
      });
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };
  render() {
    return (
      <div>
        <h1>Top Headlines Today</h1>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  newsUrl={element.url}
                  description={element.description}
                  imageUrl={element.urlToImage}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handleBackClick}
          >
            &larr; Back
          </button>
          <button
          disabled={this.state.articles.length<1}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
