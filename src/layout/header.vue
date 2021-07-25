<template>
    <div class="class-viewer-main-header">
        <div class="header-logo">
            <a href="/">
                <img src="../assets/logo.png"/>
            </a>
        </div>
        <div class="header-menu">
            <div class="header-menu-item">
                <el-button icon="el-icon-folder-opened" type="text" @click="$eventBus.$emit('openFile')">
                    {{$t('optionInfo.header.openClassFile')}} (ctrl + alt + 1)
                </el-button>
            </div>
            <div class="header-menu-item">
                <el-button icon="el-icon-setting" type="text" @click="drawerVisible = true">
                    {{$t('optionInfo.header.setting')}}
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


        <!-- 右侧设置抽屉 -->
        <el-drawer title="设置" :show-close="false" :visible.sync="drawerVisible" size="230px" direction="rtl">
            <div class="setting-content">
                <div class="setting-item">
                    <div class="item-title">
                        是否显示辅助线
                    </div>
                    <div class="item-switch">
                        <el-switch
                                v-model="$store.state.isShowAuxiliaryLine"
                                active-color="#13ce66"
                                @change="changeAuxiliaryLine"
                                inactive-color="#ff4949">
                        </el-switch>
                    </div>
                </div>

            </div>
        </el-drawer>
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
                languageName: '中文',
                drawerVisible: false,
            }
        },
        methods: {
            changeLanguage(value) {
                this.$i18n.locale = value;
                this.languageName = this.languageInfo[value];
            },
            changeAuxiliaryLine(v) {
                this.$store.dispatch('setIsShowAuxiliaryLine', v);
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

    .setting-item {
        display: flex;
        justify-content: space-around;
        justify-items: center;
    }
</style>