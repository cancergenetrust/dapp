import React, {Component} from 'react'
import Loader from 'react-loader'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'

import Stewards from './components/Stewards'
import Submission from './components/Submission'

import StewardsContract from '../build/contracts/Stewards.json'
import getWeb3 from './getWeb3'

const truffleContract = require('truffle-contract')
const stewardsContract = truffleContract(StewardsContract)

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

class App extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)

    this.state = {
      isOpen: false,
			loaded: false,
      web3: null,
      contract: null,
      ipfs: null,
    }
  }

  async componentWillMount() {
    try {
      this.setState({ web3: await getWeb3() })
      console.log(`My account: ${this.state.web3.eth.accounts[0]}`)
      stewardsContract.setProvider(this.state.web3.currentProvider)

      this.setState({ contract: await stewardsContract.deployed() })
      console.log(`Stewards contract address: ${this.state.contract.address}`)

      this.setState({ ipfs: window.IpfsApi({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) })

      this.setState({ loaded: true })
    } catch(error) {
      console.log('Web3 Error', error)
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  render() {
    if (!this.state.loaded) return (<Loader />)

    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand tag={Link} to="/">
              <img src="cgt-logo-with-name.png" alt="logo" height="28px" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="https://github.com/cancergenetrust" target="_blank">
                    <img src="github.png" alt="github" height="28px" />
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <Switch>
            <Route exact path="/" render={props => 
                <Stewards {...props} contract={this.state.contract} ipfs={this.state.ipfs} />}
            />
            <Route path="/submissions/:hash" render={props => 
                <Submission {...props} ipfs={this.state.ipfs} />}
            />
            <Route path="/about" component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
