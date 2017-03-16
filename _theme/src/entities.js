import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import lunr from 'lunr';


class StoreForm extends Component {
  constructor(props) {
    super(props);

    this.masterStore = window.store;

    const idx = lunr(function() {
      this.ref('id');
      this.field('description');
      this.field('title', { boost: 10 });
    });

    this.masterStore.map(entity => {
      console.log(entity.title);
      idx.add({
        id: entity.id,
        description: entity.description,
        title: entity.title,
      });
    });

    this.state = {
      store: window.store,
      searchQuery: '',
      filterValue: '',
      sortByValue: '',
      idx,
    }



    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ searchQuery: event.target.value });

    const results = this.state.idx.search(this.state.searchQuery).map((key) => key.ref);
    
    //if (results.length) {
      const store = this.masterStore.filter(entity => {
        return (results.indexOf(entity.id.toString()) > -1);
      });
      this.setState({store});
    //}
  }

  render() {
    return (
      <div>
        <form className="row" style={{marginBottom: '2rem'}}>
          <div className="col-md-4">
            <div className="input-group">
              <input className="form-control" type="text" value={this.state.searchQuery} onChange={this.handleChange}/>
              <button className="input-group-addon">
                <span style={{
                  fontSize: '1.2rem',
                  position: 'relative',
                  top: '-1px',
                  transform: 'rotate(320deg)'
                }}>&#9906;</span>
              </button>
            </div>
          </div>
        </form>
        <div className="card-columns" style={{columnGap: '30px'}}>
          {this.state.store.map(entity => 
            <div className="card" key={entity.id} style={{marginBottom: '30px'}}>
              <div className="card-block">
                <h3 className="card-title">{entity.title}</h3>
                  <h6 className="card-subtitle mb-3 text-muted">{entity.date}</h6>
                  <p className="card-text">{entity.excerpt}</p>
                  <a href={entity.url} className="btn btn-primary">Read</a>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <StoreForm/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
