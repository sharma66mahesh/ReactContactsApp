import React, {Component} from 'react';

class Test extends Component {
  state = {
    title: '',
    body: ''
  };

  componentDidMount () {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(data => {
        this.setState({title: data.title, body: data.body});
      })
  }

  render() {
    const {title, body} = this.state;
    return (
      <div>
        <div>Title: {title}</div>
        <div>Body: {body}</div>
      </div>
    );
  }
}

export default Test;