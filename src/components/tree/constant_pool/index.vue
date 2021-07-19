<template>
    <div class="constant-pool">
        <template v-if="constantInfoList && constantInfoList.length > 0">
            <div class="constant-pool-item" v-for="(item,key) in constantInfoList" :key="key">
                <node-item @click.native="nodeClick(key,item)" :title="`[${prefixInt(prefixZero,len,key + 1)}]`"
                           :text="`${item.tag ? item.tag.description : item.description}`"/>
            </div>
        </template>
    </div>
</template>

<script>
    import nodeItem from '../node';
    import {itemMixin} from "../item";


    export default {
        name: "index",
        mixins: [itemMixin],
        components: {
            nodeItem
        },
        props: {
            constantInfoList: {
                type: Array,
                default: undefined
            }
        },
        created() {
            this.calcPrefixStr(this.constantInfoList);
        },
        methods: {
            nodeClick(key, item) {
                // 这里作为保留的key，万一会用到也说不定
                this.$emit('node-click', 'constantInfoList', item);
                // console.log(key, item);
            }
        }
    }
</script>

<style scoped>
    .constant-pool {
        padding-left: 20px;
    }
</style>