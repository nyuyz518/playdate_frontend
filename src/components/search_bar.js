import React from 'react';
import ReactDOM from 'react-dom';

// const SearchBar = () => {
//   return <input />
// }

class SearchBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {term: ""}
  }

  onInputChange(term){
    this.setState({term});
    this.props.onSearchBarChange(term);
  }


    render(){
      return (
        <div className="search-bar">
          <input
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)} />
        </div>
      );
    }
}

export default SearchBar;
