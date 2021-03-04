import React, { Component } from 'react'
import ReactECharts from 'echarts-for-react';  // or var ReactECharts = require('echarts-for-react');
import graph from '../data.json';

export default class Chart extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    option: {
      tooltip: {},
      legend: [{
        data: []
      }],
      series: [
        {
          name: 'Les Miserables',
          type: 'graph',
          layout: 'none',
          data: [],
          links: [],
          categories: [],
          roam: true,
          label: {
            show: true,
            position: 'right',
            formatter: '{b}'
          },
          labelLayout: {
            hideOverlap: true
          },
          scaleLimit: {
            min: 0.4,
            max: 2
          },
          lineStyle: {
            color: 'source',
            curveness: 0.3
          }
        }
      ]
    }
  }

  componentDidMount() {
    setTimeout(() => {
      console.log('chart ref', this.chart);
      this.chart.getEchartsInstance().setOption({
        legend: [{
          data: graph.categories.map(function (a) {
            return a.name;
          })
        }],
        series: [
          {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'none',
            data: graph.nodes,
            links: graph.links,
            categories: graph.categories,
            roam: true,
            label: {
              show: true,
              position: 'right',
              formatter: '{b}'
            },
            labelLayout: {
              hideOverlap: true
            },
            scaleLimit: {
              min: 0.4,
              max: 2
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3
            }
          }
        ]
      });
    }, 1000);
  }

  render() {
    const { getOption, onClick } = this.props;
    const { option } = this.state;
    return (
      <ReactECharts
        option={option}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}
        ref={(e) => { this.chart = e; }}
        style={{
          width: '100vw',
          height: '100vh',
        }}
        onEvents={{
          click: onClick
        }}
      />
    )
  }
}
