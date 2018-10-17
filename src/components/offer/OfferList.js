import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as semantic from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Offer from './Offer';
import { getOffers } from '../../actions';

class OfferList extends Component {
    constructor(props) {
        super(props);
        this.props.getOffers();
    }

    createTable(offers) {
        return offers.map((item, i) => 
            <Offer
                key={i}
                companyName={item.CompanyName}
                base={item.BaseSalary}
                equity={item.Equity}
                signBonus={item.SignBonus}
                yearlyBonus={item.YearlyBonus}
            />
        )
    }

    render() {
        return (
            <semantic.Table>
                <semantic.Table.Header>
                    <semantic.Table.Row>
                        <semantic.Table.HeaderCell>CompanyName</semantic.Table.HeaderCell>
                        <semantic.Table.HeaderCell>Base</semantic.Table.HeaderCell>
                        <semantic.Table.HeaderCell>Equity</semantic.Table.HeaderCell>
                        <semantic.Table.HeaderCell>SignBonus</semantic.Table.HeaderCell>
                        <semantic.Table.HeaderCell>YearlyBonus</semantic.Table.HeaderCell>
                    </semantic.Table.Row>
                </semantic.Table.Header>
                <semantic.Table.Body>
                    {this.createTable(this.props.offerList)}
                </semantic.Table.Body>
            </semantic.Table>
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
})(OfferList);
