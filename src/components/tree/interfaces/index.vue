<template>
    <div class="interfaces">
        <template v-if="interfaceList && interfaceList.length > 0">
            <div class="interface-item" v-for="(item,key) in interfaceList" :key="key">
                <node-item :title="`${$t('interfaceInfo.title')} [${prefixInt(prefixZero,len,key)}]`" :text="item.description"
                        @click.native="nodeClick(key,item)"
                />
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
            interfaceList: {
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
            this.len = this.interfaceList ? String(this.interfaceList.length).length : 0;
            this.prefixZero = Array(this.len).join('0');
        },
        methods: {
            prefixInt,
            nodeClick(key, item) {
                // 这里作为保留的key，万一会用到也说不定
                this.$emit('node-click', 'interfaceList', item);
                // console.log(key, item);
            }
        }
    }
</script>

<style scoped>
    .interfaces {
        padding-left: 20px;
    }
</style>