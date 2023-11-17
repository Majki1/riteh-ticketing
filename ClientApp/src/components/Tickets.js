import React, { Component } from 'react';
import './component.css';

export class Tickets extends Component {
  static displayName = Tickets.name;

  render() {
    return(
<select className="select select-bordered w-full max-w-xs text-white bg-slate-700">
  <option disabled selected className='text-white'>Odeberite Ticket</option>
  <option className='text-white'>Dummy 1</option>
  <option className='text-white'>Dummy 2</option>
</select>
    );
  }
}