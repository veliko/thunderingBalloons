import {Gmaps, Marker, InfoWindow} from 'react-gmaps';
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
    var lat =37 , lng = -122;
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
            lng: this.props.places[i].location.coordinate.longitude,
            name: this.props.places[i].name
          }
        );
      }

      midLat = midLat/coordinates.length;
      midLng = midLng/coordinates.length;

      return (
        <div>
          <Gmaps
            width={'400px'}
            height={'400px'}
            lat={midLat}
            lng={midLng}
            zoom={12}
            params={{v: '3.exp'}}
            onMapCreated={this.onMapCreated}>

            {coordinates.map((marker, index) =>
            <Marker
              lat={marker.lat}
              lng={marker.lng} 
              key={index}/>
            )}
            {coordinates.map((marker, index) =>
            <InfoWindow
              lat={marker.lat}
              lng={marker.lng} 
              key={index}
              content={marker.name}/>
            )}

          </Gmaps>

        </div>

      )
    } else {
    return (
      <Gmaps
            width={'200px'}
            height={'200px'}
            lat={lat}
            lng={lng}
            zoom={12}
            params={{v: '3.exp'}}
            onMapCreated={this.onMapCreated}>
      </Gmaps>
    )
    }
  }
};

export default SimpleMap;