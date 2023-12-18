<template>
    <div id="main"></div>
    <el-dialog
        v-model="dialogVisible"
        title="输入关系"
        width="30%"
    >
        <el-input v-model="relation" autocomplete="off" />
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="confirm">
            Confirm
            </el-button>
        </span>
        </template>
    </el-dialog>
</template>


<script setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import { zupu } from "@/constant/index"
import { ElMessageBox } from 'element-plus'

const relation = ref()
const dialogVisible = ref(false)
const relationId = ref()
let options = null
let mychart = null

const confirm = () => {
    options.series.links.forEach(link => {
        if(link.id == relationId.value){
            link.relation = relation.value
        }
    })
    mychart.setOption(options)
    dialogVisible.value = false
}

onMounted(() => {
    //初始化
    mychart = echarts.init(document.getElementById('main'),{},{
        height: zupu.length * 200,
        width: 1000,
    })

    options = {
        grid: {
            show: true,
            width: zupu.length * 200,
            width: 1000,
            borderColor: "#000"
        },
        xAxis: {
            show: true,
            axisLabel:{
                show: false
            },
            type: 'value',
            splitLine: {
                show: false
            },
            axisTick : {
                show: false
            },
        },
        yAxis: {
            show: true,
            type: 'value',
            axisLabel: {
                show: true,
                verticalAlign: "middle",
                backgroundColor: '#3e64ad',
                fontSize:20,
                color: "#fff",
                width: 20,
                padding: [51,20],
                margin: 0,
                height: 70,
                overflow: "break",
                verticalAlign: "top",
                showMinLabel: false,
                formatter: (value,index) => {
                    const labels = ["第五代","第四代","第三代","第二代","第一代"]
                    if(value > 0){
                        return labels[index - 1]
                    }
                }
            },
            axisTick : {
                show: false
            },
        },
        dataZoom: [
            {
                type: 'slider',
                xAxisIndex: 0,
                filterMode: 'none'
            },
            {
                type: 'slider',
                yAxisIndex: 0,
                filterMode: 'none'
            },
            {
                type: 'inside',
                xAxisIndex: 0,
                filterMode: 'none'
            },
            {
                type: 'inside',
                yAxisIndex: 0,
                filterMode: 'none'
            }
        ],
        series: {
            type: "graph",
            coordinateSystem: 'cartesian2d',
            symbolSize: [50,100],
            symbol: 'rect',
            selectedMode: true,
            label: {
                show: true,
                width: 10,
                overflow: "break"
            },
            data: [],
            links: []
        }
    }
    
    //获取所有人员信息
    const members = []
    zupu.forEach(series => {
        series.members.forEach(family => {
            family.list.forEach(member => {
                members.push(member)
            })
        })
    })

    //获取数据
    const xMax = 1000
    const yMax = zupu.length * 200
    zupu.forEach(series => {
        const familys = series.members
        const familyNum = familys.length
        const everyFamilyWidth = 1000 / familyNum
        familys.forEach((family,familyIndex) => {
            const familyMiddlePosition = (everyFamilyWidth / 2) + familyIndex * everyFamilyWidth
            const memebersNum = family.list.length
            const memberRectWidth = 50
            const memberMarginRight = 10
            const memberStartPosition = familyMiddlePosition - (memebersNum * memberRectWidth + memberMarginRight * (memebersNum - 1))

            family.list.forEach((member,memberIndex) => {
                const x = memberStartPosition + memberIndex * memberRectWidth + memberIndex * memberMarginRight
                const y = yMax - series.series * 200 - 100
                options.series.data.push(
                    {
                        memberId: member.id,
                        name: `${member.name}`,
                        value: [x, y],
                        canDelete: member.children.length == 0,
                        children: member.children,
                        itemStyle: {
                            color: member.sex == 0 ? "#3e64ad" : "#ff9300"
                        }
                    },
                )
                member.children.forEach(child => {
                    const childInfo = members.find(member => {
                        return member.id == child
                    })
                    options.series.links.push({
                        id: `${member.id}->${childInfo.id}`,
                        source: member.name,
                        target: childInfo.name,
                        relation: "relation",
                        label: {
                            show: true,
                            formatter: string => {
                                return string.data.relation
                                
                            }
                        },
                        lineStyle: {
                            join: "bevel",
                            cap: 'round',
                            
                        }
                    })
                })
            })
        })
    })
    mychart.setOption(options)

    mychart.on('dblclick', e => {
        if(e.dataType == "edge"){
            dialogVisible.value = true
            relationId.value = e.data.id
        }else{
            if(e.data.canDelete){
                ElMessageBox.confirm('Are you sure to delete this node?')
                .then(() => {
                    //删除子节点
                    options.series.data = options.series.data.filter(item => {
                        return item.memberId != e.data.memberId
                    })

                    //寻找父节点一起删除关系
                    options.series.data = options.series.data.map(item => {
                        if(item.children.indexOf(e.data.memberId) >= 0){
                            item.canDelete = true
                            item.children.splice(item.children.indexOf(e.data.memberId),1)
                        }
                        return item
                    })
                    mychart.setOption(options)
                })
                .catch(() => {
                // catch error
                })
            }
            
        }
    })
    
    
})
</script>