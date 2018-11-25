import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDemoOffers } from '../actions'
import Table from '../components/Table'
import Chart from '../components/Chart'
import { OFFER_HEADER } from '../constants/config'
import { Container, Divider, Header } from 'semantic-ui-react'

class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getDemoOffers())
    }

    render() {
        const { offers, loading } = this.props
        return (
            <Container>
            <Header as='h1'>
                Statistics
            </Header>
            <Chart 
                offers={offers}
            />
            <Header as='h1'>
                List
            </Header>
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
