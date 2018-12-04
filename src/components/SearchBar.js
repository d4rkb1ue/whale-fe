import React, { Component } from 'react'
import { Menu, Search } from 'semantic-ui-react'
import FilterTag from './FilterTag'

export default class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            result: [],
        }
    }

    onResultSelect = (e, { result }) => {
        const { addFilter } = this.props
        this.setState({
            value: '',
        })
        addFilter('company_name', result.title)
    }

    onSearchChange = (e, { value }) => {
        this.setState({ value })
        value = value.toLocaleLowerCase()
        let companies = this.props.companies.filter(com => com.toLocaleLowerCase().indexOf(value) > -1)
        this.setState({
            result: companies.map(title => ({ title })),
        })
    }

    resultRenderer = ({title}) => {
        const tag = new FilterTag({
            accessor: 'company_name',
            value: title,
        })
        return tag.render()
    }

    render() {
        return (
            <Menu>
                <Menu.Item>
                    <Search
                        value={this.state.value}
                        onResultSelect={this.onResultSelect}
                        onSearchChange={this.onSearchChange}
                        results={this.state.result}
                        resultRenderer={this.resultRenderer}
                        selectFirstResult={true}
                    />
                </Menu.Item>
            </Menu>

        )
    }
}