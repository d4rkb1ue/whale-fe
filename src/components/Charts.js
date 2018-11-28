import React, { Component } from 'react'
import { defaults, Bar, Pie, Line, Polar, HorizontalBar } from 'react-chartjs-2'
import { 
    getOfferCountByYear, 
    getOfferCountByCompany, 
    getOfferCountByDegree,
    getOfferCountBySeason,
    getOfferCountByExperience } from "../utils";
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
            if (accessor === 'season') {
                if (e._model.label === 'Spring' ) { e._model.label = '4-6'}
                else if (e._model.label === 'Summer' ) { e._model.label = '7-9'}
                else if (e._model.label === 'Fall' ) { e._model.label = '10-12'}
                else if (e._model.label === 'Winter' ) { e._model.label = '1-3'}
            }
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

        // make offer by year Bar chart
        ({ labels, counts } = getOfferCountByYear(offers));
        onClick = this.makeElementListener('year')
        // redraw is necessary for <Line /> to animate once loaded
        chart = <Bar data={this.makeData(labels, [counts])} redraw={true} onElementsClick={onClick} />
        charts.push({
            color: 'red',
            header: 'Offer by Year',
            chart,
        });

        // make offer by degree Donut chart
        ({ labels, counts } = getOfferCountByDegree(offers));
        onClick = this.makeElementListener('degree')
        chart = <Polar data={this.makeData(labels, [counts])} redraw={true} onElementsClick={onClick} />
        charts.push({
            color: 'yellow',
            header: 'Offer by Degree',
            chart,
        });

        // make offer by experience chart
        ({ labels, counts } = getOfferCountByExperience(offers));
        onClick = this.makeElementListener('experience_level')
        chart = <HorizontalBar data={this.makeData(labels, [counts])} redraw={true} onElementsClick={onClick} />
        charts.push({
            color: 'purple',
            header: 'Offer by Experience',
            chart,
        });

        // make offer by season Line chart
        ({ labels, counts } = getOfferCountBySeason(offers));
        onClick = this.makeElementListener('season')
        chart = <Bar data={this.makeData(labels, [counts])} redraw={true} onElementsClick={onClick} />
        charts.push({
            color: 'green',
            header: 'Offer by Season',
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