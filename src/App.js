import React, { Component } from "react";
import Header from './components/Header';
import Map from './components/Map';
import {Container} from 'reactstrap';
require('dotenv').config()
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationName:'TrafficMap'
    };
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div className="App">
        <Header appName={this.state.applicationName}/>
        <Container>
          <Map />
        </Container>
        
      </div>
    );
  }
}

export default App;
