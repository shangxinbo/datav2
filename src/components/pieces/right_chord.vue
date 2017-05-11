<styple>
    .group-tick{ color:white }
</styple>
<template>
    <li id="piece1">
        <div class="main" v-show="panel==1">
            <h1>基金关系图</h1>
            <div class="public-chart-warp">
                <div id="chord" width="768" height="642"></div>
            </div>
        </div>
        <iframe id="express" v-show="panel==2" src="http://www.geotmt.com/index.php?m=content&c=index&a=lists&catid=51"></iframe>
    </li>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import * as d3 from 'd3'
    export default {
        data() {
            return {
                panel: 1,
                width: 768,
                height: 642 - 200,
                offset: 80,
                color1: [
                    "rgba(3,82,189,1)",
                    "rgba(0,153,204,1)",
                    "rgba(0,193,150,1)",
                    "rgba(0,193,109,1)",
                    "rgba(0,124,182,1)",
                    "rgba(35,39,199,1)",
                    "rgba(67,28,213,1)",
                    "rgba(102,0,204,1)",
                    "rgba(113,25,138,1)"
                ],
                color2: [
                    "rgba(3,82,189,0.58)",
                    "rgba(0,153,204,0.58)",
                    "rgba(0,193,150,0.58)",
                    "rgba(0,193,109,0.58)",
                    "rgba(0,124,182,0.58)",
                    "rgba(35,39,199,0.58)",
                    "rgba(67,28,213,0.58)",
                    "rgba(102,0,204,0.58)",
                    "rgba(113,25,138,0.58)"
                ],
                dialSize: '12px',
                nameSize: '12px',
                tickLength: 4,
                nameRadius: 60
            }
        },
        watch: {
            panel(newVal, oldVal) {
                if (newVal == 2) {
                    document.getElementById('express').contentWindow.location.reload()
                }
            }
        },
        mounted() {
            this.getData()
            setInterval(() => {
                if (this.panel == 1) {
                    this.panel = 2
                } else {
                    this.panel = 1
                }
            }, 200 * 1000)
        },
        methods: {
            getData() {
                mAjax(this, {
                    url: API.chord,
                    success: data => {
                        try {
                            var valueCache = data.value
                            var total = 0
                            var arr = []
                            for (let i = 0; i < valueCache.length; i++) {
                                for (let j = 0; j < valueCache[i].length; j++) {
                                    total += Number(valueCache[i][j])
                                }
                            }
                            for (let i = 0; i < valueCache.length; i++) {
                                let mm = []
                                for (let j = 0; j < valueCache[i].length; j++) {
                                    mm[j] = Math.round(valueCache[i][j] / total * 100 * 10000) / 10000
                                }
                                arr[i] = mm
                            }
                            data.value = arr
                            this.render(data)
                        } catch (e) {
                            console.log(e)
                        }
                    }
                })
            },
            render(data) {
                let matrix = data.value
                let NameProvider = data.name
                let _this = this

                let chord = d3.chord()
                    .padAngle(0.04)
                    .sortSubgroups(d3.descending)
                    .sortChords(d3.descending)

                let outerRadius = Math.min(this.width, this.height) * 0.6 - 50,
                    innerRadius = outerRadius - 20

                let color1 = d3.scaleOrdinal()
                    .domain(d3.range(NameProvider.length))
                    .range(this.color1)
                let color2 = d3.scaleOrdinal()
                    .domain(d3.range(NameProvider.length))
                    .range(this.color2)

                let arc = d3.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(outerRadius)

                let svg = d3.select("#chord").append("svg")
                    .attr("width", this.width)
                    .attr("height", this.height + this.offset * 2)

                let ribbon = d3.ribbon()
                    .radius(innerRadius)

                let g = svg.append("g")
                    .attr("transform", "translate(" + this.width / 2 + "," + (this.height / 2 + this.offset) + ")")  //居中
                    .datum(chord(matrix))

                let group = g.append("g")
                    .attr("class", "groups")
                    .selectAll("g")
                    .data(function (chords) { return chords.groups })
                    .enter().append("g")

                group.append("path")
                    .style("fill", function (d) { return color1(d.index) })
                    .style("stroke", function (d) { return color1(d.index) })
                    .attr("d", arc)

                let groupTick = group.selectAll(".group-tick")
                    .data(function (d) { return groupTicks(d, 1e3) })
                    .enter().append("g")
                    .attr("class", "group-tick")
                    .attr("transform", function (d) {
                        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                            + "translate(" + outerRadius + 40 + ",0)"
                    })

                groupTick.append("line")
                    .style('stroke', '#707378')
                    .attr("x2", 6)

                groupTick
                    .append("text")
                    .attr("x", 8)
                    .attr("dy", ".35em")
                    .style('fill', '#707378')
                    .attr("transform", function (d) { return d.angle > Math.PI ? "rotate(180) translate(-16)" : null })
                    .style("text-anchor", function (d) { return d.angle > Math.PI ? "end" : null })
                    .style("font-size", this.dialSize)
                    .text(function (d, i) {
                        return d.label
                    })

                g.append("g")
                    .attr("class", "ribbons")
                    .selectAll("path")
                    .data(function (chords) { return chords })
                    .enter().append("path")
                    .attr("d", ribbon)
                    .style("fill", function (d) { return color2(d.target.index) })
                    .style("stroke", function (d) { return d3.rgb(color2(d.target.index)).darker() })

                group.append("text")
                    .each(function (d) {
                        d.angle = (d.startAngle + d.endAngle) / 2
                    })
                    .attr('x', 10)
                    .attr("dy", ".35em")
                    .style("fill", "#fff")
                    .attr("text-anchor", function (d) {
                        return d.angle > Math.PI ? "end" : null
                    })
                    .attr("transform", function (d) {
                        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                            + "translate(" + (innerRadius + _this.nameRadius) + ")"
                            + (d.angle > Math.PI ? "rotate(180)" : "")
                    })
                    .style("font-size", this.nameSize)
                    .text(function (d, i) {
                        return NameProvider[i]
                    })

                function groupTicks(d, step) {
                    let k = (d.endAngle - d.startAngle) / d.value
                    return d3.range(0, d.value, 1).map(function (v, i) {
                        return {
                            angle: v * k + d.startAngle,
                            label: i % 5 ? null : v + "%"
                        }
                    })
                }

                function fade(opacity) {
                    return function (d, i) {
                        svg.selectAll("path.chord")
                            .filter(function (d) {
                                return d.source.index != i && d.target.index != i
                            })
                            .transition()
                            .style("stroke-opacity", opacity)
                            .style("fill-opacity", opacity)
                    }
                }
            }
        }
    }

</script>