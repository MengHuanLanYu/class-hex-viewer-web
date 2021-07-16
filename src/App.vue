<template>
    <div id="app">
        <button @click="changeLang('en-us')">英文</button>
        <button @click="changeLang('zh-cn')">中文</button>
        <el-divider/>
        <tree :info="dataInfo"/>
    </div>
</template>

<script>
    import jsonStr from './json';
    import tree from './components/tree';
    import {format} from "./components/util/json";

    export default {
        name: 'App',
        components: {
            tree
        },
        data() {
            return {
                dataInfo: {},
                testName: 'test'
            }
        },
        created() {
            let temp = JSON.parse(JSON.stringify(jsonStr));

            this.dataInfo = Object.assign({}, format(temp));
            console.log(this.dataInfo);
        },
        methods: {
            changeLang(type) {
                this.$i18n.locale = type;
            }
        }
    }
</script>

<style>
    *, body {
        padding: 0;
        margin: 0;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #333333;
    }
</style>
