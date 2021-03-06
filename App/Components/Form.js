import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
import LocationField from './LocationField'
import TakeMeHome from './TakeMeHome'
import RouteLink from './RouteLink';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    zIndex: 1
  }, 
  homeContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center'
  }
});


class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  showLink() {
    console.log(this)
    if (this.props.url || this.props.isLoading) {
      return (<RouteLink url={this.props.url} isLoading={this.props.isLoading} />)
    } else {
      return  (<View />)
    }
  }

  render() {
    console.log(this.props)
    return (
      <View style={styles.container} >
        <View>
        </View>
        <LocationField locationType='origin' updateLocation={this.props.updateLocation} />
        <LocationField locationType='destination' updateLocation={this.props.updateLocation} />
        <View style={styles.homeContainer} >
          <TakeMeHome getRoute={this.props.getRoute} setLoading={this.props.setLoading} />
          {this.showLink()}
        </View>
      </View>
    );
  }
}

module.exports = Form;
