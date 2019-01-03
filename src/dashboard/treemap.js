import React from 'react';
import Highcharts from 'highcharts';
import Tree from 'highcharts/modules/treemap';
import axios from 'axios';

Tree(Highcharts);

class TreeMap extends React.Component {

    constructor (props)
    {
        super (props);

        this.state = {
            treemapData: []
        }
    }
    

    highChartsRender() {
        Highcharts.chart('treemap', {
            series: [{
                type: "treemap",
                layoutAlgorithm: 'strip',
                data: this.state.treemapData
            }],
            title: {
                text: null
            }
        })
    }

    componentDidMount() {
            axios.get(process.env.REACT_APP_SUMMA_STORY_API)
            .then(res => {
              const data = res.data.filter(story => {
                return story.itemCount >30;
              });

              const treemapData = data.map(story => {
                  return {
                      name: story.title,
                      value: story.itemCount,
                      date: story.latestItemTime,
                      id: story.id
                  }
              })
              
              this.setState({ treemapData })
              this.highChartsRender();
            });
    }

    render () {
        return (
            <div id="treemap"></div>
        )
    }   

}

export default TreeMap;