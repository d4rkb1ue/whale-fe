import React, { Component } from 'react'
import { Line, Pie, defaults } from 'react-chartjs-2'
import { getOfferCountByYear, getOfferCountByCompany } from "../utils";
import ChartCard from './ChartCard'

defaults.global.legend.display = false
// defaults.global.redraw = true

export default class Chart extends Component {
    makeData = (labels, datas) => ({
        labels,
        datasets: datas.map(data => ({ data }))
    })
    render() {
        const { offers } = this.props
        const charts = []
        let labels, counts, chart;

        // make offer by company Pie chart
        ({ labels, counts } = getOfferCountByCompany(offers));
        chart = <Pie data={this.makeData(labels, [counts])} />
        charts.push({
            color: 'blue',
            header: 'Offer by Companies',
            chart,
        });

        // make offer by year Line chart
        ({ labels, counts } = getOfferCountByYear(offers));
        // redraw is necessary for <Line /> to animate once loaded
        chart = <Line data={this.makeData(labels, [counts])} redraw={true} />
        charts.push({
            color: 'red',
            header: 'Offer by Year',
            chart,
        });

        return (
            <div className="ui four column doubling grid">
                {charts.map((com, idx) => (
                    <ChartCard
                        key={idx}
                        {...com}
                    />
                ))}
            </div>
        )
    }
}