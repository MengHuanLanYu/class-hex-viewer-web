<template>
    <div class="attributes">
        <template v-if="attributeInfoList && attributeInfoList.length > 0">
            <div class="field-item" v-for="(item,key) in attributeInfoList" :key="key">
                <node-item
                        :title="`[${prefixInt(prefixZero,len,key)}]`" :text="item.description"
                        @changeExpand="item.expand = !item.expand"
                        @click.native="nodeClick(key,item)"
                        @dblclick.native="nodeDbClick(item)"
                        :is-show-icon="isExpand(item)"
                        :is-expand="item.expand"
                />
                <el-collapse-transition>
                    <div class="node-content" v-show="item.expand">
                        <template v-if="item.numAnnotations && item.numAnnotations.value > 0">
                            <annotation-item @node-click="attributeNodeClick" :annotation-list="item.annotations"/>
                        </template>
                        <template v-else-if="item.description === 'Code' && item.attributes && item.attributes.attributesCount.value > 0">
                            <index :attribute-info-list="item.attributes.attributeInfoList" @node-click="attributeNodeClick" />
                        </template>
                    </div>
                </el-collapse-transition>

            </div>
        </template>
    </div>


</template>

<script>
    import nodeItem from '../node';
    import {itemMixin} from "../item";
    import annotationItem from './annotations';

    export default {
        name: "index",
        mixins: [itemMixin],
        components: {
            nodeItem,
            annotationItem
        },
        props: {
            attributeInfoList: {
                type: Array,
                default: undefined
            }
        },
        created() {
            this.calcPrefixStr(this.attributeInfoList);
        },
        methods: {
            nodeClick(key, item) {
                // 这里作为保留的key，万一会用到也说不定
                this.$emit('node-click', 'attributeInfoList', item);
                // console.log(key, item);
            },
            /**
             * 是否可以展开
             * @param item
             */
            isExpand(item) {
                // 运行时注解
                return item.numAnnotations && item.numAnnotations.value > 0
                    // 字节码指令
                    || (item.description === 'Code' && item.attributes && item.attributes.attributesCount.value > 0);
            }
        }
    }
</script>

<style scoped>
    .attributes {
        padding-left: 20px;
    }
</style>