<template>
    <div class="constant-pool" :style="style">
        <template v-if="constantInfoList && constantInfoList.length > 0">
            <node-item class="constant-pool-item" v-for="(item,key) in scrollConstantInfoList"
                       :key="key" @click.native="nodeClick(key,item)"
                       :title="item.titleIndex"
                       :is-selected="item.titleIndex === selectedIndex"
                       :text="`${item.tag ? item.tag.description : item.description}`">
                {{item.isChecked}}
            </node-item>
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
        computed: {
            scrollConstantInfoList() {
                return this.constantInfoList.slice(this.startIndex, this.endIndex)
            },
            style() {
                return {
                    paddingTop: `${this.paddingTop}px`,
                    paddingBottom: `${this.paddingBottom}px`
                }
            }
        },
        data() {
            return {
                startIndex: 0,
                endIndex: 30,
                paddingTop: 0,
                paddingBottom: 0,
                allHeight: 0,
                /*当前选中项*/
                selectedIndex: -1
            }
        },
        created() {
            let valLen = this.constantInfoList.length;
            this.allHeight = valLen * 30;
            this.paddingBottom = this.allHeight - this.scrollConstantInfoList.length * 30;

            this.calcPrefixStr(this.constantInfoList);
            this.constantInfoList.forEach((item, index) => {
                item.titleIndex = `[${this.prefixInt(this.prefixZero, this.len, index + 1)}]`;
            });
        },
        mounted() {
            const container = this.$parent.$refs.constantPoolNodeContent[0];
            container.addEventListener('scroll', () => {
                let top = container.scrollTop;
                this.startIndex = Math.floor(top / 30);
                this.endIndex = this.startIndex + 30;
                this.paddingTop = top;
                if (this.endIndex >= this.constantInfoList.length - 1) {
                    this.paddingBottom = 0;
                    return
                }
                this.paddingBottom = this.allHeight - 600 - top;
            });
        },
        methods: {
            nodeClick(key, item) {
                this.selectedIndex = item.titleIndex;
                // 这里作为保留的key，万一会用到也说不定
                this.$emit('node-click', 'constantInfoList', item);
                // console.log(key, item);
            }
        }
    }
</script>

<style scoped>
    .constant-pool {
        padding: 0 20px;
    }
</style>
