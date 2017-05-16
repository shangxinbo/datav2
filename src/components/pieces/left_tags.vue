<template>
    <li>
        <div class="main">
            <h1>标签体系</h1>
            <div class="force-button">
                <a :class="{active:active==1}" href="javascript:void(0);">新闻资讯</a>
                <a :class="{active:active==2}" href="javascript:void(0);">金融|投资</a>
                <a :class="{active:active==12}" href="javascript:void(0);">金融|理财</a>
                <a :class="{active:active==11}" href="javascript:void(0);">金融|保险</a>
                <a :class="{active:active==9}" href="javascript:void(0);">金融|贷款</a>
                <a :class="{active:active==10}" href="javascript:void(0);">金融|银行</a>
                <a :class="{active:active==3}" href="javascript:void(0);">金融|信用卡</a>
                <a :class="{active:active==4}" href="javascript:void(0);">电商</a>
                <a :class="{active:active==5}" href="javascript:void(0);">汽车</a>
                <a :class="{active:active==6}" href="javascript:void(0);">教育</a>
                <a :class="{active:active==7}" href="javascript:void(0);">房产家居</a>
                <a :class="{active:active==8}" href="javascript:void(0);">社交</a>
            </div>
            <div id="force" class="force-chart">
                <svg width="740" height="540"></svg>
            </div>
        </div>
    </li>
</template>
<script>
    import { mAjax } from 'src/services/functions'
    import API from 'src/services/api'
    import * as d3 from 'd3'

    function rFn(d) {
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
    function levelColor(d) {          //颜色值
        if (d == 4 || d == 3)
            return 'rgba(0,218,195,0.9)'
        else if (d == 1 || d == 2)
            return '#8e26d0'
        else
            return '#2258f5'
    }

    export default {
        data() {
            return {
                active: 1
            }
        },
        mounted() {
            let svg = d3.select("svg")
            let g = svg.append("g").attr("transform", "translate(370,268)")
            let link = g.append("g").selectAll(".link")
            let node = g.append("g").selectAll(".node")

            let nodes = []
            let links = []

            let simulation = d3.forceSimulation(nodes)
                .force("charge", d3.forceManyBody().strength(-100))
                .force("link", d3.forceLink(links).distance(function (d) {
                    if (d.target.group == 4 || d.target.group == 3) {
                        return Math.random() * 20 + 20
                    } else {
                        return 20
                    }
                }))
                .force("x", d3.forceX())
                .force("y", d3.forceY())
                .alphaTarget(0.4)
                .velocityDecay(0.9)


            mAjax(this, {
                url: API.force_direct + '?param=1',
                success: data => {
                    //将平行nodes变成nodes tree
                    nodes = data.nodes, links = data.links
                    links.forEach((el, i) => {
                        let s = links[i].source, t = links[i].target
                        if (!nodes[s].children) {
                            nodes[s].children = []
                        }
                        nodes[s].children.push(nodes[t])
                    })

                    //递归遍历tree，讲树形关系解析成序号
                    let nodeList = [], id = 0, ss = []
                    function recurse(node, parent) {
                        if (!node.id) {
                            node.id = ++id
                            nodeList.push(node)
                        }
                        if (parent) {
                            ss.push({ source: parent, target: node })
                        } else {
                            ss.push({ source: 0, target: node })
                        }
                        if (node.children) {
                            node.children.forEach(el => {
                                recurse(el, node)
                            })
                        }
                    }
                    recurse(nodes[0])
                    nodes = nodeList
                    links = ss
                    restart()

                    // d3.interval(function () {
                    //     let ns = nodes.slice()
                    //     for (let i = 0; i < ns[0].children.length; i++) {
                    //         if (ns[0].children[i].children.length > 0) {
                    //             ns[0].children[i]._children = ns[0].children[i].children
                    //             ns[0].children[i].children = []
                    //             break
                    //         }
                    //     }
                    //     let nodeList = [], id = 0, ss = []
                    //     function recurse(node, parent) {
                    //         nodeList.push(node)
                    //         if (parent) {
                    //             ss.push({ source: parent, target: node })
                    //         } else {
                    //             ss.push({ source: 0, target: node })
                    //         }
                    //         if (node.children) {
                    //             node.children.forEach(el => {
                    //                 recurse(el, node)
                    //             })
                    //         }
                    //     }
                    //     recurse(ns[0])
                    //     nodes = nodeList
                    //     links = ss
                    //     restart()
                    // }, 2000, d3.now() + 1000)

                }
            })

            let item
            function restart() {
                //d3.select("svg").select('g').selectAll(".node").remove()
                node = node.data(nodes, function (d) { return d.id })
                node.exit().remove()
                item = node.enter().append("g").attr("class", "node").merge(node)

                // //节点圆形
                item.append("circle").attr('class', 'c1').attr("r", function (d) {
                    return rFn(d)
                }).style("fill", function (d) {
                    return levelColor(d.group)
                })
                // //节点圆环
                item.append("circle").attr('class', 'c2').style('cursor', function (d) {
                    if (d.group < 4) return 'pointer'
                }).attr("r", function (d) {
                    return rFn(d)
                }).style("fill", 'rgba(0,0,0,0)').style('stroke-width', 8).attr('stroke', function (d) {
                    return 'rgba(255,255,255,0.4)'
                }).style('display', 'none')

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
                // //节点pv
                item.enter().append('text')
                    .attr('class', 't2')
                    .attr('x', 15)
                    .attr('y', 6)
                    .attr('fill', '#fff')
                    .attr('font-size', '12px')
                    .text(function (d) {
                        return d.pv
                    })
                    .style('display', 'none')

                // Apply the general update pattern to the links.
                link = link.data(links, function (d) { return d.source.id + "-" + d.target.id })
                link.exit().remove()
                link = link.enter().append("line").attr('stroke-width', 2).attr('stroke', '#2258f5').merge(link)
                // Update and restart the simulation.
                simulation.nodes(nodes).on("tick", ticked)
                simulation.force("link").links(links)
                simulation.alpha(1).restart()
            }

            function ticked() {
                item.attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")"
                })
                link.attr("x1", function (d) { return d.source.x })
                    .attr("y1", function (d) { return d.source.y })
                    .attr("x2", function (d) { return d.target.x })
                    .attr("y2", function (d) { return d.target.y })
            }

        }
    }

</script>