import React, { Component } from 'react';
import axios from 'axios';
const qs = require('qs');

// import './index.scss';

class AddBook extends Component {

  constructor() {
    super()
    this.state = {
      isbn: '',
      title: '',
      subtitle: '',
      author: '',
      published: '',
      publisher: '',
      pages: 0,
      description: '',
      website: '',
      category: '',
      bookCreated: '',
      // files: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name] : event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const book = this.state
    book['action'] = 'insert';

    const encoded = qs.stringify(book)

    axios.post('/api/', encoded)
    .then(response => {
      this.setState({
        bookCreated: book.title
      })
      alert('Book added')

    })
    .catch(err => {
      console.error(err);
    })
  }

  render() {
    let alert

    if(this.state.bookCreated !== '') {
      alert = <div class="alert alert-success mt-3" role="alert"> "{this.state.bookCreated}" has been deleted!! </div>
    }

    return (
      <div className="container mt-4 mb-4">
      <form onSubmit={ this.handleSubmit }>
        <div className="form-group">
          <label htmlFor="isbn">ISBN</label>
          <input type="text" className="form-control" id="isbn" name="isbn" value={this.state.isbn} onChange={this.handleChange.bind(this)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={this.state.title} onChange={this.handleChange.bind(this)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="subtitle">Subtitle</label>
          <input type="text" className="form-control" id="subtitle" name="subtitle" value={this.state.subtitle} onChange={this.handleChange.bind(this)}/>
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input type="text" className="form-control" id="author" name="author" value={this.state.author} onChange={this.handleChange.bind(this)}/>
        </div>
        <div className="form-group">
          <label htmlFor="published">Published</label>
          <input type="date" className="form-control" id="published" name="published" value={this.state.published} onChange={this.handleChange.bind(this)}/>
        </div>
        <div className="form-group">
          <label htmlFor="publisher">Publisher</label>
          <input type="text" className="form-control" id="publisher" name="publisher" value={this.state.publisher} onChange={this.handleChange.bind(this)}/>
        </div>
        <div className="form-group">
          <label htmlFor="pages">Pages</label>
          <br />
          {this.state.pages}
          <input type="range" className="form-control" id="pages" name="pages" value={this.state.pages} onChange={this.handleChange.bind(this)}/>
        </div>
        <div className="form-group">
          <label htmlFor="pages">Description</label>
           <textarea className="form-control" id="description" name="description" value={this.state.description} rows="3" onChange={this.handleChange.bind(this)}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input type="text" className="form-control" id="website" name="website" value={this.state.website} onChange={this.handleChange.bind(this)}/>
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input type="text" className="form-control" id="category" name="category" value={this.state.category} onChange={this.handleChange.bind(this)}/>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default AddBook
