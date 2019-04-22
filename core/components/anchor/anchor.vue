<template>
  <component :is="wrapperComponent"
             :offset-top="offsetTop"
             :offset-bottom="offsetBottom"
             @on-change="handleAffixStateChange">
    <div :class="`${prefix}-wrapper`"
         :style="wrapperStyle">
      <div :class="`${prefix}`">
        <div :class="`${prefix}-ink`">
          <span v-show="showInk"
                :class="`${prefix}-ink-ball`"
                :style="{top: `${inkTop}px`}"></span>
        </div>
        <slot></slot>
      </div>
    </div>
  </component>
</template>
<script>
import sharpMatcherRegx from '../../utils'
const prefix = 'zov-anchor'
export default {
    name: prefix,
    props: {
        affix: {
            type: Boolean,
            default: true
        },
        offsetTop: {
            type: Number,
            default: 0
        },
        offsetBottom: Number,
        bounds: {
            type: Number,
            default: 5
        },
        scrollOffset: {
            type: Number,
            default: 0
        },
        container: null,
        showInk: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            prefix: prefix,
            inkTop: 0,
            isAffixed: false, // current affixed state
            currentLink: '', // current show link =>  #href -> currentLink = #href
            currentId: '' // current show title id =>  #href -> currentId = href
        }
    },
    computed: {
        wrapperComponent () {
            return this.affix ? 'Affix' : 'div'
        },
        wrapperStyle () {
            return {
                maxHeight: this.offsetTop ? `calc(100vh - ${this.offsetTop}px)` : '100vh'
            }
        },
        containerIsWindow () {
            return this.scrollContainer === window
        }
    },
    methods: {
        handleAffixStateChange (state) {
            console.log(state, 'state')
            this.isAffixed = this.affix && state
        },
        handleHashChange () {
            const url = window.location.href
            const sharpLinkMatch = sharpMatcherRegx.exec(url)
            if (!sharpLinkMatch) return
            this.currentLink = sharpLinkMatch[0]
            this.currentId = sharpLinkMatch[1]
        }
    }
}
</script>
