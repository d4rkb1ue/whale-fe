import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDemoOffers } from '../actions/ApiActions'
import Table from '../components/Table'
import Charts from '../components/Charts'
import FilterTags from '../components/FilterTags'
import SearchBar from '../components/SearchBar'
import { Container, Divider } from 'semantic-ui-react'
import { removeFilter } from '../actions/FilterActions';

class App extends Component {
    componentDidMount() {
        const { getAllOffers } = this.props
        getAllOffers()
    }

    render() {
        const { offers, loading, filters, deleteFilter } = this.props
        return (
            <Container>
                <Divider hidden />
                <SearchBar />
                <Divider hidden />
                <FilterTags filters={filters} deleteFilter={deleteFilter} />
                <Divider hidden />
                <Charts offers={offers} />
                <Divider hidden />
                <Table offers={offers} loading={loading} />
            </Container>
        )
    }
}

const getFilteredOffers = (offers, filters) => {
    // TODO: search with mulitiple filters/values
    return offers.filter(offer => {
        for (let i = 0; i < filters.length; i++) {
            const { value, accessor } = filters[i]
            if (value.toLowerCase() !== offer[accessor].toLowerCase()) {
                return false
            }
        }
        return true
    })
}

const mapStateToProps = state => {
    const { offers, filters } = state
    return {
        offers: getFilteredOffers(offers.offers, filters),
        loading: offers.loading,
        filters
    }
}

const mapDispatchToProps = dispatch => ({
    deleteFilter: id => dispatch(removeFilter(id)),
    getAllOffers: () => dispatch(getDemoOffers()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App)
