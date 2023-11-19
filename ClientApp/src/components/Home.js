import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './component.css';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
<div class="hero min-h-screen bg-base-100">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold text-white">Login now!</h1>
      <p class="py-6 text-white">Random text mrnjaaaaaaaau</p>
    </div>
    <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form class="card-body">
        <div class="form-control">
          <label class="label">
            <span class="label-text text-black">Email</span>
          </label>
          <input type="email" placeholder="email" class="input input-bordered" required />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text text-black">Password</span>
          </label>
          <input type="password" placeholder="password" class="input input-bordered" required />
          <label class="label">
            <a href="#" class="label-text-alt link link-hover text-black">Forgot password?</a>
          </label>
        </div>
        <div class="mt-6 bg-base-100">
          <button class="btn bg-slate-600 text-white">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
    );
  }
}
