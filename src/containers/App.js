import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDemoOffers, getFilteredByDegreeOffers } from '../actions'
import { Dropdown } from 'semantic-ui-react'
import OfferList from '../components/OfferList'

class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getDemoOffers())
    }

    render() {
        const { offers, loading } = this.props
        const filterOptions = [ 
            { key: 'degree_bachelor', value: 'bachelor', flag: 'af', text: 'bachelor degree' },
            { key: 'degree_master', value: 'master', flag: 'af', text: 'master degree' },
            { key: 'degree_phd', value: 'phd', flag: 'af', text: 'phd degree' } ];
        return (
            <div>
                <OfferList
                    offers={offers}
                    loading={loading}
                />
                <Dropdown 
                    placeholder='Filter by ...' 
                    fluid 
                    search 
                    selection 
                    options={filterOptions} 
                    onChange={(e, { value }) => {this.props.dispatch(getFilteredByDegreeOffers(value))}} />
            </div>
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
