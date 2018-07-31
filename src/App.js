import React, {Component} from 'react'
import Loader from 'react-loader'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Stewards from './components/Stewards'
import Submission from './components/Submission'

import StewardsContract from '../build/contracts/Stewards.json'
import getWeb3 from './getWeb3'

const truffleContract = require('truffle-contract')
const stewardsContract = truffleContract(StewardsContract)

const IPFS = require('ipfs-api');

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
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

      this.setState({ ipfs: IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) })

      this.setState({ loaded: true })
    } catch(error) {
      console.log('Web3 Error', error)
    }
  }

  render() {
    if (!this.state.loaded) return (<Loader />)

    return (
      <div>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/stewards">Stewards</Link>
              </li>
            </ul>

            <Switch>
              <Route path="/stewards" render={props => 
                  <Stewards {...props} contract={this.state.contract} ipfs={this.state.ipfs} />}
              />
              <Route path="/submission/:hash" render={props => 
                  <Submission {...props} ipfs={this.state.ipfs} />}
              />
							<Route component={Home} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App
