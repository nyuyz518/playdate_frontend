import React, { Component } from 'react'

const SearchBar = props => {

  return(
        <div>
          <form style={{margin:20}}>
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
// class SearchBar extends Component {
//
//   render(){
//
//     return (
//       <center>
//         <form style={{margin:20}}>
//           <input
//             type="text"
//             className = "input"
//             style={{height: 30, width: 300}}
//             placeholder=" Search a playdate"
//             />
//           <button onClick={this.handleClick}> 🔍 </button>
//         </form>
//       </center>
//     )
//   }
// }

export default SearchBar
