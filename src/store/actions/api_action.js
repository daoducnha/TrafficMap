import {FETCH_API_START, FETCH_API_SUCCESS, FETCH_API_FAILURE, ADD_API_DATA} from './action_types';

const api_url = "http://data.edmonton.ca/resource/87ck-293k.json";

export function fetchAPIStart() {
    return {
        type: FETCH_API_START
    }
}

export function fetchAPISuccess(data) {
    return {
        type: FETCH_API_SUCCESS,
        payload: data
    }
}

export function fetchAPIFailure() {
    return {
        type: FETCH_API_FAILURE
    }
}

export function fetchFromAPI() {
    console.log("adsfasdfas");
    return dispatch => {
        
        dispatch(fetchAPIStart());

        fetch(api_url, { method: "GET" })
        .then((response) => response.json())
        .then((response) => createFeatureCollection(response))
        .then((response) => dispatch(fetchAPISuccess(response)))
        .catch(e => dispatch(fetchAPIFailure()));
    }
}

function createFeatureCollection(data) {
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