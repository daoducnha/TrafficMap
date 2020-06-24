import React, { Component } from "react";
import { Container } from "reactstrap";
import MapGL, { Marker } from "react-map-gl";
import CityPin from "./Pin";
export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      api_url: "http://data.edmonton.ca/resource/87ck-293k.json",
      viewport: {
        width: 1000,
        height: 800,
        zoom: 10,
        latitude: 53.52666097368566,
        longitude: -113.39388775920357,
      },
      data: null,
    };
  }

  componentDidMount() {
    const { data, api_url } = this.state;

    if (!data) {
      fetch(api_url, { method: "GET" })
        .then(response => response.json())      
        .then(response => this.setState({ data: response }));
    }
    
  }

  render() {
    const { data } = this.state;  
    return (
      <Container>      
          
        <MapGL
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          {...this.state.viewport}
          onViewportChange={(viewport) => this.setState({ viewport })}
        >
          
          {data && data.map((coord, i) => (            
            <Marker
              key={`Marker-${i}`}
              latitude={parseFloat(coord.location.latitude)}
              longitude={parseFloat(coord.location.longitude)}
            >
              <CityPin />
            </Marker>
          ))}
        </MapGL>
      </Container>
    );
  }
}
