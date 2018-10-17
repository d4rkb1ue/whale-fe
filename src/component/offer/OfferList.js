import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as semantic from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
// import data from '../../api/get';
import Offer from './Offer';
import { getOffers } from '../../action';

const PAGE_SIZE = 15;

class OfferList extends Component {
    constructor(props) {
        super(props);
        this.props.getOffers();
        this.state = {
            page: 0,
        //     data: this.getDataByPage(0)
        };
        this.onPageClick = this.onPageClick.bind(this);
    }

    getDataByPage(page) {
        let getRow = (key, companyName, base, equity, signBonus, yearlyBonus) => (
            <semantic.Table.Row key={key}>
                <semantic.Table.Cell>{companyName}</semantic.Table.Cell>
                <semantic.Table.Cell>{base}</semantic.Table.Cell>
                <semantic.Table.Cell>{equity}</semantic.Table.Cell>
                <semantic.Table.Cell>{signBonus}</semantic.Table.Cell>
                <semantic.Table.Cell>{yearlyBonus}</semantic.Table.Cell>
            </semantic.Table.Row>
        );
        let ret = [];
        for (let i = 0; i < PAGE_SIZE; i++) {
            let d = this.props.offerList[i + page * PAGE_SIZE];
            if (d) {
                ret.push(getRow(i, d.CompanyName, d.BaseSalary, d.Equity, d.SignBonus, d.YearlyBonus));
            }
        }
        console.log(this.props.offerList);
        return ret;
    }

    onPageClick(page) {
        if (page < 0 || page > this.getTotalPageCount()) {
            return;
        } 
        this.setState(state => {
            return {
                page,
                data: this.getDataByPage(page)
            }
        })
    }

    getTotalPageCount() {
        return Math.ceil(this.offerList.length / PAGE_SIZE);
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
                    {this.getDataByPage(0)}
                </semantic.Table.Body>
                <semantic.Table.Footer>
                    <semantic.Table.Row>
                        <semantic.Table.HeaderCell colSpan='6'>
                            <semantic.Menu floated='right' pagination>
                                <semantic.Menu.Item as='a' icon onClick={() => this.onPageClick(this.state.page - 1)}>
                                    <semantic.Icon name='chevron left' />
                                </semantic.Menu.Item>
                                <semantic.Menu.Item as='a' selectable='true' active>{this.state.page + 1}</semantic.Menu.Item>
                                <semantic.Menu.Item as='a' selectable='true' icon onClick={() => this.onPageClick(this.state.page + 1)}>
                                    <semantic.Icon name='chevron right' />
                                </semantic.Menu.Item>
                            </semantic.Menu>
                        </semantic.Table.HeaderCell>
                    </semantic.Table.Row>
                </semantic.Table.Footer>
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
