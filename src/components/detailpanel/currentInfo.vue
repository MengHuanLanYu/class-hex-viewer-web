<template>
    <div class="current-info">
        <el-card class="box-card">
            <div slot="header">
                <span>{{$t('optionInfo.content.detailInfo.title')}}</span>
            </div>
            <div class="current-info-row">
                <div class="current-info-col current-info-title">
                    {{$t('optionInfo.content.detailInfo.offsetAddress')}}
                </div>
                <div class="current-info-col current-info-value">
                    {{offset}}
                </div>
                <div class="current-info-col current-info-title">
                    {{$t('optionInfo.content.detailInfo.offsetValue')}}
                </div>
                <div class="current-info-col current-info-value">
                    {{value}}
                </div>
            </div>

            <div class="current-info-row">
                <div class="current-info-col current-info-title">
                    {{$t('optionInfo.content.detailInfo.block')}}
                </div>
                <div class="current-info-col current-info-value">
                    {{begin === -1 ? '' : `${begin} - ${begin + size}`}}
                </div>
                <div class="current-info-col current-info-title">
                    {{$t('optionInfo.content.detailInfo.size')}}
                </div>
                <div class="current-info-col current-info-value">
                    {{begin === -1 ? '' : size}}
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "currentInfo",
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
    .current-info-row {
        height: 22px;
        line-height: 22px;
        font-size: 14px;
        margin-bottom: 5px;
    }

    .current-info-row:last-child{
        margin-bottom: 0;
    }

    .current-info-col {
        display: inline-block;
    }

    .current-info-title {
        text-align: right;
        width: 20%;
    }

    .current-info-title::after {
        content: ":";
        margin: 0 5px;
    }

    .current-info-value {
        color: dodgerblue;
        width: 30%;
    }
</style>