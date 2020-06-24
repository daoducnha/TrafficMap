import React, { Component } from "react";
// import { Container } from "reactstrap";
import MapboxGL from "mapbox-gl";

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {      
      map: false,
      viewport: {
        zoom: 10,
        latitude: 53.52666097368566,
        longitude: -113.39388775920357,
        center: [-113.39388775920357, 53.52666097368566],
      }      
    };
  }

  static initializeMap(state, viewport) {
    MapboxGL.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    let map = new MapboxGL.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      ...viewport,
    });

    map.on("load", () => {
      map.addLayer({
        id: "points",
        type: "circle",
        source: {
          type: "geojson",
          data: state.data,
        },
        paint: {
          "circle-radius": 5,
          "circle-color": "#000000",
        },
      });
    });

    map.on("click", "points", (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const {
        details,
        description,
        impact,
        duration,
      } = e.features[0].properties;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new MapboxGL.Popup()
        .setLngLat(coordinates)
        .setHTML(
          `
        <strong>${description}</strong>
        <em>${impact}</em>
        <em>${duration}</em>
        <p>${details}</p>
      `
        )
        .addTo(map);
    });

    map.on("mouseenter", "points", () => {
      map.getCanvas().style.cursor = "";
    });

    return { map };
  }

  static getDerivedStateFromProps(nextProps, prevState) {    
    const { map, data } = nextProps;
    if (data && !map) return Map.initializeMap(nextProps, prevState.viewport);
    else return null;
  }

  

 

  render() {
    return <div style={{ width: 1100, height: 600 }} id="map"></div>;
  }
}
