import React, { Component } from 'react';
import MonthCalendar from "./month_calendar";

class YearCalendar extends Component{

  constructor(){
    super();
    this.months = [0,1,2,3,4,5,6,7,8,9,10,11];
  }
  /**
   * modal_position_x & y: for setting the position of the modal when popping up (modal position
   * depends on where is the position of the event).
   * 
   * modal_state: used as a className value for toggling the visibility of the modal.
   * 
   * events: temporary representation of the events. 'peek' and 'full' values determines if the event
   * is showing its full range(?) or not
   * 
   * opened_event_state: temporary stores the index of the opened event (will use to target the event
   * when closing the event) 
   */
  state = {
    events: [
      {id: 1, start: "2022-02-04", end: "2022-02-10", event_type: "cohort", calendar_display: "peek"},
      {id: 2, start: "2022-09-26", end: "2022-11-04", event_type: "break", calendar_display: "full"},
      {id: 3, start: "2022-08-14", end: "2022-08-20", event_type: "break", calendar_display: "full"},
      {id: 4, start: "2021-01-22", end: "2021-02-5", event_type: "break", calendar_display: "full"},
    ],
    opened_event_id: null,
	years: [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
	selected_year: new Date().getFullYear()
  }

  /** function to 'spread' the event (show its full range) */
  spreadEvent = ( event_id ) => {
    const { events } = this.state;
	for(let i=0; i<events.length; i++){
		if(events[i].id === event_id) events[i].calendar_display = "full";
	}
    this.setState({events});
  }

  hideEvent = ( index ) => {
	const { events } = this.state;
    events[index].calendar_display = "peek";
    this.setState({events});
  }

  changeYear = (e) => {
	this.setState({selected_year: e.target.value});
  }

  render(){
    const {events, years, selected_year} = this.state;
    return (
      <React.Fragment>
		<select defaultValue={selected_year} onChange={(e) => this.changeYear(e)}>
			{
				
				years.map(year => (
					<option value={year} key={year}>{year}</option>
				))
			}
		</select>
		<div className="year_calendar">
			{
			this.months.map(month => (
				<MonthCalendar year={selected_year} month={month} spreadEvent={this.spreadEvent} hideEvent={this.hideEvent} events={events} key={month}/>
			))
			}
      </div>
	  </React.Fragment>
    );
  }
}

export default YearCalendar;
