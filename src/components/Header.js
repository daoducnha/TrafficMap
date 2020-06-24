import React, { Component } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
  } from "reactstrap";
class Header extends Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        }
      }
    
      toggle() {
        this.setState({isOpen: !this.state.isOpen})
      }

  render() {
    return (
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto">
          {this.props.appName}
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} className="mr-2" />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>
            <NavItem>1.000 traffic incidents</NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Header;
