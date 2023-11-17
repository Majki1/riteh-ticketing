import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './component.css';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
<div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold text-white">Dobro došli</h1>
      <p class="py-6 text-white">Random text zamjenit cu kasnije</p>
      <Link className="btn btn-primary" to="Tickets">Podigni ticket</Link>
    </div>
  </div>
</div>
    );
  }
}
