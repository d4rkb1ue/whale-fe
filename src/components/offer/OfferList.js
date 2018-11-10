import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import Offer from './Offer';
import { getOffers, getFilteredOffers } from '../../actions';

class OfferList extends Component {
    constructor(props) {
        super(props);
        this.props.getOffers();
    }

    createTable(offers) {
        return offers.map((item, i) => 
            <Offer
                key={i}
                offer={item}
            />
        )
    }


    render() {
    const filterOptions = [ 
        { key: 'degree_bachelor', value: 'by_degree=bachelor', flag: 'af', text: 'bachelor degree' },
        { key: 'degree_master', value: 'by_degree=master', flag: 'af', text: 'master degree' },
        { key: 'degree_phd', value: 'by_degree=phd', flag: 'af', text: 'phd degree' } ];
        return (
            <div>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>CompanyName</Table.HeaderCell>
                            <Table.HeaderCell>Base</Table.HeaderCell>
                            <Table.HeaderCell>Equity</Table.HeaderCell>
                            <Table.HeaderCell>SignBonus</Table.HeaderCell>
                            <Table.HeaderCell>YearlyBonus</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.createTable(this.props.offerList)}
                    </Table.Body>
                </Table>
                <Dropdown 
                    placeholder='Filter by ...' 
                    fluid 
                    search 
                    selection 
                    options={filterOptions} 
                    onChange={(e, { value }) => {console.log(value); this.props.getFilteredOffers(value)}} />
            </div>
        );
    }
}

const mapStateToProps = ({ offer }) => {
    return {
        offerList: offer.offerList
    };
};


export default connect(mapStateToProps, {
    getOffers,
    getFilteredOffers
})(OfferList);
