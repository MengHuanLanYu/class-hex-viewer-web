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
                                        {{`(${constantPool[item.substring(item.indexOf('#') + 1) - 1].value})`}}
                                    </span>
                                </template>
                            </p>
                        </template>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('attributeInfo.code.exceptionTable.name')">配置管理</el-tab-pane>
            <el-tab-pane :label="$t('attributeInfo.code.otherInfo.name')">角色管理</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {infoMixin} from "../info";

    export default {
        name: "code",
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
