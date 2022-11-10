import React, { Component } from 'react';
import MonthCalendar from "./month_calendar";
import './year_calendar.scss';

class YearCalendar extends Component{
  constructor(){
    super();
    /** Used to loop months */
    this.months = [0,1,2,3,4,5,6,7,8,9,10,11];
  }
  
  state = {
	years: [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    selected_year: new Date().getFullYear(),
    course_calendar_events: [
		{id: 1, start: "2022-02-04", end: "2022-04-13", event_type: "cohort"},
		{id: 12, start: "2022-02-04", end: "2022-02-18", event_type: "stack"},
		{id: 2, start: "2022-09-26", end: "2022-11-04", event_type: "break"},
		{id: 3, start: "2022-08-09", end: "2022-08-20", event_type: "training"},
		{id: 9, start: "2022-08-16", end: "2022-08-31", event_type: "cohort"},
		{id: 4, start: "2021-01-22", end: "2021-02-5", event_type: "break"},
		{id: 5, start: "2022-01-01", end: "2022-01-01", event_type: "holiday"},
		{id: 7, start: "2022-06-19", end: "2022-06-30", event_type: "cohort"},
		{id: 8, start: "2022-06-19", end: "2022-06-25", event_type: "stack"},
		{id: 6, start: "2022-05-15", end: "2022-06-30", event_type: "stack"},
		{id: 10, start: "2022-10-10", end: "2022-10-28", event_type: "stack"},
		{id: 11, start: "2022-04-14", end: "2022-04-14", event_type: "holiday"},
    ],
  }

  /** 
   *	DOCU: Spans out a 'shrinked' event when clicked <br>
   *	Passed as prop to the calendar_days component <br>
   *	Last updated at: November 10, 2022
   *	@param {array} calendar_events Required. These are the opened events
   *	@author Daniel
  */
  expandCalendarEvent = ( calendar_events ) => {
    let { course_calendar_events } = this.state;

	for(let i=0; i<calendar_events.length; i++){
		course_calendar_events = course_calendar_events.map(event => {
			if(calendar_events[i].id === event.id){
				event = {...event, show_mode: "full-range"}
			}
			return event;
		})
	}

    this.setState({course_calendar_events});
  }

  /** 
   *	DOCU: 'Shrinks' a spanned event when its modal is closed <br>
   *	Passed as prop to the calendar_days component <br>
   *	Last updated at: November 10, 2022
   *	@param {array} calendar_events Required. These are the opened events
   *	@author Daniel
  */
  shrinkCalendarEvent = ( calendar_events ) => {
	let { course_calendar_events } = this.state;

	for(let i=0; i<calendar_events.length; i++){
		course_calendar_events = course_calendar_events.map(event => {
			if(calendar_events[i].id === event.id && event.show_mode){
				event = {...event, show_mode: ""}
			}
			return event;
		})
	}
	

    this.setState({course_calendar_events});
  }

  render(){
    const {course_calendar_events, years, selected_year} = this.state;
    return (
      <React.Fragment>
		<select defaultValue={selected_year} onChange={(e) => this.setState({selected_year: e.target.value})}>
			{
				years.map(year => (
					<option value={year} key={year}>{year}</option>
				))
			}
		</select>
		<div id="year_calendar_container">
			{
				this.months.map(month => (
					<MonthCalendar 
						year={selected_year} 
						month={month} 
						expandCalendarEvent={this.expandCalendarEvent} 
						shrinkCalendarEvent={this.shrinkCalendarEvent} 
						course_calendar_events={course_calendar_events} key={month}
					/>
				))
			}
      </div>
	  </React.Fragment>
    );
  }
}

export default YearCalendar;
