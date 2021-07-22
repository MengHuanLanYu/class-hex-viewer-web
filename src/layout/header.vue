<template>
    <div class="class-viewer-main-header">
        <div class="header-logo">
            <a href="/">
                <img src="../assets/logo.png"/>
            </a>
        </div>
        <div class="header-menu">
            <div class="header-menu-item">
                <el-button type="text" @click="$eventBus.$emit('openFile')">
                    {{$t('optionInfo.header.openClassFile')}} (ctrl + alt + 1)
                </el-button>
            </div>
            <div class="header-menu-item">
                <el-dropdown @command="changeLanguage">
                <span class="el-dropdown-link">
                    {{languageName}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="zhCN">中文</el-dropdown-item>
                        <el-dropdown-item command="enUS">English</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "headerLayout",
        data() {
            return {
                languageInfo: {
                    zhCN: '中文',
                    enUS: 'English'
                },
                languageName: '中文'
            }
        },
        methods: {
            changeLanguage(value) {
                this.$i18n.locale = value;
                this.languageName = this.languageInfo[value];
            }
        }

    }
</script>

<style scoped>
    .class-viewer-main-header {
        height: 60px;
        min-height: 60px;
        max-height: 60px;
        /*background-color: #F2F6FC;*/
        border-bottom: solid 1px #DCDFE6;
        display: flex;
        justify-content: space-around;
        line-height: 60px;
        padding: 5px 30px;
    }

    .header-logo {
        flex: 1;
    }

    .header-logo img {
        height: 60px;
    }

    .header-menu {
        flex: 1;
        text-align: right;
    }

    .header-menu-item {
        cursor: pointer;
        display: inline-block;
        margin: 0 15px;
    }
</style>