import React, { Component } from "react";
import { Container } from "reactstrap";
import MapboxGL, { accessToken } from "mapbox-gl";

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      api_url: "http://data.edmonton.ca/resource/87ck-293k.json",
      map: false,
      viewport: {
        zoom: 10,
        latitude: 53.52666097368566,
        longitude: -113.39388775920357,
        center: [-113.39388775920357, 53.52666097368566],
      },
      data: null,
    };
  }

  initializeMap() {
    MapboxGL.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    let map = new MapboxGL.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      ...this.state.viewport,
    });

    map.on("load", () => {
      map.addLayer({
        id: "points",
        type: "circle",
        source: {
          type: "geojson",
          data: this.state.data,
        },
        paint: {
          "circle-radius": 5,
          "circle-color": "#000000",
        },
      });
    });

    map.on("click", "points", (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const {details, description, impact, duration} = e.features[0].properties; 
    });
    this.setState({ map });
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
    const { map, data } = this.state;
    if (data && !map) this.initializeMap();
    return <div style={{ width: 1100, height: 600 }} id="map"></div>;
  }
}
