import React, { Component } from 'react';
import MonthCalendar from "./month_calendar";

class YearCalendar extends Component{

  constructor(){
    super();
    /** Used to loop months */
    this.months = [0,1,2,3,4,5,6,7,8,9,10,11];
  }
  
  state = {
    years: [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    selected_year: new Date().getFullYear(),
    events: [
      {id: 1, start: "2022-02-04", end: "2022-02-10", event_type: "cohort", calendar_display: "peek"},
      {id: 2, start: "2022-09-26", end: "2022-11-04", event_type: "break", calendar_display: "full"},
      {id: 3, start: "2022-08-14", end: "2022-08-20", event_type: "break", calendar_display: "full"},
      {id: 4, start: "2021-01-22", end: "2021-02-5", event_type: "break", calendar_display: "full"},
    ],
  }

  /** 
   *	DOCU: Spans out a 'hidden' event when clicked <br>
   *	Passed as prop to the calendar_days component <br>
   *	Last updated at: November 07, 2022
   *	@param {number} event_id of the clicked event
   *	@author Daniel
  */
  spreadEvent = ( event_id ) => {
    const { events } = this.state;
	for(let i=0; i<events.length; i++){
		if(events[i].id === event_id) events[i].calendar_display = "full";
	}
    this.setState({events});
  }

  /** 
   *	DOCU: 'Hides' a spanned out event when its modal is closed <br>
   *	Passed as prop to the calendar_days component <br>
   *	Last updated at: November 07, 2022
   *	@param {number} event_id of the clicked event
   *	@author Daniel
  */
  hideEvent = ( event_id ) => {
	const { events } = this.state;
	for(let i=0; i<events.length; i++){
		if(events[i].id === event_id && events[i].event_type === "cohort"){
			events[i].calendar_display = "peek";	
		}
	}
    this.setState({events});
  }

  render(){
    const {events, years, selected_year} = this.state;
    return (
      <React.Fragment>
		<select defaultValue={selected_year} onChange={(e) => this.setState({selected_year: e.target.value})}>
			{
				years.map(year => (
					<option value={year} key={year}>{year}</option>
				))
			}
		</select>
		<div className="year_calendar">
			{
				this.months.map(month => (
					<MonthCalendar 
						year={selected_year} 
						month={month} 
						spreadEvent={this.spreadEvent} 
						hideEvent={this.hideEvent} 
						events={events} key={month}
					/>
				))
			}
      </div>
	  </React.Fragment>
    );
  }
}

export default YearCalendar;
