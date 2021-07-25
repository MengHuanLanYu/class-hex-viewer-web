<template>
    <div class="class-viewer">
        <div class="class-viewer-main-container">
            <header-layout/>
            <div class="class-viewer-main">
                <router-view/>
            </div>
            <footer-layout/>
        </div>
    </div>
</template>

<script>
    import headerLayout from "./header";
    import footerLayout from "./footer";

    export default {
        name: "index",
        components: {
            headerLayout,
            footerLayout
        }

    }
</script>

<style>
    .class-viewer-main {
        height: calc(100vh - 71px - 40px);
        overflow: hidden;
    }


    ::-webkit-scrollbar {
        width: 2px;
    }

    ::-webkit-scrollbar-button {
        width: 2px;
    }

    ::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 1px rgba(144, 147, 153, .3);
        background-color: rgba(144,147,153,.3);
        border-radius: 2px;
    }
</style>