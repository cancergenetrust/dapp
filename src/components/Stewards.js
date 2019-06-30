import React, {Component} from 'react'

import Steward from './Steward'

class Stewards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stewards: [],
    }
  }

  async componentWillMount() {
    const numStewards = await this.props.contract.getNumStewards()
    console.log(`Found ${numStewards} stewards`)
    const stewards = []
    for(var i=0; i < numStewards; i++) {
      const address = await this.props.contract.addresses(i)
      const ipfsHash = await this.props.contract.hashes(address)
      if (ipfsHash === "nominated") {
        console.log(`Steward ${address} nominated but no submissions yet`)
      } else {
        stewards.push({address: address, hash: ipfsHash})
      }
    }
    this.setState({ stewards })
  }

  render() {
    return (
      <div className="container">
        {this.state.stewards.map(steward =>
        <div key={steward.address}>
          <Steward ipfs={this.props.ipfs} address={steward.address} hash={steward.hash} />
        </div>
        )}
      </div>
    )
  }
}

export default Stewards
