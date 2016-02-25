class Nav extends React.Component {

  render() {
      return (
        <div>
          <div onClick={() => getEvents()}> My Events</div>
          <div>Add Events</div>
          <div>Log Out </div>
        </div>
      )
    }
}

ReactDOM.render(<Nav />, document.getElementById('nav'));
