<template>
    <div class="current-info-row">
        <div style="display: flex;align-items: center;">
            <i :class="icon"></i>
            <div class="current-info-col current-info-title">
                {{title}}
            </div>
        </div>
        <div class="current-info-col current-info-value">
            {{value}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        props: {
            icon: {
                type: String,
                default: 'el-icon-collection-tag'
            },
            title: {
                type: String,
                default: ''
            },
            value: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>
    .current-info-row {
        /*height: 22px;*/
        line-height: 22px;
        font-size: 14px;
        margin-bottom: 5px;
        display: flex;
        align-items: flex-start;
    }

    .current-info-row:last-child {
        margin-bottom: 0;
    }

    .current-info-col {
        margin-left: 5px;
    }

    .current-info-title {
        text-align: right;
        white-space: nowrap;
    }

    .current-info-title::after {
        content: ":";
    }

    .current-info-value {
        color: dodgerblue;
        word-break: break-all;
    }
</style>
