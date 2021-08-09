<template>
    <div class="method-info">
        <hex-row :title="$t(`methodInfo.nameIndex`)" :value="`${info.nameIndex.description} <${constantPool[info.nameIndex.value - 1].value}>`"/>
        <hex-row :title="$t(`methodInfo.descriptorIndex`)" :value="`${info.descriptorIndex.description} <${constantPool[info.descriptorIndex.value - 1].value}>`"/>
        <hex-row :title="$t(`methodInfo.accessFlags`)" :value="`0x${Number(info.accessFlags.value).toString(16).toUpperCase().padStart(4,'0')} (${info.accessFlags.description})`"/>
    </div>
</template>

<script>
    import {infoMixin} from "./info";
    export default {
        name: "methodInfo",
        mixins: [infoMixin],
    }
</script>

<style scoped>

</style>
