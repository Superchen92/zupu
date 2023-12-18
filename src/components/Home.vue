<template>
    <div id="main"></div>
</template>


<script setup>
import * as echarts from 'echarts';
import { onMounted } from 'vue';
import { zupu } from "@/constant/index"

onMounted(() => {
    //初始化
    const mychart = echarts.init(document.getElementById('main'),{},{
        height: zupu.length * 200,
        width: 1000,
    })

    const options = {
        grid: {
            show: true,
            width: zupu.length * 200,
            width: 1000,
            top: 0,
            left: 0,
            bottom: 0,
            borderColor: "#000"
        },
        xAxis: {
            show: true,

        },
        yAxis: {
            show: true,

        },
        // dataZoom: [
        //     {
        //         type: 'slider',
        //         xAxisIndex: [0,2,3,4,5],
        //         start: 0,
        //         end: 10,
        //         filterMode: 'none'
        //     },
        //     {
        //         type: 'slider',
        //         yAxisIndex: [0,2,3,4,5],
        //         start: 0,
        //         end: 10,
        //         filterMode: 'none'
        //     },
        // ],
        graphic: []
    }
    zupu.forEach(element => {
        //创建代树
        options.graphic.push({
            type: "group",
            id: element.series,
            children: [
                {
                    type: "line",
                    shape: {
                        x1: 0,
                        y1: element.series * 200,
                        x2: 1000,
                        y2: element.series * 200
                    }
                },
                {
                    type: 'rect',
                    shape: {
                        x: 0,
                        y: element.series * 200,
                        width: 50,
                        height: 200
                    },
                    style: {
                        fill: "#3e64ad",
                    },
                    textContent: {
                        style: {
                            text: element.name,
                            width: 10,
                            overflow: "break"
                        }
                    },
                    textConfig: {
                        position: "inside",
                    }
                },
                (function() {
                    const membersOption = {
                        type: "group",
                        name: "members",
                        children: []
                    }
                    const familys = element.members
                    const familyNum = familys.length
                    const everyFamilyWidth = 1000 / familyNum
                    
                    //循环获取每个家庭
                    familys.forEach((family,familyIndex) => {
                        const familyMiddlePosition = (everyFamilyWidth / 2) + familyIndex * everyFamilyWidth
                        const memebersNum = family.list.length
                        const memberRectWidth = 50
                        const memberMarginRight = 10
                        const memberStartPosition = familyMiddlePosition - (memebersNum * memberRectWidth + memberMarginRight * (memebersNum - 1))
                        family.list.forEach((member,memberIndex) => {
                            membersOption.children.push({
                                type: 'rect',
                                memberId: member.id,
                                shape: {
                                    x: (function(){
                                        return memberStartPosition + memberIndex * memberRectWidth + memberIndex * memberMarginRight
                                    })(),
                                    y: element.series * 200 + 50,
                                    width: memberRectWidth,
                                    height: 100
                                },
                                style: {
                                    fill: member.sex == 0 ? "#3e64ad" : "#ff9300"
                                },
                                textContent: {
                                    style: {
                                        text: member.name,
                                        width: 10,
                                        overflow: "break"
                                    },
                                },
                                textConfig: {
                                    position: "inside",
                                    
                                }
                            })
                        })
                    })
                    return membersOption
                })(),
            ]
        })
    });
    mychart.setOption(options)

    const relationLine = {
        type: "group",
        children: []
    }
    
    const membersPosition = []
    options.graphic.forEach(item => {
        const members = item.children.find(child => {
            return child.name == "members"
        })
        members.children.forEach(child => {
            membersPosition.push(child)
            
        })
    })

    const arrs = []
    membersPosition.forEach((item,index) => {
        arrs.push({
            name: `node${index}`,
            value: [item.shape.x,item.shape.y],
        })
    })

    zupu.forEach(item => {
        item.members.forEach(family => {
            family.list.forEach(member => {
                const myPosition = membersPosition.find(item => {
                    return item.memberId == member.id
                })
                //寻找子辈连线
                if(member.children.length > 0){
                    member.children.forEach(child => {
                        const childPosition = membersPosition.find(item => {
                            return item.memberId == child
                        })
                        relationLine.children.push(
                            {
                                type: "line",
                                style: {
                                    stroke: "#3e64ad"
                                },
                                shape: {
                                    x1: myPosition.shape.x + 25,
                                    y1: myPosition.shape.y + 100,
                                    x2: childPosition.shape.x + 25,
                                    y2: childPosition.shape.y
                                }
                            }
                        )
                    })
                }
            })
        })
    })

    options.graphic.push(relationLine)
    mychart.setOption(options)
})
</script>