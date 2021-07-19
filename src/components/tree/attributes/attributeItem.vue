<template>
    <div class="attributes">
        <template v-if="attributeList && attributeList.length > 0">
            <div class="field-item" v-for="(item,key) in attributeList" :key="key">
                <node-item
                        :title="`[${prefixInt(prefixZero,len,key)}]`" :text="displayText"
                        @changeExpand="item.expand = !item.expand"
                        @click.native="nodeClick(key,item)"
                        @dblclick.native="nodeDbClick(item)"
                        :is-expand="item.expand"
                        :is-show-icon="item[childText] && item[childText].value > 0"
                />
                <template v-if="item[childText] && item[childText].value > 0">
                    <el-collapse-transition>
                        <div class="node-content" v-show="item.expand">
                            <index :attribute-info-list="item.annotations"/>
                        </div>
                    </el-collapse-transition>
                </template>
            </div>
        </template>
    </div>
</template>

<script>
    import {itemMixin} from "../item";
    import nodeItem from '../node'

    export default {
        name: "attributeItem",
        mixins: [itemMixin],
        components: {
            nodeItem
        },
        props: {
            attributeList: {
                type: Array,
                default: undefined
            },
            displayText: {
                type: String,
                default: ''
            },
            childText: {
                type: String,
                default: ''
            }
        },
        methods: {
            nodeClick(key, item) {
                // 这里作为保留的key，万一会用到也说不定
                this.$emit('node-click', this.displayText, item);
                // console.log(key, item);
            }
        }
    }
</script>

<style scoped>
    .attributes {
        padding-left: 20px;
    }
</style>