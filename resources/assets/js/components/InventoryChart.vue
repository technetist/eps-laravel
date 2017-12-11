<template>
    <svg class="inventory-chart"></svg>
</template>

<script>
    import BaseChart from 'vue-d3-basechart'
    import * as d3 from 'd3'
    export default BaseChart.extend({
        name: 'inventory-chart',
        props: ['width', 'height'],
        methods: {
            renderChart () {
                // NOTE: This code is based on https://gist.github.com/d3noob/402dd382a51a4f6eea487f9a35566de0
                var data = this.chartData
                var margin = {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 50
                }
                var width = this.width - margin.left - margin.right
                var height = this.height - margin.top - margin.bottom
                var parseTime = d3.timeParse('%d-%b-%y')
                var x = d3.scaleLinear()
                    .range([0, width])
                    .domain([0, 1000])

                var y = d3.scaleLinear()
                    .range([height, 0])
                    .domain([0, 100])
                var xAxis = d3.axisBottom(x).ticks(10)
                var yAxis = d3.axisLeft(y).ticks(5)
                var valueline = d3.line()
                    .x((d) => x(d))
                    .y((d) => y(d.close))
                var svg = d3.select(this.$el)
                    .attr('width', this.width)
                    .attr('height', this.height)
                svg.selectAll('g').remove()
                var g = svg
                    .append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                var d = g.selectAll('path')
                    .data([data])
                d.enter().append('path')
                    .attr('class', 'line')
                    .attr('d', valueline)
                var tooltip = d3.select('body').append('div')
                    .attr('class', 'tooltip')
                    .style('opacity', 0)
                g.selectAll('circle')
                    .data(data)
                    .enter().append('circle')
                    .attr('r', 3.5)
                    .attr('cx', (d) => x(parseTime(d.date)))
                    .attr('cy', (d) => y(d.close))
                    .on('mouseover', (d) => {
                        tooltip.transition()
                            .duration(200)
                            .style('opacity', 0.9)
                        tooltip.html(d.date + '<br/>' + d.close)
                            .style('left', d3.event.pageX + 'px')
                            .style('top', (d3.event.pageY - 34) + 'px')
                    })
                    .on('mouseout', (d) => {
                        tooltip.transition()
                            .duration(200)
                            .style('opacity', 0)
                    })
                g.append('g')
                    .attr('class', 'x-axis')
                    .attr('transform', 'translate(0,' + height + ')')
                    .call(xAxis)
                g.append('g')
                    .attr('class', 'y-axis')
                    .call(yAxis)

                // now add titles to the axes
                svg.append("text")
                    .attr("class", "x label")
                    .attr("text-anchor", "end")
                    .attr("x", width)
                    .attr("y", height - 6)
                    .text("Time (sec)");

                svg.append("text")
                    .attr("class", "y label")
                    .attr("text-anchor", "end")
                    .attr("y", 6)
                    .attr("dy", ".75em")
                    .attr("transform", "rotate(-90)")
                    .text("Amount(pcs)");
            }
        },
        watch: {
            width: 'renderChart',
            height: 'renderChart'
        }
    })
</script>

<style lang="scss">
    .line-chart {
        .line {
            fill: none;
            stroke: steelblue;
            stroke-width: 2px;
        }
    }
    .tooltip {
        position: absolute;
        text-align: center;
        width: 80px;
        height: 34px;
        padding: 2px;
        font: 12px sans-serif;
        background: lightsteelblue;
        border: 0;
        border-radius: 8px;
        pointer-events: none;
    }
</style>