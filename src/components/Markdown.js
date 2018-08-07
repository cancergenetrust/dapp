import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'

export default class Markdown extends Component {

  state = {
    markdown: '',
  }

  componentDidMount() {
    this._loadMarkdown(this.props.match.params.name)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.name !== nextProps.match.params.name) {
      this.setState({ markdown: '' })
      this._loadMarkdown(nextProps.match.params.name)
    }
  }

  _loadMarkdown(name) {
    console.log(`Loading /docs/${name}.md`)
    fetch(`/docs/${name}.md`)
      .then(response => response.text())
      .then(markdown => this.setState({ markdown }))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="container">
        <ReactMarkdown source={this.state.markdown} />
      </div>
    )
  }
}
