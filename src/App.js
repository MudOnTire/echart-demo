import React, { Component } from 'react'
import { Drawer } from 'antd';
import 'antd/dist/antd.css';
import Chart from './chart';
import graph from './data.json';

export default class App extends Component {

  state = {
    drawerVisible: false,
    clickedItem: null
  }

  getOption = () => {
    const option = {
      tooltip: {},
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
    };
    return option;
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

    const { drawerVisible, clickedItem } = this.state;

    return (
      <>
        <Chart
          getOption={this.getOption}
          onClick={this.handleClick}
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

