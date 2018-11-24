import React, { Component } from 'react'

const SearchBar = props => {

  return(
    <div>
    <form style={{margin:30}}>
    <input
    type="text"
    className = "input"
    style={{height: 29, width: 300}}
    placeholder=" Search a playdate"
    />
    <button
    onClick={props.handleClick}
    value={props.searchForm} > 🔍 </button>
    </form>
    </div>
  )
}

export default SearchBar
// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import {search} from '../actions/search.js';
//
// class SearchBar extends Component {
//   render() {
//     const {search, value} = this.props;
//
//     return (
//         <input
//           className="form-control"
//           placeholder = "Search a playdate"
//           onChange={(e) => search(e.target.value)}
//           value={value} />
//     );
//   }
// }
//
// function mapStateToProps({description}) {
//   return {value: description.value};
// }
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({search}, dispatch);
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
