module.exports = {
    optionInfo: {
        header: {
            openClassFile: 'open class file',
            setting: 'setting'
        },
        content: {
            fileEmpty: 'no content',
            detailInfo: {
                title: 'current info',
                offsetAddress: 'Offset',
                offsetValue: 'Value',
                block: 'Block',
                size: 'Size'
            }
        },
        message: {
            tip: {
                fileEmptyTip: 'please drag and drop a file or manually select a file'
            },
            error: {
                fileTypeError: 'file type is incorrect, Please select a class file',
                fileSizeError: 'file size exceeds the limit'
            }
        }
    },
    magicNumber: 'magic',
    minorVersion: 'minor_version',
    majorVersion: 'major_version',
    constantPoolCount: 'constant_pool_count',
    constantPool: 'constant_pool (count - 1)',
    constantPoolInfo: {
        constantUtf8Info: {
            bytes: 'bytes',
            length: 'length',
            description: 'description'
        },
        constantIntegerInfo: {
            bytes: 'bytes',
            description: 'Integer'
        },
        constantFloatInfo: {
            bytes: 'bytes',
            description: 'Float'
        },
        constantLongInfo: {
            highBytes: 'highBytes',
            lowBytes: 'lowBytes',
            description: 'Long'
        },
        constantDoubleInfo: {
            highBytes: 'highBytes',
            lowBytes: 'lowBytes',
            description: 'Double'
        },
        constantClassInfo: {
            index: 'className'
        },
        constantStringInfo: {
            description: 'String'
        },
        constantFieldrefInfo: {
            classInfo: 'classInfo',
            nameAndType: 'nameAndType'
        },
        constantMethodrefInfo: {
            classInfo: 'classInfo',
            nameAndType: 'nameAndType'
        },
        constantInterfaceMethodrefInfo: {
            classInfo: 'classInfo',
            nameAndType: 'nameAndType'
        },
        constantNameAndTypeInfo: {
            name: 'name',
            describe: 'describe'
        },
        constantMethodHandleInfo: {
            referenceKind: 'referenceKind',
            referenceIndex: 'referenceIndex'
        },
        constantMethodTypeInfo: {
            descriptorIndex: 'descriptorIndex'
        },
        constantDynamicInfo: {
            bootstrapMethodAttrIndex: 'bootstrapMethodAttrIndex',
            nameAndTypeIndex: 'nameAndTypeIndex'
        },
        constantInvokeDynamicInfo: {
            bootstrapMethodAttrIndex: 'bootstrapMethodAttrIndex',
            nameAndTypeIndex: 'nameAndTypeIndex'
        },
        constantModuleInfo: {
            nameIndex: 'nameIndex'
        },
        constantPackageInfo: {
            nameIndex: 'nameIndex'
        },
        empty: '描述'
    },
    accessFlags: 'access_flags',
    thisClass: 'this_class',
    superClass: 'super_class',
    interfacesCount: 'interfaces_count',
    interfaces: 'interfaces',
    interfaceInfo: {
        title: 'interface'
    },
    fieldsCount: 'fields_count',
    fieldInfos: 'fields',
    methodsCount: 'methods_count',
    methodInfos: 'methods',
    attributesCount: 'attributes_count',
    attributes: 'attributes'
};
