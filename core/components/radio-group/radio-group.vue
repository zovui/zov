<template>
    <div :class="groupClasses">
        <slot></slot>
    </div>
</template>

<script>
    import FormDomSizeMixin from '../../mixins/form-dom-size-mixin'
    let prefix = 'zov-radio-group'
    const now = Date.now()
    const random = Math.floor(Math.random() * 10)
    const getRandomName = () => `${prefix}_${now}_${random}`

    export default {
        name: prefix,
        mixins: [FormDomSizeMixin],
        props: {
            name: {
                type: String,
                default: getRandomName()
            },
            value: {},
            disabled: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                validator (value) {
                    return ['small', 'default', 'large'].indexOf(value) !== -1
                },
                default () {
                    return 'default'
                }
            },
            // default、outline、solid
            buttonStyle: {
                type: String,
                validator (value) {
                    return ['default', 'outline', 'solid'].indexOf(value) !== -1
                },
                default: 'default'
            },
            accessibleArea: {
                type: String,
                validator (value) {
                    return ['normal', 'whole'].indexOf(value) !== -1
                },
                default: 'whole'
            },
            vertical: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            groupClasses () {
                return []
            }
        }
    }
</script>
