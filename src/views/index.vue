<template>
    <div class="class-hex-viewer" id="class-hex-viewer" ref="classHexViewerRef">
        <template v-if="!contentIsEmpty">
            <div class="viewer-main">
                <div class="viewer-item viewer-tree-menu right-border" id="viewer-tree-menu-id">
                    <tree :info="treeNodeInfo"/>
                </div>
                <div class="viewer-item viewer-hex right-border" id="viewer-hex-id">
                    <hex-panel :byte-array="contentInfo.byteArray" :hex-array="contentInfo.hexArray"/>
                </div>
                <div class="viewer-item viewer-tools">
                    <detail-panel/>
                </div>
            </div>
        </template>
        <template v-else>
            <el-empty :description="$t('optionInfo.content.fileEmpty')">
                <p style="font-size: 14px; margin-bottom: 20px; color: #909399;">
                    {{$t('optionInfo.message.tip.fileEmptyTip')}}</p>
                <el-button type="primary" size="mini" @click="$refs.fileInputRef.click()">
                    {{$t('optionInfo.header.openClassFile')}} (ctrl + alt + 1)
                </el-button>
            </el-empty>
        </template>
        <input type="file" ref="fileInputRef" id="fileInput" accept=".class" @change="changeFile"
               style="filter:alpha(opacity=0);opacity:0;width: 0;height: 0;"/>
    </div>
</template>

<script>
    import {uploadFile} from '../api';
    import tree from '../components/tree';
    import hexPanel from '../components/hexpanel';
    import detailPanel from '../components/detailpanel';
    import {format} from "../util/json";
    import {readFileByte} from "../util";

    export default {
        name: "index",
        components: {
            tree, hexPanel, detailPanel
        },
        data() {
            return {
                contentIsEmpty: true,
                treeNodeInfo: undefined,
                contentInfo: {
                    byteArray: [],
                    hexArray: []
                },
                isLoading: false
            }
        },
        created() {
            // 监听事件
            this.$eventBus.$on('openFile', () => {
                // this.$refs.fileInputRef.click();
                document.getElementById('fileInput').click();
            });
        },
        mounted() {
            this.listenerPageDrag();
        },
        methods: {
            changeFile(event) {
                if (event.target.files.length) {
                    let file = event.target.files[0];
                    this.upload(file);
                }
            },
            listenerPageDrag() {
                // 监听拖动
                this.$refs.classHexViewerRef.ondragleave = (e) => {
                    e.preventDefault()  // 阻止离开时的浏览器默认行为
                }
                this.$refs.classHexViewerRef.ondrop = (e) => {
                    e.preventDefault()    // 阻止拖放后的浏览器默认行为
                    const data = e.dataTransfer.files[0]  // 获取文件对象
                    if (data.length < 1) {
                        return  // 检测是否有文件拖拽到页面
                    }
                    //上传文件的方法
                    this.upload(data)
                }
                this.$refs.classHexViewerRef.ondragenter = (e) => {
                    // 阻止拖来拖去的浏览器默认行为
                    e.stopPropagation();
                    e.preventDefault();
                }
                this.$refs.classHexViewerRef.ondragover = (e) => {
                    // 阻止拖来拖去的浏览器默认行为
                    e.stopPropagation();
                    e.preventDefault()
                }
            },
            upload(file) {
                // 判断下大小 10485760
                if (file.size > 10 * 1024 * 1024) {
                    this.$message.warning(this.$t('optionInfo.message.error.fileSizeError'));
                    return false;
                }
                let ext = file.name.substring(file.name.lastIndexOf('.'));
                if (ext !== '.class') {
                    this.$message.warning(this.$t('optionInfo.message.error.fileTypeError'));
                    return false;
                }
                // 开始上传解析
                let formData = new FormData();
                formData.set('file', file);
                this.isLoading = true;
                readFileByte(file).then(data => {
                    this.contentInfo = Object.assign({}, data);
                });
                uploadFile(formData).then(data => {
                    if (data.data) {
                        this.treeNodeInfo = Object.assign({}, format(data.data));
                        this.$store.dispatch('setClassInfo', Object.assign({}, this.treeNodeInfo));
                        this.isLoading = false;
                        this.contentIsEmpty = false;
                    } else {
                        this.treeNodeInfo = undefined;
                        this.contentInfo = {
                            byteArray: [],
                            hexArray: []
                        };
                    }
                });

            }
        }
    }
</script>

<style scoped>
    .class-hex-viewer {
        padding: 0 10px;
    }

    .viewer-main {
        display: flex;
        justify-content: space-around;
    }

    .viewer-item {
        overflow-y: auto;
        overflow-x: hidden;
        height: calc(100vh - 71px - 40px);
    }

    .viewer-tree-menu {
        padding: 0 20px 10px 0;
    }

    .viewer-hex {
        flex: 4;
    }

    .viewer-tools {
        flex: 2;
    }
</style>