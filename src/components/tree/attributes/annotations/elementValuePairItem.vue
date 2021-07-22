<template>
    <div class="elementValuePairs">
        <template v-if="elementValuePairInfoList && elementValuePairInfoList.length > 0">
            <div class="field-item" v-for="(item,key) in elementValuePairInfoList" :key="key">
                <node-item
                        :title="`[${prefixInt(prefixZero,len,key)}]`" text="ElementValuePair"
                        @changeExpand="item.expand = !item.expand"
                        @click.native="nodeClick(key,item)"
                        @dblclick.native="nodeDbClick(item)"
                        :is-expand="item.expand"
                        is-show-icon
                />
                <el-collapse-transition>
                    <div class="node-content" v-show="item.expand">
                        <template v-if="item.value.value.values">
                            <attribute-item @node-click="attributeNodeClick" :attribute-list="item.value.value.values"
                                            display-text="ConstElement"/>
                        </template>
                        <template v-else>
                            <attribute-item @node-click="attributeNodeClick" :attribute-list="[item.value]"
                                            display-text="ConstElement"/>
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
    import attributeItem from "../attributeItem";

    export default {
        name: "elementValuePairItem",
        mixins: [itemMixin],
        components: {
            nodeItem,
            attributeItem
        },
        props: {
            elementValuePairInfoList: {
                type: Array,
                default: undefined
            }
        },
        created() {
            this.calcPrefixStr(this.elementValuePairInfoList)
        },
        methods: {
            nodeClick(key, item) {
                this.$emit('node-click', 'elementValuePairs', item);
            }
        }
    }
</script>

<style scoped>
    .elementValuePairs {
        padding-left: 20px;
    }
</style>