<template>
    <div class="methods">
        <template v-if="methodList && methodList.length > 0">
            <div class="field-item" v-for="(item,key) in methodList" :key="key">
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
                        {{item.expand}}
                    </div>
                </el-collapse-transition>
            </div>
        </template>
    </div>



</template>

<script>
    import nodeItem from '../node';
    import {prefixInt} from "../../util";

    export default {
        name: "index",
        components: {
            nodeItem
        },
        props: {
            methodList: {
                type: Array,
                default: undefined
            }
        },
        data() {
            return {
                len: 0,
                prefixZero: ''
            }
        },
        created() {
            this.len = this.methodList ? String(this.methodList.length).length : 0;
            this.prefixZero = Array(this.len).join('0');
        },
        methods: {
            prefixInt,
            nodeClick(key, item) {
                // 这里作为保留的key，万一会用到也说不定
                this.$emit('node-click', 'methodList', item);
                // console.log(key, item);
            },
            nodeDbClick(data) {
                data.expand = !data.expand;
            }
        }
    }
</script>

<style scoped>
    .methods {
        padding-left: 20px;
    }
</style>