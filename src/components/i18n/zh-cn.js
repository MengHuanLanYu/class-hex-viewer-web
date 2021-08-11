module.exports = {
    optionInfo: {
        header: {
            openClassFile: '打开类文件',
            setting: '设置'
        },
        content: {
            fileEmpty: '暂无内容',
            detailInfo: {
                title: '当前信息',
                offsetAddress: '偏移地址',
                offsetValue: '值',
                block: '选区',
                size: '大小'
            }
        },
        message: {
            tip: {
                fileEmptyTip: '请拖拽一个文件或手动选择一个文件'
            },
            error: {
                fileTypeError: '文件类型错误,请选择类文件',
                fileSizeError: '文件大小超出限制'
            }
        }
    },
    magicNumber: '魔数',
    minorVersion: '次版本号',
    majorVersion: '主版本号',
    constantPoolCount: '常量池计数',
    constantPool: '常量池 (数量 - 1)',
    constantPoolInfo: {
        constantUtf8Info: {
            bytes: '字节数组长度',
            length: '字符串长度',
            description: '字符串'
        },
        constantIntegerInfo: {
            bytes: '字节',
            description: '值'
        },
        constantFloatInfo: {
            bytes: '字节',
            description: '值'
        },
        constantLongInfo: {
            highBytes: '高位字节',
            lowBytes: '低位字节',
            description: '值'
        },
        constantDoubleInfo: {
            highBytes: '高位字节',
            lowBytes: '低位字节',
            description: '值'
        },
        constantClassInfo: {
            index: '类名'
        },
        constantStringInfo: {
            description: '字符串'
        },
        constantFieldrefInfo: {
            classInfo: '类信息',
            nameAndType: '名字和类型'
        },
        constantMethodrefInfo: {
            classInfo: '类信息',
            nameAndType: '名字和类型'
        },
        constantInterfaceMethodrefInfo: {
            classInfo: '类信息',
            nameAndType: '名字和类型'
        },
        constantNameAndTypeInfo: {
            name: '名字',
            describe: '描述符'
        },
        constantMethodHandleInfo: {
            referenceKind: '引用类型',
            referenceIndex: '引用序号'
        },
        constantMethodTypeInfo: {
            descriptorIndex: '方法描述索引'
        },
        constantDynamicInfo: {
            bootstrapMethodAttrIndex: '引导方法表索引',
            nameAndTypeIndex: '方法名和描述符'
        },
        constantInvokeDynamicInfo: {
            bootstrapMethodAttrIndex: '引导方法表索引',
            nameAndTypeIndex: '方法名和描述符'
        },
        constantModuleInfo: {
            nameIndex: '模块名字'
        },
        constantPackageInfo: {
            nameIndex: '包名称'
        },
        empty: '描述'
    },
    accessFlags: '访问标志',
    thisClass: '类索引',
    superClass: '父类索引',
    interfacesCount: '接口索引计数',
    interfaces: '接口索引集合',
    interfaceInfo: {
        title: '接口'
    },
    fieldsCount: '字段数量',
    fieldInfos: '字段集合',
    fieldInfo: {
        accessFlags: '访问标识',
        nameIndex: '名字',
        descriptorIndex: '描述符'
    },
    methodCount: '方法数量',
    methodInfos: '方法集合',
    methodInfo: {
        accessFlags: '访问标识',
        nameIndex: '名字',
        descriptorIndex: '描述符'
    },
    attributesCount: '属性表数量',
    attributes: '属性表集合',
    attributeInfo: {
        attributeNameIndex: '属性名索引',
        attributeLength: '属性长度',
        code: {
            codes: '字节码',
            exceptionTable: {
                name: '异常表',
                startPc: '起始PC',
                endPc: '结束PC',
                handlerPc: '跳转PC',
                catchType: '捕捉类型'
            },
            otherInfo: {
                name: '其他信息',
                maxStack: '操作数栈最大深度',
                maxLocals: '局部变量表最大槽数',
                codeLength: '字节码长度'
            }
        },
        lineNumberTable: {
            startPc: '起始PC',
            lineNumber: '行号'
        }
    }
};
