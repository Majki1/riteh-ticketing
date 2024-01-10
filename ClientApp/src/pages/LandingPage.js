import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './pages.css';
import ritehLogo from './riteh_logo.png'

export class LandingPage extends Component {
  static displayName = LandingPage.name;

  render() {
    return (
      <div>
<div className="hero min-h-screen bg-base-100">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src={ritehLogo} className="max-w-sm rounded-lg shadow-2xl" />
    <div className='justify-content-start'>
      <h1 className="text-5xl bg-gradient-to-r from-green-400 to-blue-500 inline-block text-transparent bg-clip-text p-2"><strong>RiTeh</strong> ticketing sustav</h1>
      <p className="py-6 px-2 text-white">Prijavite se za slanje ticketa</p>
      <Link className="btn bg-gradient-to-r text-white from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500" to= '/LoginForm'>Prijava</Link>
    </div>
  </div>
</div>
</div>
    );
  }
}
