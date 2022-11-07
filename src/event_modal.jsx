import React, { Component } from 'react';

/** pansamantalang modal */
class EventModal extends Component{

    closeEvent = (event) => {
        this.props.closeModal(event);
        this.props.hideEvent(0);
    }

    render(){
        const { event } = this.props;
        return(
            <div className="modal">
                <button onClick={e => this.closeEvent(e)}>close</button>
                <p>{event.event_type}</p>
            </div>
        )
    }
}

export default EventModal;