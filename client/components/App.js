import SimpleMap from './SimpleMap';
import Search from './Search'; 
import PlaceList from './PlaceList'; 
import EventList from './EventList';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placesList: [],
      eventsList: [],
      users: [],
      currentPage: '/login'
    };
    getUsers(this.setStates.bind(this));
  }

  setCurrentPage (currentPage, event) {
  if(event) {
    event.preventDefault();
  }
  this.setStates({currentPage: currentPage});
}

  setStates(data) {

    if(data.placesList) {
      this.setState({placesList : data.placesList});
    }
    if(data.addressesList) {
      this.setState({addressesList : data.addressesList});
    }
    if(data.currentPage) {
      this.setState({currentPage : data.currentPage});
    }
    if(data.eventsList) {
      this.setState({eventsList : data.eventsList});
    }
    if(data.users) {
      this.setState({users : data.users});
    }
  }

  render() {
      if(this.state.currentPage === '/myEvents'){
        return (
        <div>
          <div id='nav'>
            <div onClick={() => getEvents(this.setStates.bind(this))}> My Events </div>
            <div onClick={() => addEvents(this.setStates.bind(this))}> Add Events </div>
            <div><a href='/logout'>Log Out</a></div>
          </div>
          <div>
            <EventList events = {this.state.eventsList}/>
          </div>
        </div>
        )
      }else{
        return (
        <div>
          <div id='nav'>
            <div onClick={() => getEvents(this.setStates.bind(this))}> My Events</div>
            <div onClick={() => addEvents()}>Add Events</div>
            <div><a href='/logout'>Log Out</a></div>
          </div>
          <div>
            <Search users = {this.state.users} setStates = {this.setStates.bind(this)} places = {this.state.placesList} />
            <SimpleMap places = {this.state.placesList} />
            <PlaceList places = {this.state.placesList} />
          </div>
        </div>
      )
      }
      
      
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
