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
          Files
          </div>
          <ul className="list-group list-group-flush" style={{height: '100px', overflowY: 'auto'}}>
          {this.state.submission.files.map(file =>
            <li key={file.multihash} className="list-group-item">
              <a href={`https://ipfs.io/ipfs/${file.multihash}`}>{file.name}</a>
              {file.name.endsWith('.vcf') &&
              <a className="font-weight-bold m-r-8" target="_blank"
                href={"http://genome.ucsc.edu/cgi-bin/hgTracks?hgt.customText="
                  + "https://ipfs.io/ipfs/" + file.multihash}>&nbsp;View In Browser</a>
              }
              {file.name.endsWith('.dcm') &&
              <a className="font-weight-bold m-r-8" target="_blank"
                href={"https://ivmartel.github.io/dwv-jqmobile/demo/stable/index.html?input="
                  + encodeURIComponent("https://ipfs.io/ipfs/") + file.multihash}>&nbsp;View</a>
              }
            </li>
          )}
          </ul>
        </div>
        <div className="card">
          <div className="card-header">
          Fields
          </div>
          <ul className="list-group list-group-flush">
          {Object.keys(this.state.submission.fields).map(key =>
            <li key={key} className="list-group-item">
              {key.charAt(0).toUpperCase() + key.slice(1)}: {this.state.submission.fields[key]}
            </li>
          )}
          </ul>
        </div>
      </div>
    )
  }
}

export default Submission
