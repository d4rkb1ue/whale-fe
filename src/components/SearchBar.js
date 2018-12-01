import React, { Component } from 'react'
import { Menu, Input } from 'semantic-ui-react'

export default class SearchBar extends Component {
    render() {
        return (
            <Menu>
                <Menu.Item>
                    {/* TODO Search with dynamic selection company and area */}
                    <Input icon='search' placeholder='Company or Area' />
                </Menu.Item>
            </Menu>

        )
    }
}