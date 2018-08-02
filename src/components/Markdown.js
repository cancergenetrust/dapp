import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

export default class Markdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: `${this.props.match.path.slice(1)}.md`,
      markdown: '',
    };
  }

  componentDidMount() {
    fetch(this.state.path)
      .then(response => response.text())
      .then(markdown => this.setState({ markdown }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="container">
        <ReactMarkdown source={this.state.markdown} />
      </div>
    );
  }
}
