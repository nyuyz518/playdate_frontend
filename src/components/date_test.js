import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class DateTest extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     startDate: new Date()
   };
   this.handleChange = this.handleChange.bind(this);
 }

 handleChange(date) {
   this.setState({
     startDate: date
   });
 }

 render() {
   return (
     <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={60}
        dateFormat="MM/d, yyyy h:mm aa"
        timeCaption="time"
     />
   );
 }
}
