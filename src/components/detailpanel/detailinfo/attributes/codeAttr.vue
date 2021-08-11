<template>
    <div class="code-attr">
        <el-tabs type="border-card">
            <el-tab-pane :label="$t('attributeInfo.code.codes')">
                <div class="codes">
                    <div v-for="(item,key) in info.codes" :key="key" class="code">
                        <template v-if="item !== '\n'">
                            <p>{{key}}</p>
                            <p>
                                <span>{{item}}</span>
                                <template v-if="item.indexOf('#') !== -1">
                                    <span class="constant-index">
                                        {{`(${constantPool[parseInt(item.substring(item.indexOf('#') + 1)) - 1].value})`}}
                                    </span>
                                </template>
                            </p>
                        </template>
                    </div>
                </div>
            </el-tab-pane>
            <template v-if="info.exceptionTableLength && info.exceptionTableLength.value">
                <el-tab-pane :label="$t('attributeInfo.code.exceptionTable.name')">
                    <el-table
                            :data="info.exceptionTables"
                            highlight-current-row
                            style="width: 100%">
                        <el-table-column type="index" width="50"></el-table-column>
                        <el-table-column align="center" width="70" property="startPc.value" :label="$t('attributeInfo.code.exceptionTable.startPc')"></el-table-column>
                        <el-table-column align="center" width="70" property="endPc.value" :label="$t('attributeInfo.code.exceptionTable.endPc')"></el-table-column>
                        <el-table-column align="center" property="handlerPc.value" :label="$t('attributeInfo.code.exceptionTable.handlerPc')"></el-table-column>
                        <el-table-column :label="$t('attributeInfo.code.exceptionTable.catchType')">
                            <template slot-scope="{row}">
                                <p>{{`cp_info #${row.catchType.description}`}}</p>
                                <p>
                                    <template v-if="row.catchType.value > 0">
                                        {{constantPool[row.catchType.value - 1].value}}
                                    </template>
                                    <template v-else>
                                        any
                                    </template>
                                </p>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </template>
            <el-tab-pane :label="$t('attributeInfo.code.otherInfo.name')">
                <hex-row :title="$t('attributeInfo.code.otherInfo.maxStack')" :value="info.maxStack.description" />
                <hex-row :title="$t('attributeInfo.code.otherInfo.maxLocals')" :value="info.maxLocals.description" />
                <hex-row :title="$t('attributeInfo.code.otherInfo.codeLength')" :value="info.codeLength.description" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {infoMixin} from "../info";

    export default {
        name: "codeAttr",
        mixins: [infoMixin],
    }
</script>

<style scoped>
    .codes .code {
        display: flex;
    }

    .codes .code > p {
        margin: 2px 5px;
        font-size: 14px;
    }

    .codes .code > p:first-child {
        width: 30px;
        text-align: right;
    }

    .codes .code > p:last-child {
        font-weight: bold;
    }

    .codes .code > p > .constant-index {
        color: dodgerblue;
    }
</style>
