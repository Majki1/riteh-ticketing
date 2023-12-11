import React, { Component } from 'react';
import Tickets from './Tickets';
import MyTickets from './MyTickets';

class TicketManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: null,
    };
  }

  handleFormSubmit = (formData) => {
    this.setState({ formData });
  };

  render() {
    const { formData } = this.state;

    return (
      <div>
        <Tickets onSubmit={this.handleFormSubmit} />
        <MyTickets formData={formData} />
      </div>
    );
  }
}

export default TicketManager;
