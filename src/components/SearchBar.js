import React, { Component } from 'react'
import { Menu, Label, Input } from 'semantic-ui-react'

export default class SearchBar extends Component {
    render() {
        return (
            <Menu>
                <Menu.Item>
                    {/* TODO Search with dynamic selection company */}
                    <Input icon='search' placeholder='Company' />
                </Menu.Item>
            </Menu>

        )
    }
}