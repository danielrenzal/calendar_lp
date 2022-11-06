import React, { Component } from 'react';

/** pansamantalang modal */
class EventModal extends Component{
    render(){
        const { x, y, modal_state, closeModal } = this.props;
        return(
            <div className={`${modal_state} modal`} style={{top: `${y}px`, left: `${x}px`}}>
                <button onClick={closeModal}>close</button>
                <p>Event infos...</p>
            </div>
        )
    }
}

export default EventModal;