import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDemoOffers } from '../actions/ApiActions'
import Table from '../components/Table'
import Charts from '../components/Charts'
import FilterTags from '../components/FilterTags'
import SearchBar from '../components/SearchBar'
import Statistics from '../components/Statistics'
import { Container, Divider } from 'semantic-ui-react'
import { addFilter, removeFilter } from '../actions/FilterActions'
import Filter from '../dataStructure/Filter'

class App extends Component {
    componentDidMount() {
        const { getAllOffers } = this.props
        getAllOffers()
    }

    render() {
        const { offers, loading, filters, addFilter, deleteFilter } = this.props
        return (
            <Container>
                <Divider hidden />
                <SearchBar />
                <Divider hidden />
                <FilterTags filters={filters} deleteFilter={deleteFilter} />
                <Divider hidden />
                <Statistics offers={offers} />
                <Divider hidden />
                <Charts offers={offers} addFilter={addFilter} />
                <Divider hidden />
                <Table offers={offers} loading={loading} />
            </Container>
        )
    }
}

const getFilteredOffers = (offers, filters) => {
    let filterGroup = {}
    filters.forEach(f => {
        const { value, accessor } = f
        filterGroup[accessor] = filterGroup[accessor] || {}
        filterGroup[accessor][String(value).toLocaleLowerCase()] = 1
    })
    
    return offers.filter(offer => {
        for (let accessor in filterGroup) {
            const value = String(offer[accessor]).toLowerCase()
            if (value in filterGroup[accessor]) {
                continue
            } else {
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
    addFilter: (accessor, value) => dispatch(addFilter(new Filter(accessor, value))),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App)
