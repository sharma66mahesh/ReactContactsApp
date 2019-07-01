//In previous file, we passed contact and other information as props. Now instead, we will be using state to store information about individuals.

import React, { Component } from 'react';
import Contact from './Contact';
import { Consumer } from '../../context';


class Contacts extends Component {
  // constructor() {
  //   super();
    // this.state=
    //state of contacts moved to context.js

  
  deleteContact = (id) => {
    console.log(id);
    const { contacts } = this.state;

    const newContacts = contacts.filter(contact => contact.id !== id);

    this.setState({contacts: newContacts});
  }

  render() {
    return(
      <Consumer>
        {value => {
          const {contacts} = value;
          return (
            <React.Fragment>
              <h1 className="display-4 mb-2">
                <span className='text-danger'>Contact </span>List
              </h1>
              {contacts.map(contact => (
                <Contact 
                  key={contact.id}
                  contact = {contact}
                  deleteClickHandler={this.deleteContact.bind(this, contact.id)}
                />
              ))}
              {/* </div> */}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

//     const { contacts } = this.state;  //destructuring

//     return(
//       // <div> 
//       // see by inspect element, u'll find this div is unnecessary. so we'll use fragment. Fragment is just for grouping, it won't show any tags in actual html.
      
//     );
//   }
// }

export default Contacts;