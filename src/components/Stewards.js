import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class Stewards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stewards: [],
    }
  }

  async componentWillMount() {
    const numStewards = await this.props.contract.size.call()
    console.log(`Found ${numStewards.toNumber()} stewards`)
    const stewards = []
    for(var i=0; i < numStewards.toNumber(); i++) {
      const address = await this.props.contract.addresses(i)
      const ipfsHash = await this.props.contract.ipfsHashes(address)
      const index = JSON.parse(await this.props.ipfs.files.cat(ipfsHash))

      stewards.push({address: address, ipfsHash: ipfsHash, index: index})
    }
    this.setState({ stewards })
  }

  render() {
    return (
      <div>
        {this.state.stewards.map(steward =>
        <div className="card" key={steward.address}>
          <div className="card-header">
            <h3>{steward.index.domain}</h3>
            <h6>Ethereum Address:&nbsp;
              <a href={`https://rinkeby.etherscan.io/address/${steward.address}`}
                target="_blank">{steward.address}</a>
            </h6>
            <h6>IPFS Hash:&nbsp;
              <a href={`https://ipfs.io/ipfs/${steward.ipfsHash}`} target="_blank">{steward.ipfsHash}</a>
            </h6>
          </div>
          <ul className="list-group list-group-flush">
          {steward.index.submissions.map(hash =>
            <li key={hash} className="list-group-item"><Link to={`/submissions/${hash}`}>{hash}</Link></li>
          )}
          </ul>
        </div>
        )}
      </div>
    )
  }
}

export default Stewards
