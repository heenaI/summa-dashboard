import React from 'react';
import Highcharts from 'highcharts';
import Tree from 'highcharts/modules/treemap';
import Drilldown from 'highcharts/modules/drilldown';
import axios from 'axios';

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
            drilldown: {
                series: this.state.DrillDown
            },
            title: {
                text: null
            }
        });
      
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
                      id: story.id, 
                      level: 1,
                      drilldown: story.id
                  }
              })
              
              this.setState({ treemapData })
              

              const Storylines = treemapData.map(storyline => {
                
                let Storylines = {
                    type: 'treemap',
                    layoutAlgorithm: 'squarified',
                    id: storyline.drilldown,
                    dataLabels: {
                        enabled: true,
                        align: 'left',
                        verticalAlign: 'top',
                        style: {
                            fontSize: '15px',
                            fontWeight: 'bold'
                        }
                    },
                    data: [
                        {
                            id: 'de',
                            name: 'German',
                            color: '#EC2500'
                        },
                        {
                            id: 'en',
                            name: 'English',
                            color: '#ECE100'
                        },
                        {
                            id: 'ru',
                            name: 'Russian',
                            color: '#EC9800'
                        },
                        {
                            id: 'ar',
                            name: 'Arabic',
                            color: '#9EDE00'
                        },
                        {
                            id: 'es',
                            name: 'Spanish',
                            color: '#FFA07A'
                        }
                    ]

                };

                axios.get(process.env.REACT_APP_SUMMA_STORYLINES_API + storyline.id)
                .then(res => {
                    

                     Object.keys(res.data.newsItems).forEach((key, index)=>{
                        
                        let o = res.data.newsItems[key]
                       
                        Storylines.data.push({
                            parent: o.contentDetectedLangCode,
                            id: o.id,
                            name: o.title,
                            level: 2,
                            value: 10

                        });
                    }); 
                });
                console.log(Storylines)
                this.setState(prevState => ({
                    DrillDown: [Storylines, ...prevState.DrillDown]
                }))
                this.highChartsRender();
                
                return Storylines 

              });
              
              
            });

            

    }

    render () {
        return (
            <div id="treemap"></div>
        )
    }   

}

export default TreeMap;