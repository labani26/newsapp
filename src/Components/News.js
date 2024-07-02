import React, { Component } from 'react'
import NewsItems from './NewsItems';
import Spinner from './spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {


    static defaultProps = {
        country: "in",
        pageSize: 6,
        category: "general"


    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsTime`;
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=e6d966da587c4e34841998fc491b249e&page=${this.state.page}
        &pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,

        })

    }

    async componentDidMount() {
        this.updateNews();
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=e6d966da587c4e34841998fc491b249e&page=${this.state.page}
        &pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            
        })
        setTimeout(() => {
            this.setState({
                articles: this.state.articles.concat(parsedData.articles),
                totalResults: parsedData.totalResults,
                loading: false
            });
          }, 100);
        };
    




    render() {
        return (
            <>


                <h1 className='text-center my-3'>NewsTimes - Headlines on {this.capitalizeFirstLetter(this.props.category)} </h1>

                 {this.state.loading && <Spinner />} 

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                   loader={<Spinner />}
                >
                   <div className='container'>
                     <div className='row'>

                        {this.state.articles.map((element) => {
                            return (
                                <div className='col-md-4' key={element.url}>
                                    <NewsItems title={element.title} description={element.description} imageUrl={element.urlToImage} url={element.url}
                                        author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>

                            )
                        })}
                    </div>
                    </div>

                </InfiniteScroll>

                

                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; previous </button>
                    <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

                </div> */}

            </>
        )
    }
};




export default News;
