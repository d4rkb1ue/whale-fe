import React, { Component } from 'react'
import { defaults, Bar, Pie, Line, Polar, HorizontalBar, Bubble } from 'react-chartjs-2'
import { 
    getOfferCountByYear, 
    getOfferCountByCompany, 
    getOfferCountByDegree,
    getOfferCountBySeason,
    getOfferCountByExperience, 
    getOfferCountBySalary } from "../utils";
import Chart from './Chart'

defaults.global.legend.display = false
// defaults.global.redraw = true

export default class Charts extends Component {
    
    // chartjs2 does not support automatically assigning different colors to different portions of the chart.
    // this function is for dynamically generating different colors for different portions on the chart.
    _dynamicColors = (n) => {
        let colors = [];
        for (let i = 0; i < n; i++) {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            colors.push("rgba(" + r + "," + g + "," + b + ", 0.6)");
        }
        return colors;
    };

    makeData = (labels, datas) => ({
        labels,
        datasets: [{
            data: datas[0],
            backgroundColor: this._dynamicColors(datas[0].length),
            hoverBackgroundColor: this._dynamicColors(datas[0].length),
        }]
    })

    // <Line /> does not require array of colors.
    makeLineDate = (labels, datas) => ({
        labels,
        datasets: [{
            data: datas[0],
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
        }]
    })

    makeBubbleData = (labels, datas) => ({
        labels: ['January', 'ad'],
        datasets: [{
            label:[ 'My First dataset', 'sadf'],
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [
                {x:'amazon',y:20,r:5},
                {x:'google',y:40,r:5}
            ]
        }]
    })

    makeElementListener = accessor => {
        const { addFilter } = this.props
        if (accessor === 'season') {
            return (e) => {
                e = e[0]
                if (!e || !e._index) {
                    console.error('chart on click', e)
                    return
                }
                if (e._index === 0) { e._model.label = '4-6' }
                else if (e._index === 1) { e._model.label = '7-9' }
                else if (e._index === 2) { e._model.label = '10-12' }
                else if (e._index === 3) { e._model.label = '1-3' }
                addFilter(accessor, e._model.label)
            }
        }
        if (accessor === 'base_salary') {
            return (e) => {
                e = e[0]
                if (!e || !e._index || !e._xScale || !e._xScale.ticks) {
                    console.error('chart on click', e)
                    return
                }
                addFilter(accessor, e._xScale.ticks[e._index])
            }
        }
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
        let labels, counts, companyNames, chart, onClick;

        // make offer by company Pie chart
        ({ labels, counts } = getOfferCountByCompany(offers));
        onClick = this.makeElementListener('company_name')
        chart = <Pie data={this.makeData(labels, [counts])} onElementsClick={onClick} options={{legend: { display: true }}} />
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
        chart = <Polar data={this.makeData(labels, [counts])} redraw={true} onElementsClick={onClick} options={{legend: { display: true }}} />
        charts.push({
            color: 'yellow',
            header: 'Offer by Degree',
            chart,
        });

        // make offer by season Line chart
        ({ labels, counts } = getOfferCountBySeason(offers));
        onClick = this.makeElementListener('season')
        chart = <Line data={this.makeLineDate(labels, [counts])} redraw={true} onElementsClick={onClick} />
        charts.push({
            color: 'orange',
            header: 'Offer by Season',
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

        // make offer by salary Line chart
        ({ labels, counts, companyNames } = getOfferCountBySalary(offers));
        onClick = this.makeElementListener('base_salary')
        chart = <Bubble data={this.makeBubbleData(labels, [counts, companyNames])} redraw={true} onElementsClick={onClick} />
        charts.push({
            color: 'green',
            header: 'Offer by Salary',
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