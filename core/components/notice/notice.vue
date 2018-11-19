<template>
    <transition-group
        :class="'zov-' + type"
        :name="(type === 'message') ? 'zov-slide-uu' : 'zov-slide-rr'"
        tag="ul"
    >
        <li class="zov-notice-case"
            v-for="(item, index) in list"
            :key="index"
            v-timer="{'item':item, 'index':index}"
        ><!-- #002 -->
            <Icon
                iconname="zov-icon-close"
                v-if="item.closable !== false"
                class="zov-notice-case-close"
                @click="remove(index); item.onClose && item.onClose()"
            />
            <Icon
                :iconname="iconnames[item.status]"
                v-if="item.status !== 'open'"
                :class="[
                    'zov-notice-case-icon',
                    {
                        ['zov-notice-case-icon-' + item.status]: 'zov-notice-case-icon-' + item.status
                    }
                ]"
            />
            <div :class="{'zov-notice-case-body': item.status !== 'open'}">
                <p class="zov-notice-case-title">
                    {{ item.title }}
                </p>
                <p class="zov-notice-case-description">
                    {{ item.text }}
                </p>
                <render-cell :render="item.render"/>
            </div>
        </li>
    </transition-group>
</template>
<script>
import renderCell from './render'
export default {
    name: 'zov-notice-message',
    components: {
        renderCell
    },
    props: {
        // notice、message模式
        type: {
            type: String,
            default () {
                return ''
            }
        }
    },
    data () {
        return {
            list: {},
            iconnames: {
                info: 'zov-icon-info-circle',
                success: 'zov-icon-check-circle',
                error: 'zov-icon-close-circle',
                warning: 'zov-icon-info-circle'
            }
        }
    },
    methods: {
        remove (index) {
            this.$delete(this.list, index)
        }
    },
    directives: {
        timer: {
            inserted: (el, binding, vnode) => {
                if (binding.value.item.duration !== 0) {
                    let t = setTimeout(() => {
                        vnode.context.$delete(vnode.context.list, binding.value.index)
                        clearTimeout(t)
                    }, binding.value.item.duration || 3000)
                }
            }
        }
    }
}
</script>
