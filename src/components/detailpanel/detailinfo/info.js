import hexRow from "../hexrow/index";
export const infoMixin = {
    components: {
        hexRow
    },
    props: {
        constantPool: {
            type: Array,
            default: () => []
        },
        type: {
            type: String,
            default: undefined
        },
        info: {
            type: Object,
            default: undefined
        }
    }
};
