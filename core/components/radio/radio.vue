<template>
    <label :class="classes">
        <span :class="radioClasses">
            <span :class="innerClasses"></span>
            <input
                type="radio"
                :class="inputClasses"
                :disabled="disabled"
                :name="groupName"
                v-model="currentValue"
                :value="label">
        </span>
        <span :class="labelClasses">
        <slot>{{ label }}</slot>
        </span>
    </label>
</template>

<script>
    const prefix = 'zov-radio'
    const parentName = prefix + '-group'

    import FormDomSizeMixin from '../../mixins/form-dom-size-mixin'
    import { findComponentUpward } from '../../utils'

    export default {
        name: prefix,
        mixins: [ FormDomSizeMixin ],
        props: {
            name: String,
            value: {},
            label: {
                type: [String, Number]
            },
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
            trueValue: {
                type: [Boolean, String, Number],
                default: true
            },
            falseValue: {
                type: [Boolean, String, Number],
                default: false
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
            }
        },
        data () {
            return {
                stylePrefix: prefix,
                parent: findComponentUpward(this, parentName),
                groupName: this.name,
                // groupDisabled: this.disabled,
            }
        },
        computed: {
            classes () {
                return [
                    this.stylePrefix + '-wrapper',
                    this.sizeClasses,
                    {
                        [this.stylePrefix + '-button-' + this.buttonStyle]: this.buttonStyle && this.buttonStyle !== 'default',
                        [this.stylePrefix + '-disabled']: this.disabled,
                        [this.stylePrefix + '-checked']: this.currentValue === this.label
                    }
                ];
            },
            radioClasses () {
                return [
                    this.stylePrefix
                ]
            },
            innerClasses () {
                return [
                    this.stylePrefix + '-inner'
                ]
            },
            inputClasses () {
                return [
                    this.stylePrefix + '-input'
                ]
            },
            labelClasses () {
                return [
                    this.stylePrefix + '-label'
                ]
            },
            currentValue: {
                get() {
                    return this.parent ? this.parent.value : this.value;
                },
                set(val) {
                    if (this.parent) {
                        this.parent.$emit('input', val);
                    }
                    else {
                        this.$emit('input', val);
                    }
                }
            }
        },
        mounted () {
            if (this.parent) {
                this.groupName = this.parent.name;
            }
        }
    }
</script>
