import React from 'react';
import Highcharts from 'highcharts';
import Tree from 'highcharts/modules/treemap';
import Drilldown from 'highcharts/modules/drilldown';
import axios from 'axios';
import moment from 'moment';

Tree(Highcharts);
Drilldown(Highcharts);

class TreeMap extends React.Component {

    constructor (props)
    {
        super (props);

        this.state = {
            treemapData: [],
            DrillDown: []
        }
    }
    

    highChartsRender() {
      const chart =  Highcharts.chart('treemap', {
            series: [{
                type: "treemap",
                layoutAlgorithm: 'squarified',
                data: this.state.treemapData,
                animationLimit: 500,
            }],
            title: {
                text: null
            }
        });
      
    }

    componentDidMount() {
        let Time =  {
            monthAgo: moment().subtract(24, 'h').format("MM-DD-YYYY")
        }
        console.log(Time)
            axios.get(process.env.REACT_APP_SUMMA_STORY_API)
            .then(res => {
              const data = res.data
              .filter(story => {
                  const time = moment(story.latestItemTime).format("MM-DD-YYYY")
                  return moment(time).isAfter(Time['monthAgo']) && story.itemCount>10;
              });

              const treemapData = data.map(story => {
                  return {
                      name: story.title,
                      value: story.itemCount,
                      date: moment(story.latestItemTime).format("MM-DD-YYYY"),
                      id: story.id, 
                      level: 1
                  }
              })
              console.log(treemapData)
              
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