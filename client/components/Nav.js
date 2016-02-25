class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: '/login'
    };
  }

  setStates(data) {
  }

  render() {
      return (
        <div>
          <div>My Events</div>
          <div>Add Events</div>
          <div>Log Out </div>
        </div>
      )
    }
}

ReactDOM.render(<Nav />, document.getElementById('nav'));
