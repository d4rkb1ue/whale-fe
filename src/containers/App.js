import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRecentOffers } from '../actions'
import OfferList from '../components/OfferList'

class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getRecentOffers())
    }
    
    render() {
        const { offers } = this.props
        return (
            <OfferList offers={offers} />
        )
    }
}

const mapStateToProps = state => {
    const { offers } = state
    return {
        offers: offers.offers,
    }
}

export default connect(mapStateToProps)(App)
