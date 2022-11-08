import React, { Component } from 'react';
import EventModal from './event_modal';
import './calendar_days.scss';

class CalendarDays extends Component{
    state = {
        open_modal: false
    }

    /** 
    *	DOCU: Adds event details (if there's any) on every date <br>
    *	Triggered by the render method <br>
    *	Last updated at: November 07, 2022
    *	@param {object} calendar_day an object that contains date infos from a Date object
    *	@author Daniel
    */
    addEvents = (calendar_day) => {
        let {month, date, year} = calendar_day;
        const { events } = this.props;
    
        for(let i=0; i<events.length; i++){
            const event_start = new Date(events[i].start);
            const event_end = new Date(events[i].end);

            if(year === event_start.getFullYear() && year === event_end.getFullYear()){
                if(events[i].event_type === "cohort" || events[i].event_type === "stack"){
                    if(event_start.getDate() === date && event_start.getMonth() === month){
                        calendar_day = {...calendar_day, label: "start_only", event: events[i], is_clickable: true};
                    }
                }
                else if(events[i].event_type === "holiday" || events[i].event_type === "break" || events[i].event_type === "training" || events[i].event_type.includes("range")){
                    /** Mark the start and end of an event */
                    if(event_start.getDate() === date && event_start.getMonth() === month){
                        calendar_day = {...calendar_day, label: "start", is_clickable: true, event: events[i]}
                    }else if(event_end.getDate() === date && event_end.getMonth() === month){
                        calendar_day = {...calendar_day, label: "end"}
                    }

                    /** Mark the in between dates */
                    /** If the event spans on one month only */
                    if(event_start.getMonth() === event_end.getMonth()){
                        if(date > event_start.getDate() && date < event_end.getDate() && month === event_start.getMonth()){
                            calendar_day = {...calendar_day, label: "between"}
                        }
                    }
                    /** If the event spans for two months */
                    else{
                        if(date > event_start.getDate() && month === event_start.getMonth()){
                            calendar_day = {...calendar_day, label: "between"}
                        }

                        if(date < event_end.getDate() && month === event_end.getMonth()){
                            calendar_day = {...calendar_day, label: "between"}
                        }
                    }
                    
                    /** If the event spans for more than two months */
                    if(month > event_start.getMonth() && month < event_end.getMonth()){
                        calendar_day = {...calendar_day, label: "between"}
                    }
                }
            }
            
        }

        return calendar_day;
    }

    /** 
    *	DOCU: Triggers the spreadEvent method from YearCalendar component and opens the modal trough setState. <br>
    *	Triggered by an onClick method from the render method <br>
    *	Last updated at: November 07, 2022
    *	@param {number} event_id passed on the spreadEvent method
    *	@author Daniel
    */
    showEvent = (event_id) => {
        this.props.spreadEvent(event_id);
        this.setState({open_modal: true});
    }

    /** 
    *	DOCU: Closes the modal through setState. <br>
    *	Passed on the EventModal Component <br>
    *	Last updated at: November 07, 2022
    *	@param {object} event used to call the stopPropagation method
    *	@author Daniel
    */
    closeModal = (event) => {
        event.stopPropagation();
        this.setState({open_modal: false});
    }

    render(){
        const { whole_date, hideEvent } = this.props;
        let reset_month = new Date(whole_date);
        /** Get the week day of the first day of the month */
        let week_day = reset_month.getDay(); 
        /** Dates will be stored here (will be used to render the dates) */
        let currentDays = []; 
    
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
                year: reset_month.getFullYear()
            }
    
            /** pushing to the array */
            currentDays = [...currentDays, this.addEvents(calendar_day)];
        }
    
        return (
            <div className="table_content">
                {
                    currentDays.map((day, index) => (
                        <div key={index} 
                            className={`calendar_day ${day.current_month ? " current":"not_current"} ${day.label ? day.label:""}`}
                            {...(day.is_clickable && {onClick: () => this.showEvent(day.event.id)})}
                                        >
                        <p>{day.date}</p>
                        {
                            this.state.open_modal && 
                            day.is_clickable && 
                            <EventModal 
                                closeModal={this.closeModal}
                                hideEvent={hideEvent} 
                                event={day.event} 
                            />
                        }
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default CalendarDays;