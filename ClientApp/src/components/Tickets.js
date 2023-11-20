import React, { Component } from 'react';
import './component.css';

export class Tickets extends Component {
  static displayName = Tickets.name;

  constructor(props) {
    super(props);
    this.state = {
      selectedTicket: '',
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

  handleSubmit = () => {
    console.log('Form submitted:', this.state.formData);
  };

  render() {
    const { selectedTicket, formData } = this.state;

    return (
      <div>
        <select
          className="select select-bordered w-full max-w-xs text-white bg-slate-700"
          defaultValue=""
          onChange={this.handleTicketChange}
        >
          <option value="" disabled className='text-white'>Odeberite Ticket</option>
          <option value="dummy1" className='text-white'>Dummy 1</option>
          <option value="dummy2" className='text-white'>Dummy 2</option>
        </select>

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
                <div className="col-span-6">
                  <label htmlFor="example8" className="mb-1 block text-sm font-medium text-white">Password</label>
                  <input
                    type="password"
                    id="example8"
                    name="password"
                    value={formData.password}
                    onChange={this.handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed text-white disabled:bg-gray-50 disabled:text-white"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="col-span-6">
                  <label htmlFor="example9" className="mb-1 block text-sm font-medium text-white">First Name</label>
                  <input
                    type="text"
                    id="example9"
                    name="firstName"
                    value={formData.firstName}
                    onChange={this.handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed text-white disabled:bg-gray-50 disabled:text-white"
                    placeholder="Enter your first name"
                  />
                </div>
                {/* Include other form fields here */}
                <div className="col-span-12">
                  <button
                    type="button"
                    onClick={this.handleSubmit}
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
