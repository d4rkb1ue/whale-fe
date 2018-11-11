import React, { Component } from 'react';
import * as semantic from 'semantic-ui-react';
import OfferItem from './OfferItem';

export default class OfferList extends Component {
    createTable(offers) {
        return offers.map((item, i) => 
            <OfferItem
                key={i}
                offer={item}
            />
        )
    }

    render() {
        const { offers } = this.props
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
                    {this.createTable(offers)}
                </semantic.Table.Body>
            </semantic.Table>
        );
    }
}
