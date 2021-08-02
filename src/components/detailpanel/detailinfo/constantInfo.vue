<template>
    <div class="constant-info">
        <template v-if="info">

        </template>
        <template v-if="type === 'empty'">
            <hex-row :title="$t(`constantPoolInfo.${type}`)" :value="info.description"/>
        </template>
        <template v-else-if="type === 'constantUtf8Info'">
            <hex-row :title="$t(`constantPoolInfo.constantUtf8Info.bytes`)"
                     :value="`${info.bytes.description.length}`"/>
            <hex-row :title="$t(`constantPoolInfo.constantUtf8Info.length`)" :value="`${info.length.description}`"/>
            <hex-row :title="$t(`constantPoolInfo.constantUtf8Info.description`)" :value="`${info.description}`"/>
        </template>
        <template v-else-if="type === 'constantStringInfo'">
            <hex-row :title="$t(`constantPoolInfo.constantStringInfo.description`)" :value="`${info.description} ( ${constantPool[info.index.value - 1].value} )`"/>
        </template>
        <template v-else-if="type === 'constantLongInfo' || type === 'constantDoubleInfo'">
            <hex-row :title="$t(`constantPoolInfo.${type}.highBytes`)"
                     :value="`${info.highBytes.description}`"/>
            <hex-row :title="$t(`constantPoolInfo.${type}.lowBytes`)" :value="`${info.lowBytes.description}`"/>
            <hex-row :title="$t(`constantPoolInfo.${type}.description`)" :value="`${info.description}`"/>
        </template>
        <template v-else-if="type === 'constantIntegerInfo' || type === 'constantFloatInfo'">
            <hex-row :title="$t(`constantPoolInfo.${type}.bytes`)" :value="`${info.bytes.description}`"/>
            <hex-row :title="$t(`constantPoolInfo.${type}.description`)" :value="`${info.description}`"/>
        </template>

        <template v-else>
            <template v-for="(item,key) in info">
                <hex-row :key="key" :title="$t(`constantPoolInfo.${type}.${key}`)"
                         :value="`${item.description} ( ${constantPool[item.value - 1].value} )`"/>
            </template>
        </template>
    </div>
</template>

<script>
    import hexRow from '../hexrow';

    export default {
        name: "constantInfo",
        components: {
            hexRow
        },
        props: {
            constantPool: {
                type: Array,
                default: () => []
            },
            type: {
                type: String,
                default: undefined
            },
            info: {
                type: Object,
                default: undefined
            }
        }
    }
</script>

<style scoped>
</style>
