<template>
    <div class="node no-node">
        <div class="icon">
            <i :class="isExpand ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" @click="$emit('changeExpand')" v-show="isShowIcon"></i>
        </div>
        <div class="content">
            <div class="title">{{title}}</div>
            <div class="text">{{text}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        props: {
            isShowIcon: {
                type: Boolean,
                default: false
            },
            isExpand: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            },
            text: {
                type: String,
                default: ''
            }
        },
    }
</script>

<style scoped>
    .node {
        display: flex;
        justify-content: space-around;
        height: 25px;
        line-height: 25px;
        cursor: pointer;
        background-color: #ffffff;
    }

    .node > .icon {
        width: 20px;
    }

    .node > .content {
        flex: 1;
        display: flex;
    }

    .node:hover {
        background-color: #F2F6FC;
    }

    .node .content > .title {
        font-weight: bold;
    }

    .node .content > .text {
        margin-left: 10px;
        /*text-decoration: underline;*/
        color: #d33c16
    }

    div.content {
        -moz-user-select: none; /*火狐*/
        -webkit-user-select: none; /*webkit浏览器*/
        -ms-user-select: none; /*IE10*/
        -khtml-user-select: none; /*早期浏览器*/
        user-select: none;
    }
</style>