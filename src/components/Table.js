import React, { Component } from 'react'
import ReactTable from "react-table"
import { Button } from 'semantic-ui-react'
import "react-table/react-table.css"

export default class Table extends Component {
    // use arrow function to avoid scope problem without useing .bind()
    renderCustomCell = (headers, accessor, key, value) => {
        headers.forEach(h => {
            if (h.accessor === accessor) {
                h[key] = value
            }
        })
    }
    render() {
        const { offers, headers, loading } = this.props
        const urlBotton = url => (
            <Button
                className='full-width'
                icon='world'
                size='mini'
                onClick={() => window.open(url, '_blank')} />
        )
        this.renderCustomCell(headers, 'url', 'Cell', u => urlBotton(u.value))
        this.renderCustomCell(headers, 'url', 'maxWidth', 50)
        const filter = (filter, row) => {
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
                defaultPageSize={20}
                showPageSizeOptions={false}
                filterable={true}
                defaultFilterMethod={filter}
                className="-striped -highlight"
            />
        )
    }
}
