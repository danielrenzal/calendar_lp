import React, { Component } from 'react';
import EventModal from './event_modal';

class CalendarDays extends Component{
    state = {
        open_modal: false
    }

    addEvents = (calendar_day) => {
        let {month, date, year} = calendar_day;
        const { events } = this.props;
    
        /** loop to add some extra properties para magamit sa pagdisplay sa calendar kung
         * sakaling may event sa  date na ito
         */
        for(let i=0; i<events.length; i++){
            const event_start = new Date(events[i].start);
            const event_end = new Date(events[i].end);

            if(year === event_start.getFullYear() && year === event_end.getFullYear()){
                switch(events[i].calendar_display){
                    case "peek":
                        if(event_start.getDate() === date && event_start.getMonth() === month){
                            calendar_day = {...calendar_day, label: "start_only", event: events[i], is_clickable: true};
                        }
                        break;
                    case "full":
                        /** Mark the start and end of an event */
                        if(event_start.getDate() === date && event_start.getMonth() === month){
                            calendar_day = {...calendar_day, label: "start", is_clickable: true, event: events[i]}
                        }else if(event_end.getDate() === date && event_end.getMonth() === month){
                            calendar_day = {...calendar_day, label: "end"}
                        }
    
                        /** Mark the in between dates */
                        if(event_start.getMonth() === event_end.getMonth()){
                            if(date > event_start.getDate() && date < event_end.getDate() && month === event_start.getMonth()){
                                calendar_day = {...calendar_day, label: "between"}
                            }
                        }else{
                            if(date > event_start.getDate() && month === event_start.getMonth()){
                                calendar_day = {...calendar_day, label: "between"}
                            }
    
                            if(date < event_end.getDate() && month === event_end.getMonth()){
                                calendar_day = {...calendar_day, label: "between"}
                            }
                        }
    
                        if(month > event_start.getMonth() && month < event_end.getMonth()){
                            calendar_day = {...calendar_day, label: "between"}
                        }
                        
    
                        break;
                    default:
                        /** nothing */
                }
            }
            
        }

        return calendar_day;
    }

    showEvent = (event_id) => {
        this.props.spreadEvent(event_id);
        this.setState({open_modal: true});
    }

    closeModal = (event) => {
        event.stopPropagation();
        this.setState({open_modal: false});
    }

    render(){
        const { whole_date, hideEvent } = this.props;
        let reset_month = new Date(whole_date);
        /** Get the week day of the first day of the month */
        let week_day = reset_month.getDay(); 
        let currentDays = []; //dates will be stored here (will be used to render the dates)
    
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
                number: reset_month.getDate(),
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
                            className={`calendar_day
                                        ${day.current_month ? " current":""}
                                        ${day.label ? day.label:""}`}
                            {...(day.is_clickable && {onClick: () => this.showEvent(day.event.id)})}
                                        >
                        <p>{day.number}</p>
                        {this.state.open_modal && day.is_clickable && <EventModal closeModal={this.closeModal} hideEvent={hideEvent} event={day.event} />}
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default CalendarDays;