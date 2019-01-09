import React from 'react';
import Highcharts from 'highcharts';
import axios from 'axios';
import moment from 'moment';
require('highcharts/highcharts-more.js')(Highcharts);


class CirclesChart extends React.Component {
    constructor (props)
    {
        super (props);

        this.state = {
            series : []
        }
    }

    highChartsRender()
    {
        const chart =  Highcharts.chart('circles', {
            chart: {
                type: 'packedbubble',
                height: '100%'
            },
            title: null,
            tooltip: {
                useHTML: true,
                pointFormat: '<b>{point.name}:</b> {point.y}'
            },
            plotOptions: {
                packedbubble: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        style: {
                            color: 'black',
                            textOutline: 'none',
                            fontWeight: 'bold'
                        },
                        filter: {
                            property: 'y',
                            operator: '>=',
                            value: 1
                        }
                    },
                    minSize: 1,
                    maxSize: 5
                }
            },
            series: this.state.series

        });

    }
    
    
    componentDidMount() {
        let Time = {
            twentyFourHrsAgo: moment(moment().subtract(24, 'h').toDate().valueOf()).unix()
        }
        const data  = new Object();
        data.name = 'people'
        data.data = new Array()
    
        axios.get(process.env.REACT_APP_SUMMA_ENTITIES + '?sinceEpochTime=' + Time['twentyFourHrsAgo'])
        .then(res=>{
            
            let people = {
                name: 'people',
                data: []
            }
            
            let places = {
                name: 'places',
                data: []
            }
            let organization = {
                name: 'organization',
                data: []
            }


            res.data['entities']
            .map((entity, index)=>{
                if(entity['relationshipCount']>=1 || index<=4)
                {
                    const id = entity['id']
                    const type = entity['type']
                    
                axios.get(process.env.REACT_APP_SUMMA_ENTITIES + '/' +id)
                    .then(res=>{
                        const mention = res.data['mentions'].length
                        if(type==='people')
                    {
                        people.data.push({
                            name: entity.baseForm,
                            value: mention
                        });
                    }
                    if(type==='places')
                    {
                        places.data.push({
                            name: entity.baseForm,
                            value: mention
                        })
                    }
                    if(type==='organization')
                    {
                        organization.data.push({
                            name: entity.baseForm,
                            value: mention
                        })
                    }
                        
                        
                    });
                    
                    
                    
                    
                    
                }
            });
            
            
            var self =this;
            setTimeout(function(){
                self.setState({series: [...self.state.series, people,places,organization]});
                self.highChartsRender();

            }, 500)
            
            
        });
    }

   
    
    
    render() {
      return <div id="circles"></div>;
    }
  }


export default CirclesChart;