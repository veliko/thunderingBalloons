class Nav extends React.Component {

  render() {
      return (
        <div>
          <div onClick={() => getEvents()}> My Events</div>
          <div>Add Events</div>
          <div><a href='/logout'>Log Out</a></div>
        </div>
      )
    }
}

ReactDOM.render(<Nav />, document.getElementById('nav'));
