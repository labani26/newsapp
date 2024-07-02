import React, { Component } from 'react'

export class NewsItems extends Component {


    render() {
        let { title, description, imageUrl, url, author, date, source } = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: "90%", zIndex:"1"}}>
                        {source}
                    </span>
                    <img src={!imageUrl ? "https://bsmedia.business-standard.com/_media/bs/img/article/2024-03/07/thumb/featurecrop/400X400/1709830413-6065.jpg" : imageUrl}
                        className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title} </h5>
                        <p className="card-text">{description}</p>
                        <p className='card-text'><small className='text-muted'>By {!author ? "Unknown" : author} on {date}</small></p>
                        <a href={url} target='blank' className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItems;
