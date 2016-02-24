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
    this.setState({placesList : data.placesList});
  }

  render() {
    return (
      <div>
        <Search setStates = {this.setStates.bind(this)}/>
        <PlaceList places = {this.state.placesList} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
