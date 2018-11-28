import React, { Component } from 'react'
import FilterTag from './FilterTag'
import { Label } from 'semantic-ui-react'

export default class FilterTags extends Component {
    render() {
        const { filters, deleteFilter } = this.props
        return filters.length ? (
            <div>
                {filters.map((filter, idx) => 
                    <FilterTag 
                        key={idx}
                        {...filter}
                        onClick={() => deleteFilter(filter.id)}
                    />
                )}
            </div>
        ) : <Label icon='circle' content='all' />
    }
}
