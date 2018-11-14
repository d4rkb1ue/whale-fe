import React, { Component } from 'react'
import ReactTable from "react-table"
import "react-table/react-table.css"

export default class Table extends Component {
    render() {
        const { offers, headers, loading } = this.props
        console.log(loading)
        return (
            <ReactTable
                data={offers}
                columns={headers}
                loading={loading.isLoading}
                defaultPageSize={20}
                className="-striped -highlight"
            />
        )
    }
}
