import React from 'react'
import {
  Container, 
  Table,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import Loader from 'react-loader'
import StewardsContract from '../build/contracts/Stewards.json'
import getWeb3 from './getWeb3'

const truffleContract = require('truffle-contract')
const stewardsContract = truffleContract(StewardsContract)

const IPFS = require('ipfs-mini');

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
			loaded: false,
      web3: null,
      contract: null,
      address: null,
      ipfsHash: null,
      stewards: null,
    }
  }

  async componentWillMount() {
    try {
      this.setState({ web3: await getWeb3() })
      console.log(`My account: ${this.state.web3.eth.accounts[0]}`)
      this.setState({ address: this.state.web3.eth.accounts[0] })
      stewardsContract.setProvider(this.state.web3.currentProvider)

      this.setState({ contract: await stewardsContract.deployed() })
      console.log(`Stewards contract address: ${this.state.contract.address}`)

      this.setState({ ipfsHash: await this.state.contract.ipfsHashes.call(this.state.web3.eth.accounts[0]) })
      console.log(`My current hash: ${this.state.ipfsHash}`)

      const numStewards = await this.state.contract.size.call()
      console.log(`Found ${numStewards.toNumber()} stewards`)
      const stewards = []
      for(var i=0; i < numStewards.toNumber(); i++) {
        const address = await this.state.contract.addresses(i)
        const ipfsHash = await this.state.contract.ipfsHashes(address)
        stewards.push({address: address, ipfsHash: ipfsHash})
      }
      this.setState({ stewards })

      const ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});
      this.setState({ipfs: ipfs});

      this.setState({ loaded: true })
    } catch(error) {
      console.log('Web3 Error', error)
    }
  }

  render() {
    if (!this.state.loaded)
      return (<Loader/>)

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/"><img src="cgt-logo-with-name.png" alt="logo" height="28px"/></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/cancergenetrust">GitHub</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Container>
          <Table>
            <thead>
              <tr>
                <th>Ethereum Address</th>
                <th>IPFS Hash</th>
              </tr>
            </thead>
            <tbody>
              {this.state.stewards.map(steward =>
                <tr key={steward.address}>
                  <td>{steward.address}</td>
                  <td>{steward.ipfsHash}</td>
                  <td></td>
                </tr>)}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default App
