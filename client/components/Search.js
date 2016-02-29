class Search extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <h4 className='row' >What? <input id='term' type='text' name='term' placeholder='what you want to do...' required/></h4>
          <h4 className='row' >When?
            <input id='date' type='text' name='date' placeholder='date...' required/>
            <input id='time' type='text' name='time' placeholder='time...' required/>
          </h4>
        </div>
        <div className='row'>
          <h4>Who?</h4>
          <AddressList users = {this.props.users}/>
        </div>
        <input type='submit' value='Search Places' onClick = {() => searchPlaces(this.props.setStates, this.props.users)}/>
        <input type='submit' value='Send Invite' onClick = {() => postEvent(this.props.places, this.props.users)}/>
      </div> 
  )}
};

window.Search = Search;