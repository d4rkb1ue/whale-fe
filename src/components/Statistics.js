import React, { Component } from 'react'
import { Statistic } from 'semantic-ui-react'
import { getAvg } from '../utils'

export default class Statistics extends Component {
    makeStat = (value, label, key) => (
        <Statistic key={key}>
            <Statistic.Value>{value}</Statistic.Value>
            <Statistic.Label>{label}</Statistic.Label>
        </Statistic>
    )

    render() {
        const { offers } = this.props
        const stat = [
            {
                value: offers.length,
                label: 'Offers'
            },
            {
                value: Math.round(getAvg(offers)/1000) + 'k',
                label: 'Average Base'
            },
        ]
        return (
            <div>
                <Statistic.Group>
                    {stat.map((s, idx) => this.makeStat(s.value, s.label, idx))}
                </Statistic.Group>
            </div>
        )
    }
}
