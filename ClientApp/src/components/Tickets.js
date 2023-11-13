import React, { Component } from 'react';
import './component.css';

export class Tickets extends Component {
  static displayName = Tickets.name;

  render() {
    return(
      <div class="mx-auto max-w-xs">
      <label for="example3" class="mb-1 block text-sm font-medium text-gray-700">Mogući ticketi</label>
      <select id="example3" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50">
      <option value="">Projektor I5</option>
      </select>
     <p class="mt-1 text-sm text-gray-500">Odaberite ticket</p>
    </div>
    );
  }
}
