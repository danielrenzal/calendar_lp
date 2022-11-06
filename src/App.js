import React, { Component } from 'react';
import Calendar from "./calendar";
import EventModal from "./event_modal";

class App extends Component{
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
    modal_position_x: 500,
    modal_position_y: 300,
    modal_state: "close_modal",
    events: [
      {id: 1, start: 4, end: 10, month: 2, event_type: "cohort", calendar_display: "peek"},
      {id: 2, start: 15, end: 18, month: 5, event_type: "break", calendar_display: "full"}
    ],
    opened_event_state: null
  }

  /** function to open event modal. 'event' parameter is used to get the position of the clicked event
   * then pass it to the modal component to use it for its positioning(?)
   */
  showModal = (event) => {
    const { clientX, clientY } = event;
    this.setState({modal_position_x: clientX, modal_position_y: clientY, modal_state: "open_modal"})
  }

  /** function to close modal */
  closeModal = () => {
    this.setState({modal_state: "close_modal"});

    const { events, opened_event_state: index } = this.state;

    events[index].calendar_display = "peek";

    this.setState({events, opened_event_state: null});
  }

  /** function to 'spread' the event (show its full range) */
  spreadEvent = (index, event) => {
    this.showModal(event);
    const { events } = this.state;

    events[index].calendar_display = "full";

    this.setState({events, opened_event_state: index});
  }

  render(){
    const {modal_position_x: x, modal_position_y: y, modal_state, events} = this.state;
    return (
      <div className="App">
        {/* pansamantala lang muna itey na structure*/}
        <Calendar month={0} spreadEvent={this.spreadEvent} events={events}/>
        <Calendar month={1} spreadEvent={this.spreadEvent} events={events}/>
        <Calendar month={2} spreadEvent={this.spreadEvent} events={events}/>
        <Calendar month={3} spreadEvent={this.spreadEvent} events={events}/>
        <Calendar month={4} spreadEvent={this.spreadEvent} events={events}/>
        <Calendar month={5} spreadEvent={this.spreadEvent} events={events}/>
        <Calendar month={6} spreadEvent={this.spreadEvent} events={events}/>
        <Calendar month={7} spreadEvent={this.spreadEvent} events={events}/>
        <Calendar month={8} spreadEvent={this.spreadEvent} events={events}/>
        <EventModal x={x} y={y} modal_state={modal_state} closeModal={this.closeModal}/>
      </div>
    );
  }
}

export default App;
