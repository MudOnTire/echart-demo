import React, { Component } from 'react'
import ReactECharts from 'echarts-for-react';  // or var ReactECharts = require('echarts-for-react');

export default class Chart extends Component {
  render() {
    const { getOption, onClick } = this.props;
    return (
      <ReactECharts
        option={getOption()}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}
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
