import React, {Component} from 'react'
import {
  Container, 
  Table,
} from 'reactstrap'

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
      <Container>
        <Table>
          <thead>
            <tr>
              <th>Domain</th>
              <th>Ethereum Address</th>
              <th># Submissions</th>
              <th>IPFS Hash</th>
            </tr>
          </thead>
          <tbody>
            {this.state.stewards.map(steward =>
              <tr key={steward.address}>
                <td>{steward.index.domain}</td>
                <td>{steward.address}</td>
                <td>{steward.index.submissions.length}</td>
                <td>{steward.ipfsHash}</td>
                <td></td>
              </tr>)}
          </tbody>
        </Table>
      </Container>
    )
  }
}

export default Stewards
