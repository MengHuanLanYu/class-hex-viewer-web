<template>
    <div class="detail-panel">
        <div class="current-info">
            <current-info :offset="currentOffset" :value="currentValue" :size="offsetSize" :begin="offsetBegin"/>
        </div>
    </div>
</template>

<script>
    import currentInfo from "./currentInfo";

    export default {
        name: "index",
        components: {
            currentInfo
        },
        data() {
            return {
                /*当前选中值*/
                currentValue: '',
                /*当前偏移地址*/
                currentOffset: '',
                /*偏移起始位置*/
                offsetBegin: -1,
                /*偏移大小*/
                offsetSize: -1
            }
        },
        created() {
            // 监听事件
            this.$eventBus.$on('change-hex-col', this.changeHexCol);
            this.$eventBus.$on('change-tree-node', this.changeTreeNode)
        },
        methods: {
            changeHexCol(data) {
                this.currentValue = String(data.currentValue);
                this.currentOffset = String(data.currentOffset);
            },
            changeTreeNode(value) {
                console.log(value);
                let data = value.data;
                this.offsetBegin = data._offset;
                this.offsetSize = data._size;
            }
        }
    }
</script>

<style scoped>
    .detail-panel {
        padding: 10px;
    }


</style>