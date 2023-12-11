import React, { Component } from 'react';
import './component.css';
import axios from 'axios';


export class Tickets extends Component {
  static displayName = Tickets.name;

  constructor(props) {
    super(props);
    this.state = {
      selectedTicket: '',
      onSubmit:'',
      formData: {
        ticket: '',
        password: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        rememberMe: false,
        firstName: '',
        lastName: '',
        email: '',
        website: '',
        bio: '',
        photo: '',
      },
      ticketOptions: ['Dummy 1', 'Dummy 2', 'Nesto tamo'], 
    };
  }

  handleTicketChange = (event) => {
    const selectedTicket = event.target.value;
    this.setState((prevState) => ({
      selectedTicket,
      formData: {
        ...prevState.formData,
        ticket: selectedTicket,
      },
    }));
  };

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: type === 'checkbox' ? checked : value,
      },
    }));
  };

  handleSubmit = async () => {
    const { formData } = this.state;

    try {
      await axios.post('http://localhost:3001/saveFormData', formData);

      console.log('Form data submitted successfully');
      this.props.onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  render() {
    const { selectedTicket, formData, ticketOptions } = this.state;

    return (
      <div className='min-h-screen'>
        <input
          type="text"
          list="ticketOptions"
          className="select select-bordered w-full max-w-xs text-white bg-slate-700"
          placeholder="Search and select a ticket"
          onChange={this.handleTicketChange}
        />
        <datalist id="ticketOptions">
          {ticketOptions.map((option, index) => (
            <option key={index} value={option} />
          ))}
        </datalist>

        {selectedTicket && (
          <div className="mx-auto max-w-xl">
            <form action="" className="space-y-5">
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-6">
                  <label htmlFor="example7" className="mb-1 block text-sm font-medium text-white">Ticket</label>
                  <input
                    type="text"
                    id="example7"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed text-white disabled:bg-gray-50 disabled:text-white"
                    placeholder="Ticket"
                    value={selectedTicket}
                    readOnly
                  />
                </div>

                {/* Additional form fields go here */}
                <div className="col-span-6">
                  <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-white">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed text-white disabled:bg-gray-50 disabled:text-white"
                    placeholder="Ime"
                    value={formData.firstName}
                    onChange={this.handleChange}
                  />
                </div>

                {/* Include other form fields here */}

                <div className="col-span-12">
                  <button
                    type="button"
                    onSubmit={this.handleSubmit}
                    className="rounded-lg border border-primary-500 bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default Tickets;
