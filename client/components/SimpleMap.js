import {Gmaps, Marker} from 'react-gmaps';
import React from 'react';

class SimpleMap extends React.Component {

  constructor(props) {
    super(props);
  }

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  }

  render() {
    var lat =37 , long = -122;
    if(this.props.places.length){
      var coordinates = [];
      var midLat = 0;
      var midLng = 0;

      for(var i = 0 ; i < this.props.places.length ; i++) {
        midLat += this.props.places[i].location.coordinate.latitude;
        midLng += this.props.places[i].location.coordinate.longitude

        coordinates.push(
          {
            lat: this.props.places[i].location.coordinate.latitude,
            lng: this.props.places[i].location.coordinate.longitude
          }
        );
      }

      midLat = midLat/coordinates.length;
      midLng = midLng/coordinates.length;

      console.log('coordinates:', coordinates);

      return (
        <div>
          <Gmaps
            width={'400px'}
            height={'400px'}
            lat={lat}
            lng={long}
            zoom={12}
            loadingMessage={'Be happy'}
            params={{v: '3.exp'}}
            onMapCreated={this.onMapCreated}>

            {coordinates.map((marker, index) => 
            <Marker
              lat={marker.lat}
              lng={marker.lng} 
              key={index}/>
            )}

          </Gmaps>

        </div>

      )
    } else {
    return (
      <div>MAP</div>
      )
    }
  }
};

export default SimpleMap;