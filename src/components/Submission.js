import React, {Component} from 'react'
import Loader from 'react-loader'
import {
  Container, 
  ListGroup,
  ListGroupItem,
} from 'reactstrap'

class Submission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submission: null,
    }
  }

  async componentWillMount() {
		console.log(this.props.match.params.hash)
    const submission = JSON.parse(await this.props.ipfs.files.cat(this.props.match.params.hash))
    this.setState({ submission })
  }

  render() {
    if (!this.state.submission) return (<Loader />)
    return (
      <Container>
        <ListGroup>
        {this.state.submission.files.map(file =>
          <ListGroupItem key={file.multihash}>{file.name}</ListGroupItem>
        )}
        </ListGroup>
      </Container>
    )
  }
}

export default Submission
