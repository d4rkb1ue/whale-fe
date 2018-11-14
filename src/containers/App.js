import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDemoOffers } from '../actions'
import Table from '../components/Table'
import { OFFER_HEADER } from '../constants/config'
import { Container } from 'semantic-ui-react'

class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getDemoOffers())
    }

    render() {
        const { offers, loading } = this.props
        return (
            <Container fluid>
                <Table
                    offers={offers}
                    headers={OFFER_HEADER}
                    loading={loading}
                />
            </Container>
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
