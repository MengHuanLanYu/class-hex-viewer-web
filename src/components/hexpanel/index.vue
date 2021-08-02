<template>
    <div class="hex-panel" id="hex-panel-id">
        <template v-if="hexArray && byteArray && hexArray.length && byteArray.length">
            <div class="top-fixed">
                <div class="hex-panel-top bottom-border">
                    <div class="hex-content right-border">
                        <div class="hex-panel-row hex-row">
                            <div class="hex-offset right-border">
                                offset
                            </div>
                            <div :key="item" v-for="item in 16" class="hex-number hex-panel-col"
                                 @click="isShowHex = !isShowHex">
                                <span v-show="isShowHex">
                                    {{Number(item - 1).toString(16).padStart(2,' ').toUpperCase()}}
                                </span>
                                <span v-show="!isShowHex">
                                    {{String(item - 1).padStart(2,' ')}}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="byte-content">
                        <div class="hex-panel-col byte-ascii">ASCII</div>
                    </div>
                </div>
            </div>


            <div class="hex-panel-content" id="hex-panel-content-id" ref="hexPanelContentRef">
                <div class="hex-content right-border" :style="style" @mouseleave="contentMouseleave">
                    <div :key="key" v-for="(item,key) in scrollHexArray" class="hex-panel-row hex-row auxiliary-row">
                        <div class="hex-offset right-border" @click="isShowHex = !isShowHex">
                            <span v-show="isShowHex">
                                {{item.hexStr}}
                            </span>
                            <span v-show="!isShowHex">
                                {{item.numberStr}}
                            </span>
                        </div>
                        <div v-for="(temp,index) in item.list" :key="index" class="hex-col hex-panel-col"
                             @mouseenter="contentMouseenter(key,index)"
                             :class="{'select-col':temp.isChecked}" @click="hexColClick(temp.value,key,index)">
                            {{temp.value}}
                        </div>
                    </div>
                </div>
                <div class="byte-content" :style="style">
                    <div :key="key" v-for="(item,key) in scrollByteArray" class="hex-panel-row byte-row auxiliary-row">
                        <div v-for="(temp,index) in item" :key="index" class="byte-col hex-panel-col"
                             :class="{'select-col':temp.isChecked}">
                            {{temp.value}}
                        </div>
                    </div>
                </div>
            </div>

        </template>
        <template v-else>
            <el-empty :description="$t('optionInfo.content.fileEmpty')"></el-empty>
        </template>
    </div>
</template>

<script>

    export default {
        name: "index",
        props: {
            hexArray: {
                type: Array,
                default: undefined
            },
            byteArray: {
                type: Array,
                default: undefined
            }
        },
        data() {
            return {
                hexPanelContentIdElement: undefined,
                /*是否以16进制显示*/
                isShowHex: false,
                beforeOffset: 0,
                beforeSize: 0,
                oldRow: -1,
                oldCol: -1,
                /*虚拟dom*/
                startIndex: 0,
                endIndex: 60,
                paddingTop: 0,
                paddingBottom: 22,
                allHeight: 0,
            }
        },
        computed: {
            scrollHexArray() {
                return this.hexArray.slice(this.startIndex, this.endIndex);
            },
            scrollByteArray() {
                return this.byteArray.slice(this.startIndex, this.endIndex);
            },
            style() {
                return {
                    paddingTop: `${this.paddingTop}px`,
                    paddingBottom: `${this.paddingBottom}px`
                };
            }
        },
        created() {
            let valLen = this.hexArray.length;
            this.allHeight = valLen * 30;
            this.paddingBottom = this.allHeight - this.scrollHexArray.length * 30;
            this.$eventBus.$on('clickTreeNode', this.changeNode);
        },
        mounted() {
            // 赋值
            this.hexPanelContentIdElement = document.getElementById('hex-panel-content-id');
            this.hexPanelContentIdElement.addEventListener('scroll', () => {
                let top = this.hexPanelContentIdElement.scrollTop;
                this.startIndex = Math.floor(top / 30);
                this.endIndex = this.startIndex + 60;

                this.paddingTop = top;
                if (this.endIndex >= this.hexArray.length - 1) {
                    this.paddingBottom = 0;
                    return
                }
                this.paddingBottom = this.allHeight - top;
            })
        },
        methods: {
            changeNode(value) {
                let data = value.data;
                // 取消选中
                this.changeNumberStatus(this.beforeOffset, this.beforeSize, false);
                // 添加选中
                this.changeNumberStatus(data._offset, data._size, true);
                // 记录当前下标
                this.beforeOffset = data._offset;
                this.beforeSize = data._size;

                // 计算滚动当前块
                let row = Math.floor(data._offset / 16);
                this.hexPanelContentIdElement.scrollTop = Math.max(0, row * 30);
                // 点击事件
                this.$eventBus.$emit('change-tree-node', Object.assign({}, value));
            },
            hexColClick(value, key, index) {
                let currentValue = Number.parseInt(`0x${value}`).toString().padStart(3, '0'),
                    currentOffset = key * 16 + index;
                // 点击单元格事件
                this.$eventBus.$emit('change-hex-col', {currentValue, currentOffset})
            },
            contentMouseenter(row, col) {
                if (this.$store.state.isShowAuxiliaryLine) {
                    if (this.oldRow !== row) {
                        // 改变行样式
                        this.changeRowClass(row);
                    }
                    if (this.oldCol !== col) {
                        // 改变列样式
                        this.changeColClass(col);
                    }
                }
            },
            contentMouseleave() {
                if (this.$store.state.isShowAuxiliaryLine) {
                    let allAuxiliaryLine = document.querySelectorAll('.auxiliary-line,.auxiliary-line-col');
                    if (allAuxiliaryLine) {
                        allAuxiliaryLine.forEach(item => {
                            item.classList.remove('auxiliary-line', 'auxiliary-line-col');
                        })
                    }
                    this.oldRow = this.oldCol = -1;
                }
            },
            changeRowClass(row) {
                let oldElementList = document.querySelectorAll('.auxiliary-row.auxiliary-line');
                if (oldElementList) {
                    oldElementList.forEach(item => {
                        let childList = item.querySelectorAll('.hex-panel-col.auxiliary-line');
                        if (childList) {
                            childList.forEach(temp => {
                                temp.classList.remove('auxiliary-line');
                            });
                        }
                        item.classList.remove('auxiliary-line');
                    });
                }
                let newElementList = document.querySelectorAll(`.auxiliary-row:nth-child(${row + 1})`);
                newElementList.forEach(item => {
                    item.querySelectorAll('.hex-panel-col').forEach(temp => {
                        temp.classList.add('auxiliary-line');
                    });
                    item.classList.add('auxiliary-line');
                });
                this.oldRow = row;
            },
            changeColClass(col) {
                let oldElementList = document.querySelectorAll('.auxiliary-row > .hex-panel-col.auxiliary-line-col');
                if (oldElementList) {
                    oldElementList.forEach(item => {
                        item.classList.remove('auxiliary-line-col');
                    })
                }
                let newElementList = document.querySelectorAll(`.auxiliary-row > .hex-panel-col.hex-col:nth-child(${col + 2}),.auxiliary-row > .hex-panel-col.byte-col:nth-child(${col + 1})`);
                newElementList.forEach(item => {
                    item.classList.add('auxiliary-line-col');
                });
                this.oldCol = col;
            },
            changeNumberStatus(offset, size, status) {
                // 看看在第几行
                let row = Math.floor(offset / 16), col = offset % 16;
                // console.log('偏移量[%d],偏移长度[%s] ===> [%d,%d],%s', offset, size, row, col, status);
                for (let i = 0; i < size; i++) {
                    this.hexArray[row].list[col].isChecked = status;
                    this.byteArray[row][col].isChecked = status;
                    if (++col > 15) {
                        col = 0;
                        row++;
                    }
                }

                // let selectElement = document.querySelectorAll('.select-col');
                // if (selectElement && selectElement.length) {
                //     selectElement.forEach(item => {
                //         item.classList.remove('select-col');
                //     });
                // }
                // let hexCol = document.querySelectorAll('.hex-col');
                // for (let i = 0; i < data._size; i++) {
                //     hexCol[data._offset + i].classList.add('select-col');
                // }
                // let byteCol = document.querySelectorAll('.byte-col');
                // for (let i = 0; i < data._size; i++) {
                //     byteCol[data._offset + i].classList.add('select-col');
                // }
            }
        }
    }
</script>

<style scoped>
    .hex-panel {
        font-size: 15px;
        text-align: center;
        overflow: hidden;
        height: inherit;
        /*background-color: #E4E7ED;*/
    }

    .hex-content {
        flex: 3;
        height: max-content;
    }

    .byte-content {
        width: 241px;
    }

    .hex-panel-row {
        display: grid;
    }

    .hex-row {
        grid-template-columns: 75px repeat(16, 1fr);
    }

    .byte-row {
        grid-template-columns: repeat(16, 1fr);
    }


    .hex-offset {
        /*padding: 2px;*/
        height: 21px;
        line-height: 21px;
        color: dodgerblue;
        cursor: pointer;
    }

    .hex-panel-col {
        /*padding: 2px;*/
        height: 21px;
        line-height: 21px;
        cursor: pointer;
    }

    .hex-panel-top {
        display: flex;
    }

    .hex-panel-content {
        display: flex;
        /*padding-top: 22px;*/
        padding-bottom: 22px;
        height: inherit;
        overflow: auto;
        /* flex: 1; */
        box-sizing: border-box;
    }

    .hex-col:hover {
        color: white;
        background-color: darkorange;
    }

    .auxiliary-line {
        background-color: darkorange !important;
    }

    .auxiliary-line-col {
        background-color: darkorange !important;
    }


    div {
        -moz-user-select: none; /*火狐*/
        -webkit-user-select: none; /*webkit浏览器*/
        -ms-user-select: none; /*IE10*/
        -khtml-user-select: none; /*早期浏览器*/
        user-select: none;
    }

    .top-fixed {
        /*position: fixed;*/
        /*z-index: 100;*/
        background-color: white;
        color: dodgerblue;
    }

</style>
