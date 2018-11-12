import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDemoOffers } from '../actions'
import OfferList from '../components/OfferList'

class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getDemoOffers())
    }

    render() {
        const { offers, loading } = this.props
        return (
            <OfferList
                offers={offers}
                loading={loading}
            />
        )
    }
}

const mapStateToProps = state => {
    const { offers, loading } = state.offers
    return {
        offers,
        loading,
    }
}

export default connect(mapStateToProps)(App)
