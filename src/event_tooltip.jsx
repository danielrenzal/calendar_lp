import React, { Component } from 'react';

/** pansamantalang modal */
class EventTooltip extends Component{
    constructor(prop){
        super(prop);
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }

    closeEvent = (click_event) => {
        this.props.closeModal(click_event);
        this.props.hideEvent(this.props.event.id);
    }

    render(){
        const { event } = this.props;
        const start_date = new Date(event.start);
        const end_date = new Date(event.end);
        return(
            <div className="modal">
                <div className="modal_header">
                    <p className="full_date">{this.months[start_date.getMonth()]} {start_date.getDate()}, {start_date.getFullYear()}</p>
                    <button onClick={e => this.closeEvent(e)}>close</button>
                </div>
                <div className="modal_event">
                    <p>
                        <span className="event_color_dot" style={{backgroundColor: `rgba(${event.color.r}, ${event.color.g}, ${event.color.b}, 1)`}}></span>
                        {event.event_type}
                    </p>
                    <button className="edit">edit</button>
                </div>
                <div className="modal_date">
                <p>{this.months[start_date.getMonth()].substring(0,3)} {start_date.getDate()}, {start_date.getFullYear()}</p> -
                <p>{this.months[end_date.getMonth()].substring(0,3)} {end_date.getDate()}, {end_date.getFullYear()}</p>
                </div>
                
            </div>
        )
    }
}

export default EventTooltip;