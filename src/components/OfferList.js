import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import OfferItem from './OfferItem';
import { OFFER_TITLE } from '../constants/config'

export default class OfferList extends Component {
    createTable(offers, rows, placeholderNum) {
        let ret = offers.map((item, i) =>
            <OfferItem
                key={i.toString()}
                offer={item}
                placeholder={false}
                titles={rows}
            />
        )
        for (let i = 0; i < placeholderNum; i++) {
            ret.push(
                <OfferItem
                    key={'ph' + i}
                    titles={rows}
                    placeholder={true}
                />
            )
        }
        return ret
    }

    render() {
        const { offers, loading } = this.props
        let headers = [], rows = []
        for (let i in OFFER_TITLE) {
            headers.push(<Table.HeaderCell key={i}>{i}</Table.HeaderCell>)
            rows.push(OFFER_TITLE[i])
        }

        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        {headers}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.createTable(offers, rows, loading.placeholderNum)}
                </Table.Body>
            </Table>
        );
    }
}
