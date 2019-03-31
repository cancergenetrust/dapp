import React, {Component} from 'react'
import Loader from 'react-loader'

class Submission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submission: null,
    }
  }

  async componentWillMount() {
    const submission = JSON.parse(await this.props.ipfs.files.cat(this.props.match.params.hash))
    this.setState({ submission })
  }

  render() {
    if (!this.state.submission) return (<Loader />)
    return (
      <div>

        <div className="card">
          <div className="card-header">
            <h6>IPFS Hash:&nbsp;
              <a href={`https://ipfs.infura.io/ipfs/${this.props.match.params.hash}`}
                target="_blank" rel="noopener noreferrer">{this.props.match.params.hash}</a>
            </h6>
            <h6>Patient Public ID: {this.state.submission.publicId}</h6>
            {"daysFromBirth" in this.state.submission && 
                <h6>Days From Birth: {this.state.submission.daysFromBirth}</h6>}
          </div>

          <ul className="list-group list-group-flush" style={{overflowY: 'auto'}}>
          {this.state.submission.files.map(file =>
            <li key={file.multihash} className="list-group-item">
              <a target="_blank" rel="noopener noreferrer"
                href={this.props.ipfsURL + file.multihash}>{file.name}</a>
              {file.name.endsWith('.vcf') &&
              <a className="font-weight-bold m-r-8" target="_blank" rel="noopener noreferrer"
                href={"http://genome.ucsc.edu/cgi-bin/hgTracks?hgt.customText="
                  + encodeURIComponent(this.props.ipfsURL) + file.multihash}>&nbsp;View In Browser</a>
              }
              {file.name.endsWith('.dcm') &&
              <a className="font-weight-bold m-r-8" target="_blank" rel="noopener noreferrer"
                href={"https://ivmartel.github.io/dwv-jqmobile/demo/stable/index.html?input="
                  + encodeURIComponent(this.props.ipfsURL) + file.multihash}>&nbsp;View</a>
              }
            </li>
          )}
          </ul>
        </div>
      </div>
    )
  }
}

export default Submission
