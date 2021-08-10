<template>
    <div class="attributes-info">
        <hex-row :title="$t('attributeInfo.attributeNameIndex')" :value="`${info.attributeNameIndex.description} <${type}>`" />
        <hex-row :title="$t('attributeInfo.attributeLength')" :value="info.attributeLength.description" />

        <template v-if="type === 'Code'">
            <code-attr :constant-pool="constantPool" :info="info" />
        </template>
    </div>
</template>

<script>
    import {infoMixin} from "../info";
    import codeAttr from "./codeAttr";
    export default {
        name: "index",
        components: {
            codeAttr
        },
        mixins: [infoMixin],
    }
</script>

<style scoped>

</style>
