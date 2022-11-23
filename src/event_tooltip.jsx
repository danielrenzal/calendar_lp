import React, { Component } from 'react';
import './event_tooltip.scss';

class EventTooltip extends Component{
    constructor(prop){
        super(prop);
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }

    /** 
    *	DOCU: Triggers the closeDateTooltip and shrinkCalendarEvent. <br>
    *	Triggered by an onClick method from the render method <br>
    *	Last updated at: November 10, 2022
    *	@param {array} click_event required to use the stopPropagation on the closeDateTooltip method
    *	@author Daniel
    */
    closeTooltip = (click_event) => {
        this.props.closeDateTooltip(click_event);
        this.props.shrinkCalendarEvent(this.props.events);
    }

    render(){
        const { date, month, year, events } = this.props;
        
        return(
            <div className="date_tooltip">
                <div className="tooltip_header">
                    <p className="full_date">{this.months[month]} {date}, {year}</p>
                    <button className="close_btn" onClick={e => this.closeTooltip(e)}></button>
                </div>
                {
                    events.map((event, index) => {
                        const start_date = new Date(event.start);
                        const end_date = new Date(event.end);
                        return (
                            <React.Fragment key={event.id}>
                                {index === 1 && <hr />}
                                <div className="tooltip_event_section">
                                    <p className="event_name">
                                        <span className={`event_color_dot ${event.event_type}`}></span>
                                        {event.event_type}
                                    </p>
                                    <button className="edit_btn"></button>
                                </div>
                                <div className="tooltip_date_section">
                                    <span className="calendar_icon"></span>
                                    {
                                        start_date.toDateString() === end_date.toDateString() 
                                        ?
                                        <p>{this.months[start_date.getMonth()]} {start_date.getDate()}, {start_date.getFullYear()}</p>
                                        :
                                        <React.Fragment>
                                            <p>{this.months[start_date.getMonth()].substring(0,3)} {start_date.getDate()}, {start_date.getFullYear()}</p>
                                            -
                                            <p>{this.months[end_date.getMonth()].substring(0,3)} {end_date.getDate()}, {end_date.getFullYear()}</p>
                                        </React.Fragment>
                                    }
                                </div>
                                {
                                    (event.status === "pending")
                                    &&
                                    <div className="tooltip_approve_reject_section">
                                        <button className="reject_event">Reject</button>
                                        <button className="approve_event">Approve</button>
                                    </div>
                                }
                            </React.Fragment>
                        )
                    })
                }
                
            </div>
        )
    }
}

export default EventTooltip;