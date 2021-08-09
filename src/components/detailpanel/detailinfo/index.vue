<template>
    <div class="detail-info">
        <template v-if="type && info">
            <el-card>
                <div slot="header">
                    <span>详细信息</span>
                </div>
                <div class="content">
                    <template v-if="defaultNameList.indexOf(type) !== -1">
                        <template v-if="type === 'thisClass' || type === 'superClass'">
                            <hex-row :title="$t(type)"
                                     :value="`${info.description}  ( ${constantPool[info.value - 1].value} )`"/>
                        </template>
                        <template v-else>
                            <hex-row :title="$t(type)" :value="`${info.description}  (${info.value})`"/>
                        </template>
                    </template>
                    <template v-else-if="type === 'constantPool'">
                        <template v-if="constantPoolInfoList">
                            <template v-for="item in constantPoolInfoList">
                                <hex-row icon="el-icon-pie-chart" :title="item.type" :value="`(${item.size})`"
                                         :key="item.type"/>
                            </template>
                        </template>
                    </template>
                    <template v-else-if="type === 'constantInfoList'">
                        <constant-info :constant-pool="constantPool" :type="typeValue" :info="constantValue"/>
                    </template>
                    <template v-else-if="type === 'interfaceList'">
                        <hex-row :title="$t('interfaceInfo.title')" :value="`${info.description} ( ${constantPool[info.value - 1].value} )`"/>
                    </template>
                </div>
            </el-card>
        </template>
    </div>
</template>

<script>
    import {getConstantPool, IGNORE_ATTRIBUTES} from "../../../util/json";
    import constantInfo from "./constantInfo";
    import hexRow from '../hexrow';
    import {toHump} from "../../../util";

    const defaultNameList = ['magicNumber', 'minorVersion', 'majorVersion', 'constantPoolCount', 'accessFlags', 'thisClass', 'superClass', 'interfacesCount', 'fieldsCount', 'methodCount', 'attributesCount'];
    export default {
        name: "index",
        components: {
            constantInfo, hexRow
        },
        props: {
            type: {
                type: String,
                default: undefined
            },
            info: {
                type: Object,
                default: undefined
            }
        },
        data() {
            return {
                defaultNameList,
                constantPool: [],
                typeValue: '',
                constantValue: {},
                constantPoolInfoList: []
            }
        },
        watch: {
            info(n) {
                if (this.type === 'constantPool') {
                    let list = [];
                    n.constantInfoList.filter(item => item.tag).map(item => item.tag.description).forEach(item => {
                        let index = list.findIndex(s => s.type === item);
                        if (index === -1) {
                            list.push({type: item, size: 1});
                        } else {
                            list[index].size++;
                        }
                    });
                    this.constantPoolInfoList = [...list];
                } else {
                    // 要整理成这种形式
                    // {
                    //   特有属性: 值
                    //   .....
                    // }
                    if (n.tag) {
                        this.typeValue = toHump(n.tag.description);
                        let info = {};
                        Object.keys(n).filter(item => IGNORE_ATTRIBUTES.indexOf(item) === -1).forEach(item => {
                            info[item] = n[item];
                        });
                        this.constantValue = Object.assign({}, info);
                        console.log(this.constantValue);
                    } else {
                        this.typeValue = 'empty';
                        this.constantValue = {description: n.description};
                    }
                }
            }
        },
        created() {
            this.constantPool = getConstantPool(this.$store.state.classInfo);
        }
    }
</script>

<style scoped>
    .detail-info {

    }
</style>
