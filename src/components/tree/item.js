import {prefixInt} from "../util";

export const itemMixin = {
    data() {
        return {
            len: 0,
            prefixZero: ''
        }
    },
    methods: {
        prefixInt,
        /**
         * 计算填充串
         * @param arrays
         */
        calcPrefixStr(arrays) {
            this.len = arrays ? String(arrays.length).length : 0;
            this.prefixZero = Array(this.len).join('0');
        },
        nodeDbClick(data) {
            data.expand = !data.expand;
        },
        attributeNodeClick(key, item) {
            console.log('the itemMixin [attributeNodeClick] method out put , key ==> [%s] , item ==> [%s]', key, JSON.stringify(item));
            this.$emit('node-click', key, item);
        }
    }
}