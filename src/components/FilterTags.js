import React, { Component } from 'react'
import FilterTag from './FilterTag'

export default class FilterTags extends Component {
    render() {
        const { filters, deleteFilter } = this.props
        return (
            <div>
                {filters.map((filter, idx) => 
                    <FilterTag 
                        key={idx}
                        {...filter}
                        onClick={() => deleteFilter(filter.id)}
                    />
                )}
            </div>
        )
    }
}
