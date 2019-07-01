// a single contact, used by contacts 

import React from "react";
import PropTypes from 'prop-types'; //for prop validation
// import '../css/contact.css';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Consumer } from '../../context'; 
import axios from 'axios';
import { Link } from 'react-router-dom';


class Contact extends React.Component {
  // constructor() {
  //   super();

  //   this.onShowClick = this.onShowClick.bind(this); //if u don't want to use bind, another method is to use arrow function definition
  // }
  state = {
    showContactInfo: false
  };
  // static propTypes = {
  //   name: PropTypes.string.isRequired,
  //   email: PropTypes.string.isRequired,
  //   phone: PropTypes.string.isRequired
  // }

  //this requires binding cuz arrow function is not used
  // onShowClick() {
  //   console.log(this.state);
  // }

  //user defined arrow function don't require binding
  // onShowClick = e => {
  //   console.log(e.target);  //e is the event and e.target is the actual element that triggered this method
  // }

  // onShowClick = (name, e) => {
  //   // console.log(name, e.target);
  //   this.setState({showContactInfo: !this.state.showContactInfo});
  //   console.log(this.state.showContactInfo);
  // };

  // onDeleteClick = () => {
  //   this.props.deleteClickHandler();  //call function from Contacts.js (parent)
  // }

  // onDeleteClick = (id, dispatch) => {
  //   axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
  //     .then(res => dispatch({type: 'DELETE_CONTACT', payload: id}));
  // };

  onDeleteClick = async (id, dispatch) => {
    try {
      const res = await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch({type: 'DELETE_CONTACT', payload:  id});
    } catch(e) {
      //in real apps, you wouldn't dispatch in catch section.
      dispatch({type: 'DELETE_CONTACT', payload:  id});
    }
  };

  render() {
    const {contact} = this.props;
    const { showContactInfo } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h3>
                {contact.name}
                {/* <ArrowDropDown onClick={this.onShowClick.bind(this)}/>   had to use bind here if it wasn't bound in constructor*/} 
                {/* <ArrowDropDown onClick={this.onShowClick} /> */}
                {/* <ArrowDropDown onClick = {this.onShowClick.bind(this, contact.name)} /> */}
                {/* bind should pass first param as "this". Second parameter could be anything */}
                {/* Similarly, onShowClick should have event as last parameter if something is passed to it */}

                {/* Directly carry out task on onClick */}
                <ArrowDropDown style = {{cursor: 'pointer'}}onClick = {() =>
                  this.setState({showContactInfo: !this.state.showContactInfo})
                } />

                {/* Dispatch is user defined function defined inside state in context.js */}
                <DeleteIcon style = {{cursor: 'pointer', float: 'right', color: 'red'}} 
                onClick = {this.onDeleteClick.bind(this, contact.id, dispatch)}
                />

                <Link to={`/contact/edit/${contact.id}`}>
                  <EditIcon style = {{cursor:'pointer', float:'right', marginRight:'10px'}} />
                </Link>

              </h3>
              {showContactInfo ? 
                <ul className="list-group">
                  <li className="list-group-item">
                    Email: {contact.email}
                  </li>
                  <li className="list-group-item">
                    Phone: {contact.phone}
                  </li>
                </ul>
                :
                null
              }
            </div>
          );
        }}
      </Consumer>
      
    );
  }
}

//This is better way But you can also put this inside the class as well. see static propTypes comment
// Contact.propTypes = {
//   name: PropTypes.string.isRequired,
//   email: PropTypes.string.isRequired,
//   phone: PropTypes.string.isRequired
// }

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  deleteClickHandler: PropTypes.func.isRequired
};

export default Contact;