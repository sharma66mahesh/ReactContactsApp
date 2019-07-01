import React, { Component } from 'react';
import { Consumer } from '../../context';
import uuid from 'uuid';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';


class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}  //populate this, if empty input fields
  }

  async componentDidMount () {
    //get id from the url
    const { id } = this.props.match.params;

    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

    const contact = res.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });

  }

  onChange = e =>{
    // console.log(e.target);
    this.setState({[e.target.name]: e.target.value});
  };

  onSubmit = async (dispatch,e) => {
    e.preventDefault();   //don't want to submit to a file (which is by default)
    // console.log(this.state);
    const { name, email, phone } = this.state;

    if (name === ''){
      this.setState({errors: {name: "Name is required"}});
      return;
    }

    if (email === ''){
      this.setState({errors: {email: "Email is required"}});
      return;
    }

    if (phone === ''){
      this.setState({errors: {phone: "Phone is required"}});
      return;
    }
    
    const updContact = {
      name,
      email,
      phone
    };

    //get the id from url
    const {id} = this.props.match.params;

    const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updContact);
    
    dispatch({type:'UPDATE_CONTACT', payload: res.data});

    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });
    this.props.history.push('/');
  }

  render () {
    const { name, email, phone, errors } = this.state;
    
    return (
      <Consumer>
        {value =>{
          const {dispatch} = value;
          return(
            <div className="card mb-3">
            <div className="card-header">Update Contact</div>
    
            <div className="card-body">
              <form onSubmit={this.onSubmit.bind(this, dispatch)}>

                <TextInputGroup
                  label="Name"
                  name="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={this.onChange}
                  error={errors.name}
                />

                <TextInputGroup
                  label="Email"
                  name="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={this.onChange}
                  error=  {errors.email}
                />

                <TextInputGroup
                  label="Phone"
                  name="phone"
                  placeholder="Enter Phone"
                  value={phone}
                  onChange={this.onChange}
                  error={errors.phone}
                />

                <input type="submit" value="Update Contact" className="btn btn-light btn-block" />

              </form>
            </div>
          </div>

          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;