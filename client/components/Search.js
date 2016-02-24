class Search extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <input class='text' id='term' type='text' name='term' placeholder='what you want to do...' required/>
        <h4>Add People:</h4>
        <input class='text' id='address' type='text' name='address' placeholder='address...' required/>
        <input type='submit' value='Add'/>
        <br/><br/>
        <input type='submit' value='Search' onClick = {() => searchPlaces(null, this.props.setStates)}/>
        <br/><br/>
      </div> 
  )}
};

window.Search = Search;