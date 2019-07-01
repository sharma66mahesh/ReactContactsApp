import React from "react";
import PropTypes from 'prop-types'; //for validation of props' data types
import { Link } from 'react-router-dom';
import Add from '@material-ui/icons/Add';
import Home from '@material-ui/icons/Home';

//function based component
function Header(props) {
  const { headName} = props;

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
      {/* <h1 style={{color:"red"}}>{props.headName}</h1> */}
      {/* <h1 style={headingStyle}>{props.headName}</h1> */}


      <div className="container">
        {/* <a href='/' className="navbar-brand">{headName}</a> reloads the page*/}
        <Link to='/' className="navbar-brand">{headName}</Link>
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to = '/' className='nav-link'>
                <Home />Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to = '/contact/add' className='nav-link'>
                <Add />Add Contact
              </Link>
            </li>

            <li className="nav-item">
              <Link to = '/about' className='nav-link'>
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

//if nothing is passed as props, use default
Header.defaultProps = {
  headName: 'MyApp'
};

//specify validation for what prop types should be passed. Throws only warning on console if can't validate
Header.propTypes = {
  headName: PropTypes.string.isRequired
}

// const headingStyle = {
//   color: 'red',
//   fontSize: '50px'
// }

export default Header;