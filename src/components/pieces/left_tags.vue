<template>
    <li>
        <div class="main">
            <h1>标签体系</h1>
            <div class="force-button">
                <a :class="{active:active==1}" @click="changeActive(1)" href="javascript:void(0);">新闻资讯</a>
                <a :class="{active:active==2}" @click="changeActive(2)" href="javascript:void(0);">金融|投资</a>
                <a :class="{active:active==12}" @click="changeActive(12)" href="javascript:void(0);">金融|理财</a>
                <a :class="{active:active==11}" @click="changeActive(11)" href="javascript:void(0);">金融|保险</a>
                <a :class="{active:active==9}" @click="changeActive(9)" href="javascript:void(0);">金融|贷款</a>
                <a :class="{active:active==10}" @click="changeActive(10)" href="javascript:void(0);">金融|银行</a>
                <a :class="{active:active==3}" @click="changeActive(3)" href="javascript:void(0);">金融|信用卡</a>
                <a :class="{active:active==4}" @click="changeActive(4)" href="javascript:void(0);">电商</a>
                <a :class="{active:active==5}" @click="changeActive(5)" href="javascript:void(0);">汽车</a>
                <a :class="{active:active==6}" @click="changeActive(6)" href="javascript:void(0);">教育</a>
                <a :class="{active:active==7}" @click="changeActive(7)" href="javascript:void(0);">房产家居</a>
                <a :class="{active:active==8}" @click="changeActive(8)" href="javascript:void(0);">社交</a>
            </div>
            <div class="force-chart">
                <svg id="force" width="740" height="540">
                    <g class="links"></g>
                    <g class="nodes"></g>
                </svg>
            </div>
        </div>
    </li>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import * as d3 from 'd3'

    function radius(d) {
        if (d.group == 0) {
            return 16
        } else if (d.group == 1) {
            return 12
        } else if (d.group == 2) {
            return 12
        } else {
            return (d.pv + '').length * 1.5
        }
    }
    function levelColor(d) {
        if (d == 4 || d == 3)
            return 'rgba(0,218,195,0.9)'
        else if (d == 1 || d == 2)
            return '#8e26d0'
        else
            return '#2258f5'
    }

    export default {
        data() {
            let simulation = d3.forceSimulation()
                .force("charge", d3.forceManyBody().strength(-500))
                .force('center', d3.forceCenter(370, 270))
                .force("link", d3.forceLink().strength(0.4).iterations(5))
                .force("collide",d3.forceCollide( function(d){return d.r + 20 }).iterations(5).strength(0.4) )
                .force("x", d3.forceX())
                .force("y", d3.forceY())
                .alphaTarget(0.3)
                .velocityDecay(0.5)
            return {
                active: 1,
                simulation
            }
        },
        methods: {
            render(nodes, links) {
                let svg = d3.select("#force")
                let link = svg.select('.links').selectAll(".link")
                let node = svg.select('.nodes').selectAll(".node")
                let nodeUpdate = node.data(nodes)
                let nodeEnter = nodeUpdate.enter()

                let item = nodeUpdate.enter().append("g").attr('class', 'node')
                nodeUpdate.exit().remove()
                let nodeMerge = item.merge(nodeUpdate)

                //节点名称
                item.append('text').attr('class', 't1').attr('x', 15).attr('y', 5)
                    .attr('fill', '#b2b2b2')
                    .style('font-size', '12px')
                    .text(function (d) {
                        if (d.name.length > 8) {
                            return d.name.substr(0, 8) + '…'
                        } else {
                            return d.name
                        }
                    })

                //节点pv
                item.append('text')
                    .attr('class', 't2')
                    .attr('x', 15)
                    .attr('y', 6)
                    .attr('fill', '#fff')
                    .attr('font-size', '12px')
                    .text(function (d) {
                        return d.pv
                    })
                    .style('display', 'none')

                //节点圆形
                item.append("circle").attr('class', 'c1').attr("r", function (d) {
                    return radius(d)
                }).style("fill", function (d) {
                    return levelColor(d.group)
                })
                // //节点圆环
                item.append("circle").attr('class', 'c2').style('cursor', function (d) {
                    if (d.group < 4) return 'pointer'
                }).attr("r", function (d) {
                    return radius(d)
                }).style("fill", 'rgba(0,0,0,0)').style('stroke-width', 8).attr('stroke', function (d) {
                    return 'rgba(255,255,255,0.4)'
                }).style('display', 'none')

                // Apply the general update pattern to the links.
                link = link.data(links, function (d) { return d.source.id + "-" + d.target.id })
                link.exit().remove()
                link = link.enter().append("line").attr('class', 'link').attr('stroke-width', 2).attr('stroke', '#2258f5').merge(link)
                // Update and restart the simulation.
                this.simulation.nodes(nodes).on("tick", function () {
                    nodeMerge.attr("transform", function (d) {
                        return "translate(" + d.x + "," + d.y + ")"
                    })
                    link.attr("x1", function (d) { return d.source.x })
                        .attr("y1", function (d) { return d.source.y })
                        .attr("x2", function (d) { return d.target.x })
                        .attr("y2", function (d) { return d.target.y })
                })
                this.simulation.force("link").links(links)
                this.simulation.restart()
            },
            anaTree(node){
                let nodes = [], links = []
                function recurse(node, parent) {
                    nodes.push(node)
                    if (parent) {
                        links.push({ source: parent, target: node })
                    } else {
                        links.push({ source: 0, target: node })
                    }
                    if (node.children) {
                        node.children.forEach(el => {
                            recurse(el, node)
                        })
                    }
                }
                recurse(node)
                return {nodes,links}
            },
            getData(active){
                mAjax(this, {
                    url: API.force_direct + '?param=' + active,
                    success: data => {
                        let nodes = data.nodes
                        let links = data.links
                        links.forEach((el, i) => {
                            let s = links[i].source, t = links[i].target
                            if (!nodes[s].children) {
                                nodes[s].children = []
                            }
                            nodes[s].children.push(nodes[t])
                        })
                        let obj = this.anaTree(nodes[0])
                        this.render(obj.nodes, obj.links)
                    }
                })
            },
            changeActive(num){
                this.active = num
                this.getData(num)
            }
        },
        mounted() {
            let _this = this
            this.getData(1) 
            let alist = document.querySelectorAll('.force-button a')
            let num = 1
            d3.interval(function(){
                if(num<12){
                    alist[num].click()
                    num++
                }else{
                    num = 0
                    alist[0].click()
                }
            },7000,d3.now())
        }
    }

</script>