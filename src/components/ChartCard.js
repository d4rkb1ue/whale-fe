import React, { Component } from 'react'
import { GridColumn, Card } from 'semantic-ui-react'

export default class ChartCard extends Component {
    render() {
        const { color, header, chart } = this.props
        return (
            <GridColumn>
                <Card fluid color={color}>
                    <Card.Content header={header} />
                    {chart}
                </Card>
            </GridColumn>
        )
    }

}
