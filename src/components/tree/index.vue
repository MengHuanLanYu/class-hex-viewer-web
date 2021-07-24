<template>
    <div class="class-tree">
        <template v-if="info">
            <div v-for="(item,key) in info" :key="key">
                <template v-if="item.description && item.description.length > 0">
                    <node-item @click.native="nodeClick(key,item)" :text="item.description" :title="$t(key) + ':'"/>
                </template>
                <template v-else>
                    <node-item is-show-icon :is-expand="item.expand" :title="$t(key)"
                               @dblclick.native="nodeDbClick(item)"
                               @click.native="nodeClick(key,item)"
                               @changeExpand="item.expand = !item.expand"
                    />
                    <el-collapse-transition>
                        <div class="node-content" v-show="item.expand">
                            <template v-if="key === 'constantPool'">
                                <constant-pool @node-click="nodeClick" :constant-info-list="item.constantInfoList"/>
                            </template>
                            <template v-else-if="key === 'interfaces'">
                                <interface-list @node-click="nodeClick" :interface-list="item.interfaceList"/>
                            </template>
                            <template v-else-if="key === 'fieldInfos'">
                                <field-list @node-click="nodeClick" :field-list="item.fieldList"/>
                            </template>
                            <template v-else-if="key === 'methodInfos'">
                                <method-list @node-click="nodeClick" :method-list="item.methodList"/>
                            </template>
                            <template v-else-if="key === 'attributes'">
                                <attribute-list @node-click="nodeClick" :attribute-info-list="item.attributeInfoList" />
                            </template>
                            <template v-else>
                                无
                            </template>
                        </div>
                    </el-collapse-transition>
                </template>
            </div>
        </template>
        <template v-else>
            <el-empty :description="$t('optionInfo.content.fileEmpty')"></el-empty>
        </template>
    </div>
</template>

<script>
    import nodeItem from './node';
    import constantPool from './constant_pool';
    import interfaceList from  './interfaces';
    import fieldList from './fields';
    import methodList from './methods';
    import attributeList from './attributes';

    export default {
        name: "tree",
        components: {
            nodeItem,
            constantPool,
            interfaceList,
            fieldList,
            methodList,
            attributeList
        },
        props: {
            info: {
                type: Object,
                default: null
            }
        },
        methods: {
            nodeClick(name, data) {
                console.log('click ===> %s', name, data);
                this.$eventBus.$emit('clickTreeNode',{name,data});
            },
            nodeDbClick(data) {
                data.expand = !data.expand;
            }
        }
    }
</script>

<style>

</style>