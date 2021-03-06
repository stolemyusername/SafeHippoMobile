import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps';
import Form from './Form';
import env from '../../env.js';


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});

class RouteFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: { lat: 37.78825, lon: -122.4324 },
      destination: { lat: 37.79825, lon: -122.4724 },
      shortestRoute: {},
      isLoading: false
    }
  }



  _coordsFromLocationID(locationID) {
    return fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${locationID}&key=${env.GOOGLE_KEY}`)
    .then(res => res.json())
  }
  _updateLocation(context) {
    return function(locationType, data) {
      console.log('The data from autofill location is', data)
      context._coordsFromLocationID(data.place_id)
      .then(response => {
        context.setState({
          [locationType]: {
            lat: response.result.geometry.location.lat,
            lon: response.result.geometry.location.lng
          }
        }, () => {console.log('context.state', locationType, context.state)})
      })
    }
  }

  _getRoute() {
    const origin = this.state.origin;
    const destination = this.state.destination;
    const url = `https://safehippo.com/safestRoute?originLat=${origin.lat}&originLon=${origin.lon}&destLat=${destination.lat}&destLon=${destination.lon}`

    console.log(url);

    fetch(url)
    .then(res => res.json())
    .then((parseRes) => {
      this.setState({
        shortestRoute: parseRes,
        isLoading: false
      })
    })
  }

  setLoading() {
    this.setState({
      isLoading: true
    })
  }

  render() {
    const center = {
      lat: (this.state.origin.lat + this.state.destination.lat) / 2,
      lon: (this.state.origin.lon + this.state.destination.lon) / 2
    }
    const deltas = {
      lat: Math.abs(this.state.origin.lat - this.state.destination.lat),
      lon: Math.abs(this.state.origin.lon - this.state.destination.lon)
    }

    return (
      <View style={styles.container} >
        <Form updateLocation={this._updateLocation(this)} getRoute={this._getRoute.bind(this)} url={this.state.shortestRoute.shortURL} isLoading={this.state.isLoading} setLoading={this.setLoading.bind(this)} />
        <MapView
          style={ styles.map }
          initialRegion={{
            latitude: center.lat,
            longitude: center.lon,
            latitudeDelta: deltas.lat,
            longitudeDelta: deltas.lon,
          }}
        />
      </View>
    );
  }
}

module.exports = RouteFinder;
