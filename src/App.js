import React, { Component } from 'react';
import './App.css';
import * as semantic from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import data from './api/get';

const PAGE_SIZE = 15;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            data: this.getDataByPage(0)
        };
        this.onNextPageClick = this.onNextPageClick.bind(this);
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
            let d = data[i + page * PAGE_SIZE];
            ret.push(getRow(i, d.CompanyName, d.BaseSalary, d.Equity, d.SignBonus, d.YearlyBonus));
        }
        return ret;
    }
    onNextPageClick() {
        this.setState(state => {
            let np = state.page + 1;
            return {
                page: np,
                data: this.getDataByPage(np)
            }
        })
    }
    onPreviousPageClick() {
        console.warn('previous')
    }
    getTotalPageCount() {
        return Math.ceil(data.length / PAGE_SIZE);
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
                    {this.state.data}
                </semantic.Table.Body>
                <semantic.Table.Footer>
                    <semantic.Table.Row>
                        <semantic.Table.HeaderCell colSpan='6'>
                            <semantic.Menu floated='right' pagination>
                                <semantic.Menu.Item as='a' icon>
                                    <semantic.Icon name='chevron left' />
                                </semantic.Menu.Item>
                                <semantic.Menu.Item as='a' selectable='true' active>{this.state.page + 1}</semantic.Menu.Item>
                                <semantic.Menu.Item as='a' selectable='true' icon onClick={this.onNextPageClick}>
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

export default App;
