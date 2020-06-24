import React, { Component } from "react";
import Header from './components/Header';
import Map from './components/Map';
import {Container} from 'reactstrap';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationName:'TrafficMap',
      data: null,
      api_url: "http://data.edmonton.ca/resource/87ck-293k.json",
    };
  }

  createFeatureCollection(data) {
    let features = [];

    data.forEach((element) => {
      features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            parseFloat(element.location.longitude),
            parseFloat(element.location.latitude),
          ],
        },
        properties: {
          description: element.description,
          details: element.details,
          impact: element.impact,
          duration: element.duration,
        },
      });
    });

    return {
      type: "FeatureCollection",
      features: features,
    };
  }

  componentDidMount() {
    const { data, api_url } = this.state;

    if (!data) {
      fetch(api_url, { method: "GET" })
        .then((response) => response.json())
        .then((response) => this.createFeatureCollection(response))
        .then((response) => this.setState({ data: response }));
    }
  }

  render() {
    return (
      <div className="App">
        <Header appName={this.state.applicationName}/>
        <Container>
          <Map data={this.state.data} />
        </Container>
        
      </div>
    );
  }
}

export default App;
