<template>
    <div class="annotations">
        <template v-if="annotationList && annotationList.length > 0">
            <div class="field-item" v-for="(item,key) in annotationList" :key="key">
                <node-item
                        :title="`[${prefixInt(prefixZero,len,key)}]`" text="Annotation"
                        @changeExpand="item.expand = !item.expand"
                        @click.native="nodeClick(key,item)"
                        @dblclick.native="nodeDbClick(item)"
                        :is-expand="item.expand"
                        :is-show-icon="item.numElementValuePairs && item.numElementValuePairs.value > 0"
                />

                <el-collapse-transition>
                    <div class="node-content" v-show="item.expand">
                        <template v-if="item.numElementValuePairs && item.numElementValuePairs.value > 0">
                            <element-value-pair-item @node-click="attributeNodeClick" :element-value-pair-info-list="item.elementValuePairs"/>
                        </template>
                    </div>
                </el-collapse-transition>
            </div>
        </template>
    </div>
</template>

<script>
    import {itemMixin} from "../../item";
    import nodeItem from '../../node';
    import elementValuePairItem from "./elementValuePairItem";

    export default {
        name: "index",
        mixins: [itemMixin],
        components: {
            nodeItem,
            elementValuePairItem
        },
        props: {
            annotationList: {
                type: Array,
                default: undefined
            }
        },
        created() {
            this.calcPrefixStr(this.annotationList);
        },
        methods: {
            nodeClick(key, item) {
                // 这里作为保留的key，万一会用到也说不定
                this.$emit('node-click', 'annotations', item);
                // console.log(key, item);
            }
        }
    }
</script>

<style scoped>
    .annotations {
        padding-left: 20px;
    }
</style>