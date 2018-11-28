import React, { Component } from 'react'
import { Bar, Pie, defaults } from 'react-chartjs-2'
import { getOfferCountByYear, getOfferCountByCompany } from "../utils";
import Chart from './Chart'

defaults.global.legend.display = false
// defaults.global.redraw = true

export default class Charts extends Component {
    makeData = (labels, datas) => ({
        labels,
        datasets: datas.map(data => ({ data }))
    })

    makeElementListener = accessor => {
        const { addFilter } = this.props
        return (e) => {
            // only take first element
            e = e[0]
            if (!e || !e._model || !e._model.label) {
                console.error('chart on click', e)
                return
            }
            addFilter(accessor, e._model.label)
        }
    }

    render() {
        const { offers } = this.props
        const charts = []
        let labels, counts, chart, onClick;

        // make offer by company Pie chart
        ({ labels, counts } = getOfferCountByCompany(offers));
        onClick = this.makeElementListener('company_name')
        chart = <Pie data={this.makeData(labels, [counts])} onElementsClick={onClick}/>
        charts.push({
            color: 'blue',
            header: 'Offer by Companies',
            chart,
        });

        // make offer by year Line chart
        ({ labels, counts } = getOfferCountByYear(offers));
        onClick = this.makeElementListener('year')
        // redraw is necessary for <Line /> to animate once loaded
        chart = <Bar data={this.makeData(labels, [counts])} redraw={true} onElementsClick={onClick} />
        charts.push({
            color: 'red',
            header: 'Offer by Year',
            chart,
        });

        return (
            <div className="ui three column doubling grid">
                {charts.map((com, idx) => (
                    <Chart
                        key={idx}
                        {...com}
                    />
                ))}
            </div>
        )
    }
}