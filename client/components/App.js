class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placesList: [],
      addressesList: []
    };
  }

  // handleClick(event){
  //  var videoName = event.target.innerHTML;
  //  for(var i = 0 ; i < this.state.videoList.length ; i++){
  //   if(this.state.videoList[i].snippet.title === videoName){
  //     this.setState({currentlyPlaying : this.state.videoList[i]});
  //   }
  //  }

  //}

  setStates(data) {
    if(data.placesList) {
      this.setState({placesList : data.placesList});
    }
    if(data.addressesList) {
      this.setState({addressesList : data.addressesList});
    }
  }

  render() {
    return (
      <div>
        <Search addresses = {this.state.addressesList} setStates = {this.setStates.bind(this)}/>
        <AddressList addresses = {this.state.addressesList} setStates = {this.setStates.bind(this)} />
        <PlaceList places = {this.state.placesList} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
