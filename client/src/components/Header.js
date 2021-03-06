import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  renderContent() {
      switch(this.props.auth) {
        case null:
          return;
        case false:
          return <li><a href="/auth/google">Login / Sign Up with Google</a></li>;
        default:
          return [
            <li key="1"><Payments /></li>,
            <li style={{ margin: '0 10px' }} key="2">
              Credits: {this.props.auth.credits}
            </li>,
            <li key="3"><a href="/api/logout">Logout</a></li>
          ];
      }
  }

  render() {
    return (
      <nav className="black">
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo"
          >
            <i
              className="material-icons"
              style={{
                fontSize: '1.3em',
                marginRight: '0',
                color: '#FFC100'
              }}
            >flash_on</i>
            <span className="hide-on-small-and-down">BackFeed</span>
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({auth}) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
