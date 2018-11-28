import React, { Component } from 'react'
import ReactTable from "react-table"
import { Button } from 'semantic-ui-react'
import "react-table/react-table.css"
import { OFFER_HEADER, OFFER_HEADER_CHOICES, DEFAULT_OFFER_PAGESIZE } from '../constants/config'

export default class Table extends Component {
    // use arrow function to avoid scope problem without useing .bind()
    renderCustomCell = (accessor, obj) => {
        let idx = OFFER_HEADER.findIndex(val => val.accessor === accessor)
        OFFER_HEADER[idx] = {
            ...OFFER_HEADER[idx],
            ...obj
        }
    }

    customURL = () => {
        // make url as button
        const urlBotton = url => (
            <Button
                fluid
                icon='world'
                size='mini'
                onClick={() => window.open(url, '_blank')} />
        )
        const URL_BUTTON_WIDTH = 50
        this.renderCustomCell('url', {
            Cell: u => urlBotton(u.value),
            maxWidth: URL_BUTTON_WIDTH
        })
    }

    customSeason = () => {
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
        this.renderCustomCell('season', {
            Cell: ({ value }) => month2season(value),
            filterMethod
        })
    }

    render() {
        const { offers, loading } = this.props
        this.customURL()
        this.customSeason()

        return (
            <ReactTable
                data={offers}
                columns={OFFER_HEADER}
                loading={loading.isLoading}
                defaultPageSize={DEFAULT_OFFER_PAGESIZE}
                showPageSizeOptions={false}
                className="-striped -highlight"
            />
        )
    }
}
