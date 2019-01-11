import React from 'react';
import Highcharts from 'highcharts';
import Tree from 'highcharts/modules/treemap';
import Drilldown from 'highcharts/modules/drilldown';
import axios from 'axios';
import moment from 'moment';
import filter from './helpers/filters';

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
        
            axios.get(process.env.REACT_APP_SUMMA_STORY_API)
            .then(res => {
              const data = res.data
              .filter(story => {
                  const time = moment(story.latestItemTime).format("MM-DD-YYYY")
                  return moment(time).isAfter(Time['monthAgo']) && story.itemCount<=50 && story.itemCount>20;
              });
              const filtered = data.filter(story=>{
                for( var i in filter)
                {
                    if(story.title!==filter)
                    {
                        return true
                    }
                    return false
                }
                });
              console.group(data)
              console.log(filtered)
            

              const treemapData = data.map(story => {
                  return {
                      name: story.title,
                      value: story.itemCount,
                      date: moment(story.latestItemTime).format("MM-DD-YYYY"),
                      id: story.id, 
                      level: 1
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