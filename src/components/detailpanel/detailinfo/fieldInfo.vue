<template>
    <div class="field-info">
        <hex-row :title="$t(`fieldInfo.nameIndex`)" :value="`${info.nameIndex.description} <${constantPool[info.nameIndex.value - 1].value}>`"/>
        <hex-row :title="$t(`fieldInfo.descriptorIndex`)" :value="`${info.descriptorIndex.description} <${constantPool[info.descriptorIndex.value - 1].value}>`"/>
        <hex-row :title="$t(`fieldInfo.accessFlags`)" :value="`0x${Number(info.accessFlags.value).toString(16).toUpperCase().padStart(4,'0')} (${info.accessFlags.description})`"/>
    </div>
</template>

<script>
    import {infoMixin} from "./info";
    export default {
        name: "fieldInfo",
        mixins: [infoMixin],
    }
</script>

<style scoped>

</style>
