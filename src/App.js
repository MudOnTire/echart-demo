import React, { Component } from 'react'
import { Drawer } from 'antd';
import 'antd/dist/antd.css';
import Chart from './chart';

export default class App extends Component {

  state = {
    drawerVisible: false,
    clickedItem: null
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
        <Chart onClick={this.handleClick} />
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

