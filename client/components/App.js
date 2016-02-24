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
    //this.setState({currentlyPlaying : data.items[0]});
    //this.setState({videoList : data.items});
  }

  // autoplay(){
  //   this.setState({autoplay: !this.state.autoplay});
  // }

  render() {
    return (
      <div>
        <section>
          <Search />
        </section>
        <section>
        </section>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
