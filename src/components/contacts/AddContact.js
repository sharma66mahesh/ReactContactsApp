import React, { Component } from 'react';
import { Consumer } from '../../context';
import uuid from 'uuid';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';


class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}  //populate this, if empty input fields
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
    //if key and value have same names, we can write only once
    const newContact = {
      name,
      email,
      phone
    };

    //posting to the uri returns just id. We add the new contact information from form.
    // axios.post('https://jsonplaceholder.typicode.com/users', newContact)
    //   .then(res => dispatch({type: 'ADD_CONTACT', payload: res.data}));

    //above code using async await
    const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);
    dispatch({type:'ADD_CONTACT', payload: res.data});

    //clear the fields after submit button is pressed
    this.setState({
      name:'',
      email:'',
      phone:''
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
            <div className="card-header">Add Contact</div>
    
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

                <input type="submit" value="Add Contact" className="btn btn-light btn-block" />

              </form>
            </div>
          </div>

          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;