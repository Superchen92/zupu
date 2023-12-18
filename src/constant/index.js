export const zupu = [
    {
        series: 0,
        name: "第一代",
        members: [
            {
                id: 0,
                list: [
                    {
                    id: 0,
                    name: "张爷爷",
                    ancestors: [], // 父母
                    sex: 0, //0男，1女
                    partner: [1], //伴侣ID
                    children: [2,3] //子女ID
                },
                {
                    id: 1,
                    name: "赵奶奶",
                    sex: 1,
                    ancestors: [],
                    partner: [0],
                    children: [2,3]
                }]
            }
        ]
    },
    {
        series: 1,
        name: "第二代",
        members: [
            {
                id: 0,
                list: [
                    {
                        id: 2,
                        name: "张爸爸",
                        ancestors: [0,1], // 父母
                        sex: 0, //0男，1女
                        partner: [], //伴侣ID
                        children: [6,7] //子女ID
                    }
                ]
            },
            {
                id: 1,
                list: [
                    {
                        id: 3,
                        name: "张叔叔",
                        ancestors: [0,1], // 父母
                        sex: 0, //0男，1女
                        partner: [4,5], //伴侣ID
                        children: [8,9] //子女ID
                    },
                    {
                        id: 4,
                        name: "何大婶",
                        ancestors: [], // 父母
                        sex: 1, //0男，1女
                        partner: [4], //伴侣ID
                        children: [8] //子女ID
                    },
                    {
                        id: 5,
                        name: "王二婶",
                        ancestors: [], // 父母
                        sex: 1, //0男，1女
                        partner: [4], //伴侣ID
                        children: [9] //子女ID
                    },
                ]
            },
        ]
    },
    {
        series: 2,
        name: "第三代",
        members: [
            {
                id: 0,
                list: [
                    {
                        id: 6,
                        name: "张亲姐",
                        ancestors: [2], // 父母
                        sex: 1, //0男，1女
                        partner: [], //伴侣ID
                        children: [] //子女ID
                    },
                ]
            },
            {
                id: 1,
                list: [
                {
                    id: 7,
                    name: "张自己",
                    ancestors: [2], // 父母
                    sex: 0, //0男，1女
                    partner: [], //伴侣ID
                    children: [11] //子女ID
                },
                ]
            },
            {
                id: 2,
                list: [
                    {
                        id: 8,
                        name: "张大婶弟",
                        ancestors: [3,4], // 父母
                        sex: 0, //0男，1女
                        partner: [], //伴侣ID
                        children: [13] //子女ID
                    }
                ]
            },
            {
                id: 3,
                list: [
                    {
                        id: 9,
                        name: "张二婶妹",
                        ancestors: [3,5], // 父母
                        sex: 1, //0男，1女
                        partner: [], //伴侣ID
                        children: [10] //子女ID
                    }
                ]
            }
        ]
    },
    {
        series: 3,
        name: "第四代",
        members: [
            {
                id: 0,
                list: [
                    {
                        id: 10,
                        name: "张二婶妹亲侄",
                        ancestors: [9], // 父母
                        sex: 1, //0男，1女
                        partner: [], //伴侣ID
                        children: [] //子女ID
                    }
                ]
            },
            {
                id: 1,
                list: [
                    {
                        id: 11,
                        name: "张儿子",
                        ancestors: [7], // 父母
                        sex: 0, //0男，1女
                        partner: [], //伴侣ID
                        children: [14] //子女ID
                    },
                    {
                        id: 12,
                        name: "赵儿媳",
                        ancestors: [], // 父母
                        sex: 1, //0男，1女
                        partner: [11], //伴侣ID
                        children: [14] //子女ID
                    }
                ]
            },
            {
                id: 2,
                list: [
                    {
                        id: 13,
                        name: "张大婶弟侄女",
                        ancestors: [8], // 父母
                        sex: 1, //0男，1女
                        partner: [], //伴侣ID
                        children: [] //子女ID
                    },
                ]
            }
        ]
    },
    {
        series: 4,
        name: "第五代",
        members: [
            {
                id: 0,
                list: [
                    {
                        id: 14,
                        name: "张孙子",
                        ancestors: [11,12], // 父母
                        sex: 0, //0男，1女
                        partner: [], //伴侣ID
                        children: [] //子女ID
                    }
                ]
            },
        ]
    }
]