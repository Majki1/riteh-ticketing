import React, { Component } from "react";
import './pages.css';
import NavMenu from '../components/NavMenu/NavMenu';

const isAuthenticated = 1;


export class Closed extends Component{
    render() {
        return( 
            <>
            <NavMenu isAuthenticated={isAuthenticated} />
            <div className="min-h-screen"></div> 
            </>
            )
    }
}