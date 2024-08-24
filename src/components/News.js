import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps={
    pageSize:5,
    catagory:`general`
  }
  static propTypes={
    pageSize:PropTypes.number,
    catagory:PropTypes.string,
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&catagory=${this.props.catagory}apiKey==e41f5d69497545e7976fb48853ae8bc2&page=1&pageSize=${this.props.pageSize}`;
    try {
      this.setState({loading:true})
      let data = await fetch(url);
      let parsedData = await data.json();

      // Update state only after fetching data successfully
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading:false
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      // Handle error appropriately (e.g., show an error message)
    }
  }
  handleNextClick = async () => {
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&catagory=${this.props.catagory}apiKey==e41f5d69497545e7976fb48853ae8bc2&page=${
        this.state.page + 1
      } &pageSize=${this.props.pageSize}`;
      try {
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
          page: this.state.page + 1,
          articles: parsedData.articles,
          loading:false
        });
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }
  };
  handleBackClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&catagory=${this.props.catagory}apiKey==e41f5d69497545e7976fb48853ae8bc2&page=${this.state.page - 1} &pageSize=${this.props.pageSize}`;
    try {
      this.setState({loading:true})
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles,
        loading:false
      });
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };
  render() {
    return (
      <div>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && Array.isArray(this.state.articles) && this.state.articles.map((element) => {
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
        {!this.state.loading && (
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
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        )}
      </div>
    );
  }
  
}

export default News;
