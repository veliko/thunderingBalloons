class Search extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h4>What? <input class='text' id='term' type='text' name='term' placeholder='what you want to do...' required/></h4>
        <h4>Who? <input class='text' id='address' type='text' name='address' placeholder='address...' required/></h4>
        <input type='submit' value='Add' onClick = {() => addAddress(this.props.addresses, this.props.setStates)}/>
        <br/><br/>
        <input type='submit' value='Search' onClick = {() => searchPlaces(null, this.props.setStates)}/>
        <br/><br/>
      </div> 
  )}
};

window.Search = Search;