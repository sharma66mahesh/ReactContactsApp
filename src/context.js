//state mgmt using context api

import React, {Component} from 'react';
import axios from 'axios';

const Context = React.createContext();

//detect what type of action is triggered and return modified state
const reducer = (state, action) => {
  switch(action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      };

    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    
    case 'UPDATE_CONTACT':
      return {
        ...state,
        // contacts: [action.payload, ...state.contacts]
        contacts: state.contacts.map(contact => 
          contact.id === action.payload.id ? (contact = action.payload) : contact)
      };
      
    default:
    return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [],
    
    dispatch: action => {
      this.setState(state => reducer(state, action))
    }
  };

  // componentDidMount () {
  //   axios.get('https://jsonplaceholder.typicode.com/users')
  //     .then(res => this.setState({contacts: res.data}));
  // }
  
  //above code by using async await
  async componentDidMount () {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    this.setState({contacts: res.data});
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer;