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
                    <template v-else-if="type === 'constantPool' || type === 'fieldInfos' || type === 'methodInfos'">
                        <template v-if="valueInfoTypeList">
                            <template v-for="item in valueInfoTypeList">
                                <hex-row icon="el-icon-pie-chart" :title="item.type" :value="`(${item.size})`"
                                         :key="item.type"/>
                            </template>
                        </template>
                    </template>
                    <template v-else-if="type === 'constantInfoList'">
                        <constant-info :constant-pool="constantPool" :type="typeValue" :info="valueInfo"/>
                    </template>
                    <template v-else-if="type === 'interfaceList'">
                        <hex-row :title="$t('interfaceInfo.title')"
                                 :value="`${info.description} ( ${constantPool[info.value - 1].value} )`"/>
                    </template>
                    <template v-else-if="type === 'fieldList'">
                        <field-info :constant-pool="constantPool" :info="valueInfo"/>
                    </template>
                    <template v-else-if="type === 'methodList'">
                        <method-info :constant-pool="constantPool" :info="valueInfo"/>
                    </template>
                    <template v-else-if="type === 'attributeInfoList'">
                        <attribute-info :constant-pool="constantPool" :type="typeValue" :info="valueInfo"/>
                    </template>
                </div>
            </el-card>
        </template>
    </div>
</template>

<script>
    import {getConstantPool, IGNORE_ATTRIBUTES} from "../../../util/json";
    import constantInfo from "./constantInfo";
    import fieldInfo from "./fieldInfo";
    import methodInfo from "./methodInfo";
    import attributeInfo from "./attributes";
    import hexRow from '../hexrow';
    import {toHump} from "../../../util";

    const defaultNameList = ['magicNumber', 'minorVersion', 'majorVersion', 'constantPoolCount', 'accessFlags', 'thisClass', 'superClass', 'interfacesCount', 'fieldsCount', 'methodCount', 'attributesCount'];
    export default {
        name: "index",
        components: {
            constantInfo, fieldInfo, methodInfo, attributeInfo, hexRow
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
                valueInfo: {},
                valueInfoTypeList: []
            }
        },
        watch: {
            info(n) {
                switch (this.type) {
                    case 'constantPool':
                        this.filterInfo(n, 'constantInfoList', item => item.tag, item => item.tag.description);
                        break;
                    case 'constantInfoList':
                        this.constantInfoListInfo(n);
                        break;
                    case 'fieldInfos':
                        this.filterInfo(n, 'fieldList', item => item.accessFlags, item => item.accessFlags.description);
                        break;
                    case 'methodInfos':
                        this.filterInfo(n, 'methodList', item => item.accessFlags, item => item.accessFlags.description);
                        break;
                    case 'attributeInfoList':
                        this.typeValue = n.description;
                        this.valueInfo = Object.assign({}, n);
                        break;
                    default:
                        this.valueInfo = Object.assign({}, n);
                        break;
                }
            }
        },
        created() {
            this.constantPool = getConstantPool(this.$store.state.classInfo);
        },
        methods: {
            /**
             * 过滤信息
             * @param arr
             * @param type
             * @param filterFun
             * @param mapFun
             */
            filterInfo(arr, type, filterFun, mapFun) {
                let list = [];
                arr[type].filter(filterFun).map(mapFun).forEach(item => {
                    let index = list.findIndex(s => s.type === item);
                    if (index === -1) {
                        list.push({type: item, size: 1});
                    } else {
                        list[index].size++;
                    }
                    this.valueInfoTypeList = [...list];
                })
            },
            constantInfoListInfo(n) {
                console.log(JSON.stringify(n));
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
                    this.valueInfo = Object.assign({}, info);
                } else {
                    this.typeValue = 'empty';
                    this.valueInfo = {description: n.description};
                }
            }
        }
    }
</script>

<style scoped>
    .detail-info {

    }
</style>
