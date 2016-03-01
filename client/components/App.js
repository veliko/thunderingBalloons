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
            <ul className='nav nav-justified nav-pills'>
              <li role="navigation" className="active" onClick={() => addEvents(this.setStates.bind(this))}><a>Add Events</a></li>
              <li role="navigation" onClick={() => getEvents(this.setStates.bind(this))}><a>My Events</a></li>
              <li role="navigation" ><a href='/logout'>Log Out</a></li>
            </ul>
            <div className='row'>
              <EventList events = {this.state.eventsList}/>
            </div>
          </div>
          )
      } else {
        return (
          <div>
            <ul className='nav nav-justified nav-pills'>
              <li role="navigation" className="active" onClick={() => addEvents()}><a>Add Events</a></li>
              <li role="navigation" onClick={() => getEvents(this.setStates.bind(this))}><a>My Events</a></li>
              <li role="navigation" ><a href='/logout'>Log Out</a></li>
            </ul>
            <div className="row">
              <div className="col-md-6">
                <Search users = {this.state.users} setStates = {this.setStates.bind(this)} places = {this.state.placesList} />
                <PlaceList places = {this.state.placesList} />
              </div>
              <div className="col-md-6">
                <SimpleMap places = {this.state.placesList} />
              </div>
            </div>
          </div>
          )
      }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
