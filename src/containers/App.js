import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDemoOffers } from '../actions/ApiActions'

import Table from '../components/Table'
import Chart from '../components/Chart'
import { Container, Divider } from 'semantic-ui-react'

class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getDemoOffers())
    }

    render() {
        const { offers, loading } = this.props
        return (
            <Container>
                <Divider hidden />
                <Chart offers={offers} />
                <Divider hidden />
                <Table offers={offers} loading={loading} />
            </Container>
        )
    }
}

const getFilteredOffers = (offers, filters) => {
    // TODO
    return offers.filter(offer => offer.company_name === 'Google')
}

const mapStateToProps = state => {
    const { offers, filters } = state
    return {
        offers: getFilteredOffers(offers.offers, filters),
        loading: offers.loading
    }
}

export default connect(
    mapStateToProps,
)(App)
