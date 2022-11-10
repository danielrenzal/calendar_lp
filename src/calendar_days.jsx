import React, { Component } from 'react';
import EventTooltip from './event_tooltip';
import './calendar_days.scss';

class CalendarDays extends Component{
    state = {
        tooltip_date: null
    }

    /** 
    *	DOCU: Adds all the events within a given date <br>
    *	Triggered by the render method <br>
    *	Last updated at: November 09, 2022
    *	@param {object} calendar_day required. Contains date infos from a Date object. Represents a single date.
    *	@author Daniel
    */
    addEventsToDate = (calendar_day) => {
        let {month, date, year, full_date} = calendar_day;
        const { course_calendar_events: events } = this.props;
    
        for(let i=0; i<events.length; i++){
            const event_start = new Date(events[i].start);
            const event_end = new Date(events[i].end);

            /** Identify if the year of event is the same as the year that the user is viewing */
            if(year === event_start.getFullYear() && year === event_end.getFullYear()){
                /** events[i].show_mode is a property added to cohort and stack events to identify if they will be
                 *  showed on the calendar in their full range or not.
                 */
                if((events[i].event_type === "cohort" && !events[i].show_mode) || (events[i].event_type === "stack" && !events[i].show_mode)){
                    if(event_start.toDateString() === full_date.toDateString() && event_end.toDateString() === full_date.toDateString()){
                        calendar_day = {
                            ...calendar_day, 
                            label: "one_day", 
                            is_clickable: true, 
                            events: [...calendar_day.events, events[i]]
                        }
                    }
                    else if(event_start.getDate() === date && event_start.getMonth() === month){
                        calendar_day = {
                            ...calendar_day, 
                            label: "start_only",
                            is_clickable: true,
                            events: [...calendar_day.events, events[i]],
                        };
                    }
                }
                else if(events[i].event_type === "holiday" || events[i].event_type === "break" || events[i].event_type === "training" || events[i].show_mode){
                    /** Mark the start and end of an event */
                    if(event_start.toDateString() === full_date.toDateString() && event_end.toDateString() === full_date.toDateString()){
                        calendar_day = {
                            ...calendar_day,
                            label: "one_day", 
                            is_clickable: true, 
                            events: [...calendar_day.events, events[i]]
                        }
                    }
                    else if(event_start.getDate() === date && event_start.getMonth() === month){
                        calendar_day = {
                            ...calendar_day, 
                            label: "start", 
                            is_clickable: true, 
                            events: [...calendar_day.events, events[i]]
                        }
                    }
                    else if(event_end.getDate() === date && event_end.getMonth() === month){
                        calendar_day = {
                            ...calendar_day, 
                            label: "end", 
                            events: [...calendar_day.events, events[i]]
                        }
                    }

                    /** Mark the in-between dates */
                    /** If the event spans on one month only */
                    if(event_start.getMonth() === event_end.getMonth()){
                        if(date > event_start.getDate() && date < event_end.getDate() && month === event_start.getMonth()){
                            calendar_day = {
                                ...calendar_day,
                                label: ((calendar_day.label !== "between" && calendar_day.label && calendar_day.label !== "end") ? calendar_day.label:"between"),
                                events: [...calendar_day.events, events[i]]
                            }
                        }
                    }
                    /** If the event spans for two months */
                    else{
                        if(date > event_start.getDate() && month === event_start.getMonth()){
                            calendar_day = {
                                ...calendar_day,
                                label: ((calendar_day.label !== "between" && calendar_day.label && calendar_day.label !== "end") ? calendar_day.label:"between"),
                                events: [...calendar_day.events, events[i]]
                            }
                        }

                        if(date < event_end.getDate() && month === event_end.getMonth()){
                            calendar_day = {
                                ...calendar_day,
                                label: ((calendar_day.label !== "between" && calendar_day.label && calendar_day.label !== "end") ? calendar_day.label:"between"),
                                events: [...calendar_day.events, events[i]]
                            }
                        }
                    }
                    
                    /** If the event spans for more than two months */
                    if(month > event_start.getMonth() && month < event_end.getMonth()){
                        calendar_day = {
                            ...calendar_day, 
                            label: ((calendar_day.label !== "between" && calendar_day.label && calendar_day.label !== "end") ? calendar_day.label:"between"),
                            events: [...calendar_day.events, events[i]]
                        }
                    }
                }      
            } 
        }
        return calendar_day;
    }

    /** 
    *	DOCU: Triggers the expandCalendarEvent method from YearCalendar component and opens the modal through setState. <br>
    *	Triggered by an onClick method from the render method <br>
    *	Last updated at: November 10, 2022
    *	@param {array} calendar_events required on the expandCalendarEvent method
    *	@param {number} date required to store on state, to target what tooltip to show
    *	@author Daniel
    */
    showEventsOfADate = (calendar_events, date) => {
        this.props.expandCalendarEvent(calendar_events);
        this.setState({tooltip_date: date});
    }

    /** 
    *	DOCU: Closes the event tooltip through setState. <br>
    *	Passed on the EventModal Component <br>
    *	Last updated at: November 09, 2022
    *	@param {object} event required to call the stopPropagation method
    *	@author Daniel
    */
    closeDateTooltip = (event) => {
        event.stopPropagation();
        this.setState({tooltip_date: null});
    }

    render(){
        const { whole_date, shrinkCalendarEvent } = this.props;
        let reset_month = new Date(whole_date);
        /** Get the week day of the first day of the month */
        let week_day = reset_month.getDay(); 
        /** Dates will be stored here (will be used to render the dates) */
        let current_days = []; 
    
        /** Loop to 42 calendar blocks (dates) */
        for (let block=0; block<42; block++){
            if(block === 0 && week_day === 0){
                /** First block date value if day 1 is on sunday */
                reset_month.setDate(1);
            }
            else if(block === 0){
                /** If not, set the date value of the block from the past month */
                reset_month.setDate(reset_month.getDate() - week_day); 
            }
            else{
                /** Succeeding block */
                reset_month.setDate(reset_month.getDate() + 1);
            }
    
            let calendar_day = {
                current_month: (reset_month.getMonth() === whole_date.getMonth()),
                date: reset_month.getDate(),
                month: reset_month.getMonth(),
                year: reset_month.getFullYear(),
                full_date: reset_month,
                events: []
            }
            
            /** pushing to the array */
            current_days = [...current_days, this.addEventsToDate(calendar_day)];
        }
    
        return (
            <div className="table_content">
                {
                    current_days.map((day, index) => {
                        if(day.current_month){
                            return (
                                <div key={index} 
                                    className={`calendar_day ${day.events.length ? day.events[day.events.length-1].event_type: ""} ${day.label ? day.label:""}`}
                                    {...(day.is_clickable && {onClick: () => this.showEventsOfADate((day.events), day.date)})}>
                                    {day.date}
                                    {
                                        this.state.tooltip_date === day.date && 
                                        day.is_clickable &&
                                        <EventTooltip 
                                            date={day.date}
                                            month={day.month}
                                            year={day.year}
                                            closeDateTooltip={this.closeDateTooltip}
                                            shrinkCalendarEvent={shrinkCalendarEvent} 
                                            events={day.events} 
                                        />
                                    }
                                </div>
                            )
                        }else{
                            return (
                                <div key={index} className="calendar_day"></div>
                            )
                        }
                    })
                }
            </div>
        )
    }
}

export default CalendarDays;