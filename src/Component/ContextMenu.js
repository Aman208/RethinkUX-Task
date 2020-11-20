import React, { Component } from "react";

class ContextMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xPos: "10px",
      yPos: "20px:",
      showMenu: false,
    };
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClick);
    document.addEventListener("dblclick", this.handleContextMenu);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick);
    document.removeEventListener("dblclick", this.handleContextMenu);
  }

  handleClick = (e) => {
    if (this.state.showMenu) this.setState({ showMenu: false });
  };

  handleContextMenu = (e) => {
    e.preventDefault();

    this.setState({
      xPos: `${e.pageX}px`,
      yPos: `${e.pageY}px`,
      showMenu: true,
    });

    // ...
  };

  render() {
    const { showMenu, xPos, yPos } = this.state;

    if (showMenu)
      return (
        <ul
          className="menu"
          style={{
            marginTop: yPos,
            marginLeft: xPos,
          }}
        >
          <li>Login</li>
          <li>Register</li>
          <li>Open Profile</li>
        </ul>
      );
    else return null;
  }
}

export default ContextMenu;
