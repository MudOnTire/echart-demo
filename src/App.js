import React, { Component } from 'react'
import { Drawer } from 'antd';
import 'antd/dist/antd.css';
import ReactECharts from 'echarts-for-react';  // or var ReactECharts = require('echarts-for-react');
import graph from './data.json';

export default class App extends Component {

  state = {
    drawerVisible: false,
    clickedItem: null,
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
      this.chart.getEchartsInstance().setOption({
        legend: [{
          data: graph.categories.map(function (a) {
            return a.name;
          })
        }],
        series: [
          {
            data: graph.nodes,
            links: graph.links,
            categories: graph.categories,
          }
        ]
      });
    }, 500);
  }

  closeDrawer = () => {
    this.setState({
      drawerVisible: false
    });
  }

  handleClick = (e) => {
    console.log("clicked", e);
    const { name, seriesId, seriesName, seriesType, value } = e;
    this.setState({
      drawerVisible: true,
      clickedItem: {
        name,
        value,
        seriesId,
        seriesName,
        seriesType
      }
    });
  }

  render() {

    const { drawerVisible, clickedItem, option } = this.state;

    return (
      <>
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
            click: this.handleClick
          }}
        />
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={true}
          onClose={this.closeDrawer}
          visible={drawerVisible}
        >
          {JSON.stringify(clickedItem)}
        </Drawer>
      </>
    )
  }
}

