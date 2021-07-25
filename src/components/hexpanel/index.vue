<template>
    <div class="hex-panel" id="hex-panel-id">
        <template v-if="hexArray && byteArray && hexArray.length > 0 && byteArray.length > 0">
            <div class="top-fixed" :style="{width: `${topWidth}px`}">
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


            <div class="hex-panel-content">
                <div class="hex-content right-border">
                    <div :key="key" v-for="(item,key) in hexArray" class="hex-panel-row hex-row">
                        <div class="hex-offset right-border" @click="isShowHex = !isShowHex">
                            <span v-show="isShowHex">
                                {{Number(key * 16).toString(16).padStart(8,'0').toUpperCase()}}
                            </span>
                            <span v-show="!isShowHex">
                                {{String(key * 16).padStart(8,'0')}}
                            </span>
                        </div>
                        <div v-for="(temp,index) in item" :key="index" class="hex-col hex-panel-col"
                             :class="{'select-col':temp.isChecked}" @click="hexColClick(temp.value,key,index)">
                            {{temp.value}}
                        </div>
                    </div>
                </div>
                <div class="byte-content">
                    <div :key="key" v-for="(item,key) in byteArray" class="hex-panel-row byte-row">
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
    import elementResizeDetector from 'element-resize-detector';

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
                topWidth: 0,
                /*元素大小发生变化*/
                elementResize: elementResizeDetector(),
                /*父级元素*/
                viewerHexIdElement: undefined,
                /*是否以16进制显示*/
                isShowHex: false,
                beforeOffset: 0,
                beforeSize: 0,
            }
        },
        created() {
            this.$eventBus.$on('clickTreeNode', this.changeNode);
        },
        mounted() {
            // 赋值
            this.viewerHexIdElement = document.getElementById('viewer-hex-id');
            this.getDivWidth();
            // 监听div变化
            this.elementResize.listenTo(document.getElementById('viewer-hex-id'), () => {
                // 变化
                console.log('viewer-tree-menu change size')
                this.getDivWidth();
            });
            // 监听窗口变化
            window.onresize = () => {
                this.getDivWidth();
            }
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
                let row = Math.floor(data._offset / 16), col = data._offset % 16;
                let beforeIndex = (row * 16) + col;
                let currentOffsetTop = document.querySelectorAll('.hex-col')[beforeIndex].offsetTop,
                    contentOffsetTop = this.viewerHexIdElement.offsetTop;
                this.viewerHexIdElement.scrollTop = Math.max(0, currentOffsetTop - contentOffsetTop - 22);
                // 点击事件
                this.$eventBus.$emit('change-tree-node', Object.assign({}, value));
            },
            hexColClick(value, key, index) {
                let currentValue = Number.parseInt(`0x${value}`).toString().padStart(3, '0'),
                    currentOffset = key * 16 + index;
                // 点击单元格事件
                this.$eventBus.$emit('change-hex-col', {currentValue, currentOffset})
            },
            getDivWidth() {
                this.topWidth = this.viewerHexIdElement.scrollWidth;
            },
            changeNumberStatus(offset, size, status) {
                // 看看在第几行
                let row = Math.floor(offset / 16), col = offset % 16;
                console.log('偏移量[%d],偏移长度[%s] ===> [%d,%d],%s', offset, size, row, col, status);
                for (let i = 0; i < size; i++) {
                    this.hexArray[row][col].isChecked = status;
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
        /*background-color: #E4E7ED;*/
    }

    .hex-content {
        flex: 3;
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
        padding-top: 22px;
    }

    .select-col {
        background-color: lightskyblue;
    }

    div {
        -moz-user-select: none; /*火狐*/
        -webkit-user-select: none; /*webkit浏览器*/
        -ms-user-select: none; /*IE10*/
        -khtml-user-select: none; /*早期浏览器*/
        user-select: none;
    }

    .top-fixed {
        position: fixed;
        z-index: 100;
        background-color: white;
        color: dodgerblue;
    }

</style>