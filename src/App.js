import React, {Component} from 'react'
import Loader from 'react-loader'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import Markdown from './components/Markdown'

import Stewards from './components/Stewards'
import Submission from './components/Submission'

import StewardsContract from '../build/contracts/Stewards.json'
import getWeb3 from './getWeb3'

const truffleContract = require('truffle-contract')
const stewardsContract = truffleContract(StewardsContract)


class   App extends Component {
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
      console.log(`Your account: ${this.state.web3.eth.accounts[0]}`)
      stewardsContract.setProvider(this.state.web3.currentProvider)

      this.setState({ contract: await stewardsContract.deployed() })
      console.log(`Stewards contract address: ${this.state.contract.address}`)

      this.setState({ ipfs: window.IpfsApi({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) })

      this.setState({ loaded: true })
    } catch(error) {
      console.log('Web3 Error', error)
      alert("Unable to load contract, are you on the Rinkeby Test Network?")
    }
  }

  render() {
    if (!this.state.loaded) return (<Loader />)

    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="nav-link" to="/">
              <img src="/cgt-logo-with-name.png" height="30" alt="Cancer Gene Trust"></img>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
              data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/docs/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/docs/faq">FAQ</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/docs/resources">Resources</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
            <Route exact path="/" render={props => 
                <Stewards {...props} contract={this.state.contract} ipfs={this.state.ipfs} />}
            />
            <Route path="/submissions/:hash" render={props => 
                <Submission {...props} ipfs={this.state.ipfs} />}
            />
            <Route path="/docs/:name" component={Markdown} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
