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

    function levelColor(d) {
        if (d == 4 || d == 3)
            return 'rgba(0,218,195,0.9)'
        else if (d == 1 || d == 2)
            return '#8e26d0'
        else
            return '#2258f5'
    }
    function flatten(root) {
        let nodes = [], i = 0

        function recurse(node) {
            if (node.children) node.children.forEach(recurse)
            if (!node.id) node.id = ++i
            nodes.push(node)
        }

        recurse(root)
        return nodes
    }

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

    export default {
        data() {
            return {
                active: 1,
                nodeTree: {},
                links: [],
                nodeJson: {},
                simulation:null
            }
        },
        mounted() {
            this.getData()
            let _this = this
            setInterval(function(){
                let nodes = Object.assign({},_this.nodeTree)
                let links = _this.links.slice()
                let arr = []
                nodes.children.forEach(el=>{
                    el._children = el.children
                    links.forEach(it =>{
                        if(it.source != el.index)
                            arr.push(links.findIndex(it.source))
                    })
                    delete el.children
                })
                
                arr.forEach(e =>{
                    links.splice(e,1)
                })
                
                let nodeList = [], id = 0
                function recurse(node) {
                    nodeList.push(node)
                    if (node.children) {
                        node.children.forEach(recurse)
                    }
                    delete (node.children)
                }
                console.log(nodeList,links)
                recurse(nodes)
                d3.select("#force svg").html('')
                _this.render(nodeList,links)
            },2000)
        },
        methods: {
            init(){
                let svg = d3.select("#force svg")
                this.simulation = d3.forceSimulation()
                    .force('link', d3.forceLink().id(function(d) { return d.index }))
                    .force("collide", d3.forceCollide(function (d) { return d.r + 8 }).radius(2))
                    .force("charge", d3.forceManyBody({strength:10}))
                    .force("center", d3.forceCenter(370, 268))
            },
            getData() {
                mAjax(this, {
                    url: API.force_direct + '?param=1',
                    success: data => {
                        let nodes = data.nodes, links = data.links
                        //将平行nodes变成nodes tree
                        links.forEach((el, i) => {
                            let s = links[i].source, t = links[i].target
                            if (!nodes[s].children) {
                                nodes[s].children = []
                            }
                            nodes[s].children.push(nodes[t])
                        })

                        this.nodeTree = Object.assign({},nodes[0])
                        this.links = links
                        //递归遍历tree，讲树形关系解析成序号
                        let nodeList = [], id = 0
                        function recurse(node) {
                            if (!node.id) {
                                node.id = id++
                                nodeList.push(node)
                            }
                            if (node.children) {
                                node.children.forEach(recurse)
                            }
                            delete (node.children)
                        }
                        recurse(nodes[0])
                        this.render(nodeList,links)
                    }
                })
            },
            render(nodeList,links) {
                
                let svg = d3.select("#force svg")
                this.simulation = d3.forceSimulation()
                    .force('link', d3.forceLink().id(function(d) { return d.index }))
                    .force("collide", d3.forceCollide(function (d) { return d.r + 8 }).radius(2))
                    .force("charge", d3.forceManyBody({strength:10}))
                    .force("center", d3.forceCenter(370, 268))

                svg.append('g').attr('class', 'g1')
                svg.append('g').attr('class', 'g2')
                let link = svg.select('.g1').selectAll(".link")
                    .data(links)
                    .enter()
                    .append("line")
                    .attr("class", "link")
                    .style('stroke-width', 2)
                    .style('stroke', function (d) {
                        return '#2258f5'
                    })

                let node = svg.select('.g2').selectAll(".node")
                    .data(nodeList)
                    .enter()
                    .append("g")
                    .attr("class", "node")
                    .attr("r", function (d) {
                        return d.children ? 4.5 : Math.sqrt(d.pv) / 10
                    })
                link.exit().remove()

                //节点圆形
                node.append("circle")
                    .attr('class', 'c1')
                    .attr("r", function (d) {
                        return rFn(d)
                    })
                    .style("fill", function (d) {
                        return levelColor(d.group)
                    })
                //节点圆环
                node.append("circle")
                    .attr('class', 'c2')
                    .style('cursor', function (d) {
                        if (d.group < 4) return 'pointer'
                    })
                    .attr("r", function (d) {
                        return rFn(d)
                    })
                    .style("fill", 'rgba(0,0,0,0)')
                    .style('stroke-width', 8)
                    .style('stroke', function (d) {
                        return 'rgba(255,255,255,0.4)'
                    })
                    .style('display', 'none')

                //节点名称
                node.append('text')
                    .attr('class', 't1')
                    .attr('x', 28)
                    .attr('y', 5)
                    .style('fill', '#b2b2b2')
                    .style('font-size', '12px')
                    .text(function (d) {
                        if (d.name.length > 8) {
                            return d.name.substr(0, 8) + '…'
                        } else {
                            return d.name
                        }

                    })
                //节点pv
                node.append('text')
                    .attr('class', 't2')
                    .attr('x', 28)
                    .attr('y', 15)
                    .style('fill', '#fff')
                    .style('font-size', '12px')
                    .text(function (d) {
                        return d.pv
                    })
                    .style('display', 'none')


                node.exit().remove()

                let ticked = function () {
                    link
                        .attr("x1", function (d) { return d.source.x })
                        .attr("y1", function (d) { return d.source.y })
                        .attr("x2", function (d) { return d.target.x })
                        .attr("y2", function (d) { return d.target.y })

                    node.attr("transform", function (d) {
                        return "translate(" + d.x + "," + d.y + ")"
                    })
                }

                this.simulation
                    .nodes(nodeList)
                    .on("tick", ticked)

                this.simulation.force("link")
                    .links(links)
                    .distance(function(d){
                        if(d.target.group==4||d.target.group==3){
                            return Math.random() * 70 + 12
                        }else{
                            return Math.random() * 30 + 12
                        }
                        
                    })
            }
        }
    }

</script>