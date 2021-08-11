<template>
    <div class="line-number-table-attr">
        <template v-if="info.lineNumberTableLength && info.lineNumberTableLength.value">
            <el-table
                    :data="info.lineNumbers"
                    highlight-current-row
                    style="width: 100%">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column align="center" property="startPc.value" :label="$t('attributeInfo.lineNumberTable.startPc')"></el-table-column>
                <el-table-column align="center" property="lineNumber.value" :label="$t('attributeInfo.lineNumberTable.lineNumber')"></el-table-column>
            </el-table>
        </template>
        <template v-else>
            <el-empty :description="$t('optionInfo.content.fileEmpty')"></el-empty>
        </template>
    </div>
</template>

<script>
    import {infoMixin} from "../info";

    export default {
        name: "lineNumberTableAttr",
        mixins: [infoMixin]
    }
</script>

<style scoped>

</style>
