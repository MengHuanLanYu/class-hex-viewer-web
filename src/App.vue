<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {}
        },
        created() {
            this.listenKeyDown();
        },
        methods: {
            listenKeyDown() {
                // 监听键盘按下事件
                window.addEventListener('keydown', event => {
                    if (event.key === '1') {
                        let isCtrlKey = navigator.platform.match("Mac") ? event.metaKey : event.ctrlKey;
                        if (isCtrlKey && event.altKey) {
                            // 打开对话框
                            this.$eventBus.$emit('openFile');
                            //取消默认行为
                            event.preventDefault();
                            return;
                        }
                    }
                    if (process.env.NODE_ENV === 'production') {
                        //取消默认行为
                        event.preventDefault();
                    }
                });
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
        background-color: #fefefe;
    }

    .right-border{
        border-right: solid 1px #E4E7ED;
    }

    .bottom-border{
        border-bottom: solid 1px #E4E7ED;
    }

    .select-col {
        background-color: lightskyblue;
    }
</style>
