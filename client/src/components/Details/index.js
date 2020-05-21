import React, { Component } from 'react';
import axios from 'axios';

import './index.scss';

class Details extends Component {

  constructor(props) {
    super()
    this.state = {
      book: {}
    }
  }

  componentDidMount() {
    const { match: {params} } = this.props
    const isbn = params.isbn

    console.log(isbn);
    axios.get(`/api/?isbn=${isbn}`)
    .then(result => {
      this.setState({
        book: result.data[0]
      })
    })
    .catch(err => {
      console.error(err);
    })
  }

  render() {
    return(
      <div className="container mt-3">
        <div className="book-header">
          <div className="display-3">
            {this.state.book.title}
          </div>
          <h1>
            {this.state.book.subtitle}
          </h1>
        </div>

        <div className="main-info">

          <div className="info">
            <small>
              Author
            </small>
            {this.state.book.author}
          </div>

          <div className="info">
            <small>
              number of images
            </small>
            {this.state.book.number_of_images}
          </div>
          <div className="info">
            <small>
              published
            </small>
            {this.state.book.published}
          </div>

          <div className="info">
            <small>
              publisher
            </small>
            {this.state.book.publisher}
          </div>

          <div className="info">
            <small>
              pages
            </small>
            {this.state.book.pages}
          </div>

          <div className="info">
            <small>
              description
            </small>
            {this.state.book.description}
          </div>

          <div className="info">
            <small>
              website
            </small>
            <a href={this.state.book.website} target="_blank">{this.state.book.website}</a>
          </div>

          <div className="info">
            <small>
              category
            </small>
            <span className={`category ${this.state.book.category}`}> {this.state.book.category} </span>
          </div>
        </div>
      </div>
    )

  }

}

export default Details;
