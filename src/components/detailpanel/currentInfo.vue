<template>
    <div class="current-info">
        <el-card>
            <div slot="header">
                <span>{{$t('optionInfo.content.detailInfo.title')}}</span>
            </div>
            <hex-row icon="el-icon-location-information" :title="$t('optionInfo.content.detailInfo.offsetAddress')"
                     :value="offset"/>
            <hex-row icon="el-icon-coin" :title="$t('optionInfo.content.detailInfo.offsetValue')" :value="`${value}`"/>
            <hex-row icon="el-icon-s-grid" :title="$t('optionInfo.content.detailInfo.block')"
                     :value="begin === -1 ? '' : `${begin} - ${begin + size}`"/>
            <hex-row icon="el-icon-tickets" :title="$t('optionInfo.content.detailInfo.size')"
                     :value="begin === -1 ? '' : `${size}`"/>
        </el-card>
    </div>
</template>

<script>
    import hexRow from './hexrow';

    export default {
        name: "currentInfo",
        components: {
            hexRow
        },
        props: {
            value: {
                type: String
            },
            offset: {
                type: String
            },
            begin: {
                type: Number,
                default: -1
            },
            size: {
                type: Number,
                default: -1
            }
        }
    }
</script>

<style scoped>

</style>