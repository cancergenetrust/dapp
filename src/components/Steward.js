import React, {Component} from 'react'
import Loader from 'react-loader'
import { Link } from 'react-router-dom'

class Steward extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: null,
      patients: {},
    }
  }

  async componentWillMount() {
    this.setState({index: JSON.parse(await this.props.ipfs.files.cat(this.props.hash))})

    var patients = {}
    for (var i = 0; i < this.state.index.submissions.length; i++) {
      const response = await this.props.ipfs.files.cat(this.state.index.submissions[i])
      const submission = {...await JSON.parse(response), hash: this.state.index.submissions[i]}

      if (!(submission["cgt_id"] in patients)) patients[submission["cgt_id"]] = []
      patients[submission["cgt_id"]].push(submission)
      this.setState({patients: patients})
    }
  }

  render() {
    if (!this.state.index) return (<Loader />)

    return (
      <div className="card">
        <div className="card-header">
          <h3>{this.state.index.domain}</h3>
          <h6>Ethereum Address:&nbsp;
            <a href={`https://rinkeby.etherscan.io/address/${this.props.address}`}
              target="_blank">{this.props.address}</a>
          </h6>
          <h6>IPFS Hash:&nbsp;
            <a href={`https://ipfs.infura.io/ipfs/${this.props.hash}`} target="_blank">{this.props.hash}</a>
          </h6>
        </div>
        <ul className="list-group list-group-flush">
          <div className="card-body">
          {Object.keys(this.state.patients).map(key =>
            <li key={key} className="list-group-item d-flex justify-content-between align-items-center">
              Patient {key.slice(0,8)}
              <div>
              {this.state.patients[key].map(submission =>
                  <Link key={submission.hash} to={`/submissions/${submission.hash}`}>
                    <span className="badge badge-primary badge-pill float-right ml-2">
                        {submission.files.length} 
                        {submission.files[0].name.endsWith('.vcf') && " Genomic (VCF)"}
                        {submission.files[0].name.endsWith('.dcm') && " Imaging (DICOM)"}
                        {submission.files[0].name === 'foundationone.json' && " Genomic (Foundation)"}
                    </span>
                  </Link>
              )}
              </div>
            </li>
          )}
          </div>
        </ul>
      </div>
    )
  }
}

export default Steward
