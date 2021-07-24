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
                            <div :key="item" v-for="item in 16" class="hex-number hex-panel-col">
                                {{String(item - 1).padStart(2,'0')}}
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
                        <div class="hex-offset right-border">
                            {{String(key * 16).padStart(8,'0')}}
                        </div>
                        <div v-for="(temp,index) in item" :key="index" class="hex-col hex-panel-col">
                            {{temp}}
                        </div>
                    </div>
                </div>
                <div class="byte-content">
                    <div :key="key" v-for="(item,key) in byteArray" class="hex-panel-row byte-row">
                        <div v-for="(temp,index) in item" :key="index" class="byte-col hex-panel-col">
                            {{temp}}
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
        data(){
            return{
                topWidth: 0
            }
        },
        created() {
            this.$eventBus.$on('clickTreeNode', this.changeNode);
            window.onresize = () => {
                this.getDivWidth();
            }
        },
        mounted() {
            this.getDivWidth();
        },
        methods: {
            changeNode({data}) {
                console.log(data._offset, data._size);
                // for (let elementsByClassNameKey in document.getElementsByClassName('hex-col')) {
                //     console.log(elementsByClassNameKey);
                // }
            },
            getDivWidth() {
                let hexPanel = document.getElementById('viewer-hex-id');
                this.topWidth = hexPanel.scrollWidth;
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
        padding: 2px;
        color: dodgerblue;
    }

    .hex-panel-col {
        padding: 2px;
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