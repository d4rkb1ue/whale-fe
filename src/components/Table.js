import React, { Component } from 'react'
import ReactTable from "react-table"
import { Button } from 'semantic-ui-react'
import "react-table/react-table.css"
import { OFFER_HEADER_CHOICES, DEFAULT_OFFER_PAGESIZE } from '../constants/config'

export default class Table extends Component {
    // use arrow function to avoid scope problem without useing .bind()
    renderCustomCell = (headers, accessor, obj) => {
        let idx = headers.findIndex(val => val.accessor === accessor)
        headers[idx] = {
            ...headers[idx],
            ...obj
        }
    }

    customURL = (headers) => {
        // make url as button
        const urlBotton = url => (
            <Button
                fluid
                icon='world'
                size='mini'
                onClick={() => window.open(url, '_blank')} />
        )
        const URL_BUTTON_WIDTH = 50
        this.renderCustomCell(headers, 'url', {
            Cell: u => urlBotton(u.value),
            maxWidth: URL_BUTTON_WIDTH
        })
    }

    customSeason = (headers) => {
        // translate month value '1-12' to spring/summer/fall/winter
        const choice = OFFER_HEADER_CHOICES['season']
        if (!choice) { return }
        const month2season = (value) => {
            if (!value) { return }
            let res = choice.find(s => s.value === value)
            return res && res.text
        }
        
        const filterMethod = (filter, row) => {
            const accessor = filter.id
            if (!row[accessor]) {
                return false
            }
            const value = filter.value.toLowerCase()
            return String(month2season(row[accessor])).toLowerCase().indexOf(value) > -1
        }
        this.renderCustomCell(headers, 'season', {
            Cell: ({ value }) => month2season(value),
            filterMethod
        })
        
        // TODO: use semantic-ui will get wrong z-index
        // const selector = (onChange) => (
        //     <Container fluid>
        //         <Dropdown
        //             placeholder='Season'
        //             fluid
        //             multiple
        //             search
        //             selection
        //             options={choice}
        //             onChange={event => onChange(event.target.value)} />
        //     </Container>
        // )
        // const selector = (onChange) => (
        //     <select
        //         onChange={event => onChange(event.target.value)}
        //         style={{ width: "100%" }}
        //     >
        //         <option value="all">Show All</option>
        //         <option value="true">Can Drink</option>
        //         <option value="false">Can't Drink</option>
        //     </select>
        // )
        // this.renderCustomCell(headers, 'season', 'Filter', ({ filter, onChange }) => selector(onChange))

    }

    render() {
        const { offers, headers, loading } = this.props
        this.customURL(headers)
        this.customSeason(headers)
        const defaultFilter = (filter, row) => {
            const accessor = filter.id
            if (!row[accessor]) {
                return false
            }
            const value = filter.value.toLowerCase()
            return String(row[accessor]).toLowerCase().indexOf(value) > -1
        }

        return (
            <ReactTable
                data={offers}
                columns={headers}
                loading={loading.isLoading}
                defaultPageSize={DEFAULT_OFFER_PAGESIZE}
                showPageSizeOptions={false}
                filterable={true}
                defaultFilterMethod={defaultFilter}
                className="-striped -highlight"
            />
        )
    }
}
