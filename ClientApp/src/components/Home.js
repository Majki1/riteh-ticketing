import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './component.css';
import ritehLogo from './images/riteh_logo.png';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
<div className="hero min-h-screen bg-base-100">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src={ritehLogo} className="max-w-sm rounded-lg shadow-2xl" />
    <div className='justify-content-start'>
      <h1 className="text-5xl font-bold text-white">Dobro došli</h1>
      <p className="py-6 text-white">RiTeh ticketing sustav</p>
      <Link className="btn btn-primary" to= '/LoginForm'>Prijava</Link>
    </div>
  </div>
</div>
</div>
    );
  }
}
