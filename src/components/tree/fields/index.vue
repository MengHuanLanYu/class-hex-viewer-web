<template>
    <div class="fields">
        <template v-if="fieldList && fieldList.length > 0">
            <div class="field-item" v-for="(item,key) in fieldList" :key="key">
                <node-item
                        :is-show-icon="item.attributes.attributesCount.value > 0"
                        :title="`[${prefixInt(prefixZero,len,key)}]`" :text="item.description"
                        @changeExpand="item.expand = !item.expand"
                        @click.native="nodeClick(key,item)"
                        @dblclick.native="nodeDbClick(item)"
                        :is-expand="item.expand"
                />
                <el-collapse-transition>
                    <div class="node-content" v-show="item.expand">
                        <attribute-list @node-click="attributeNodeClick"
                                        :attribute-info-list="item.attributes.attributeInfoList"/>
                    </div>
                </el-collapse-transition>
            </div>
        </template>
    </div>


</template>

<script>
    import nodeItem from '../node';
    import attributeList from '../attributes'
    import {itemMixin} from "../item";

    export default {
        name: "index",
        mixins: [itemMixin],
        components: {
            nodeItem, attributeList
        },
        props: {
            fieldList: {
                type: Array,
                default: undefined
            }
        },
        created() {
            this.calcPrefixStr(this.fieldList);
        },
        methods: {
            nodeClick(key, item) {
                // 这里作为保留的key，万一会用到也说不定
                this.$emit('node-click', 'fieldList', item);
                // console.log(key, item);
            }
        }
    }
</script>

<style scoped>
    .fields {
        padding-left: 20px;
    }
</style>