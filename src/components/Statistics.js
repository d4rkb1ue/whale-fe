import React, { Component } from 'react'
import { Statistic } from 'semantic-ui-react'
import { getAvg, getOfferCountByLocation } from '../utils'
import { randomURI } from '../utils'

export default class Statistics extends Component {
    makeStat = (value, label, key, text) => (
        <Statistic key={key}>
            <Statistic.Value text={text}>{value}</Statistic.Value>
            <Statistic.Label>{label}</Statistic.Label>
        </Statistic>
    )
    
    prettyLocation = str => {
        if (str === 'BayArea') {
            str = 'Bay Area'
        }
        if (str.indexOf(' ') > -1) {
            str = str.split(' ')
            let ret = [str[0]]
            for (let i = 1; i < str.length; i++) {
                ret.push(<br key={randomURI()}/>, str[i])
            }
            return ret
        }
        return str
    }

    render() {
        const { offers } = this.props
        const byLocation = getOfferCountByLocation(offers)
        const hostestLocation = (byLocation.labels && byLocation.labels.length && this.prettyLocation(byLocation.labels[0]))
        const stat = [
            {
                value: offers.length,
                label: 'Offers'
            },
            {
                value: Math.round(getAvg(offers)/1000) + 'k',
                label: 'Average Base'
            },
            {
                value: hostestLocation || 'None',
                valueType: 'text',
                label: 'Hotest Location'
            },
        ]
        
        return (
            <div>
                <Statistic.Group>
                    {stat.map((s, idx) => this.makeStat(s.value, s.label, idx, s.valueType === 'text'))}
                </Statistic.Group>
            </div>
        )
    }
}
