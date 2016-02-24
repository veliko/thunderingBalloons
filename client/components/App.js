class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placesList: []
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
    console.log('placesList:', data.placesList);
    this.setState({placesList : data.placesList});
  }

  // autoplay(){
  //   this.setState({autoplay: !this.state.autoplay});
  // }

  render() {
    return (
      <div>
        <section>
          <Search setStates = {this.setStates.bind(this)}/>
        </section>
        <section>
        </section>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
