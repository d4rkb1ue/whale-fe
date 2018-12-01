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

    _generateBubbles = (companySalary2Count) => {
        let res = []
        for (let i = 0; i < companySalary2Count.length; i++) {
            for (const salary in companySalary2Count[i].salary2Count) {
                res.push({
                    x: i,
                    y: salary,
                    r: (companySalary2Count[i].salary2Count[salary] / 5)
                })
            }
        }
        return res;
    }

    makeBubbleData = (companySalary2Count) => ({
        labels: ['January', 'ad'],
        datasets: [{
            label: "",
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
            data: this._generateBubbles(companySalary2Count)
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
                console.log(e)
                addFilter(accessor, e._xScale.ticks[e._index])
            }
        }
        if (accessor === 'bubble_base_salary') {
            return (e) => {
                e = e[0]
                if (!e || !e._index || !e._xScale || !e._xScale.ticks) {
                    console.error('chart on click', e)
                    return
                }
                addFilter('base_salary', e._yScale.chart.config.data.datasets[0].data[e._index].y)
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
        chart = <Pie data={this.makeData(labels, [counts])} onElementsClick={onClick} />
        charts.push({
            color: 'blue',
            header: 'by Companies',
            chart,
        });

        // make offer by year Bar chart
        ({ labels, counts } = getOfferCountByYear(offers));
        onClick = this.makeElementListener('year')
        // redraw is necessary for <Line /> to animate once loaded
        chart = <Bar data={this.makeData(labels, [counts])} redraw={true} onElementsClick={onClick} />
        charts.push({
            color: 'red',
            header: 'by Year',
            chart,
        });

        // make offer by degree Donut chart
        ({ labels, counts } = getOfferCountByDegree(offers));
        onClick = this.makeElementListener('degree')
        chart = <Polar data={this.makeData(labels, [counts])} redraw={true} onElementsClick={onClick} options={{legend: { display: true }}} />
        charts.push({
            color: 'yellow',
            header: 'by Degree',
            chart,
        });

        // make offer by season Line chart
        ({ labels, counts } = getOfferCountBySeason(offers));
        onClick = this.makeElementListener('season')
        chart = <Line data={this.makeLineDate(labels, [counts])} redraw={true} onElementsClick={onClick} />
        charts.push({
            color: 'orange',
            header: 'by Season',
            chart,
        });

        // make offer by experience chart
        ({ labels, counts } = getOfferCountByExperience(offers));
        onClick = this.makeElementListener('experience_level')
        chart = <HorizontalBar data={this.makeData(labels, [counts])} redraw={true} onElementsClick={onClick} />
        charts.push({
            color: 'purple',
            header: 'by Experience',
            chart,
        });

        // make offer by salary Line chart
        let companySalary2Count;
        ({ companySalary2Count, companyNames } = getOfferCountBySalary(offers));
        onClick = this.makeElementListener('bubble_base_salary')
        chart = <Bubble 
                    data={this.makeBubbleData(companySalary2Count)} 
                    redraw={true} 
                    onElementsClick={onClick} 
                    options={{
                        scales: {
                            xAxes: [{
                                ticks: {
                                    min: 0,
                                    max: 1,
                                    stepSize: 1,
                                    maxRotation: 65,
                                    minRotation: 65,
                                    callback: function(value, index, values) {
                                        return companyNames[index];
                                    }
                                }
                            }],
                            yAxes: [
                                {
                                    ticks: {
                                        callback: function(label, index, labels) {
                                            return label/1000+'k';
                                        }
                                    }
                                }
                            ]
                        },
                        tooltips: {
                            callbacks: {
                               label: function(t, d) {
                                    return companyNames[t.xLabel] + ' - $' + t.yLabel + ' - ' + d.datasets[t.datasetIndex].data[t.index].r * 5; 
                                    // 'r' is the radius, * 5 to get the real count
                               }
                            }
                         }
                    }}
                />
        charts.push({
            color: 'green',
            header: 'by Salary',
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