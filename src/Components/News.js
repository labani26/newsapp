import React, { Component } from 'react'
import NewsItems from './NewsItems';
import Spinner from './spinner';
import PropTypes from 'prop-types';



export class News extends Component {


     static defaultProps = {
         country: "in",
         pageSize: 6,
         category: "general"


     }

     static PropTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
     }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }


    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=e6d966da587c4e34841998fc491b249e&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, 
            totalResults: parsedData.totalResults ,
            loading: false})

    }

    handlePrevClick = async () => {
        console.log("previous");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=e6d966da587c4e34841998fc491b249e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }

    handleNextClick = async () => {
        console.log("next");
        (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)))    //Math.ceil -> defines the largest integer, Ex: 4.5 => 5.
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=e6d966da587c4e34841998fc491b249e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true});
            let data = await fetch(url);
            let parsedData = await data.json()
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }
    



    render() {
        return (
            <div className='container my-2'>


                <h1 className='text-center my-3'>NewsTimes - Headlines</h1>

                {this.state.loading && <Spinner/>}

                <div className='row'>

                    {!this.state.loading && this.state.articles.map((element) => {
                        return (
                            <div className='col-md-4' key={element.url}>
                                <NewsItems title={element.title} description={element.description} imageUrl={element.urlToImage} url={element.url} 
                                author={element.author} date={element.publishedAt}/>

                            </div>

                        )
                    })}
                </div>

                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; previous </button>
                    <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

                </div>

            </div>
        )
    }
}


export default News;
