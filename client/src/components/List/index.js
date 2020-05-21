import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './index.scss';
import { FaTrash, FaBook } from 'react-icons/fa';

const qs = require('qs');

class List extends Component {
  constructor() {
    super()
    this.state = {
      books: [],
      bookDeleted: ''
    }
  }

  loadBooks() {
    axios.get('/api/')
    .then(result => {
      this.setState({
        books: result.data
      })
    })
    .catch(err => {
      console.error(err);
    })
  }

  componentDidMount() {
    this.loadBooks();
  }

  deleteBook(book) {
    const opts = qs.stringify({ action: 'delete', isbn: book.isbn })
    axios.post('/api/', opts)
    .then(response => {
      this.loadBooks();
      this.setState({
        bookDeleted: book.title
      })
    })
    .catch(err => {
      console.error(err);
    })
  }

  render() {
    let alert;

    if(this.state.bookDeleted !== '') {
      alert = <div class="alert alert-danger mt-3" role="alert"> "{this.state.bookDeleted}" has been deleted!! </div>
    }

    return(
      <div className="container">
        { alert }
        <div className="display-3 header mb-4"><FaBook /> Books List</div>
        <div className="row">
        {
          this.state.books.map((book, index) => {
            return (
              <div className="col-md-6 book" key={index}>
                <div className="display-4 title">
                  {book.title}
                </div>
                <h1>
                  {book.subtitle}
                </h1>
                <div className="actions">
                  <div className="btn-group  float-right" role="group" aria-label="book actions">
                    <button type="button" className="btn btn-info">
                      <Link to={`/details/${book.isbn}`}>View details</Link>
                    </button>
                    <button type="button" className="btn btn-danger" onClick={(e) => this.deleteBook(book, e)}><FaTrash /></button>
                  </div>
                </div>
              </div>
            )
          })
        }
        </div>
      </div>
    )
  }
}

export default List;
