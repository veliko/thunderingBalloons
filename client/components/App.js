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
      }else{
        return (
        <div>
          <ul className='nav nav-justified nav-pills'>
            <li role="navigation" className="active" onClick={() => addEvents()}><a>Add Events</a></li>
            <li role="navigation" onClick={() => getEvents(this.setStates.bind(this))}><a>My Events</a></li>
            <li role="navigation" ><a href='/logout'>Log Out</a></li>
          </ul>
          <div className='col-md-6'>
            <Search users = {this.state.users} setStates = {this.setStates.bind(this)} places = {this.state.placesList} />
            <PlaceList places = {this.state.placesList} />
            <div className="dropdown">
                <a href="#" data-toggle="dropdown" className="dropdown-toggle">Dropdown <b className="caret"></b></a>
                <ul className="dropdown-menu">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                </ul>
            </div>
          </div>
          <div className='col-md-6'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d12620.855610905164!2d-122.45237444999998!3d37.73812575!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1456719338319" width="600" height="450" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      )
      }
      
      
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
