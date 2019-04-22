<template>
  <div :class="anchorLinkClasses">
    <a :href="href"
       :title="title"
       :class="linkTitleClasses"
       @click.prevent="goAnchor">{{title}}</a>
    <slot></slot>
  </div>
</template>
<script>
const prefix = 'zov-anchor-link'
export default {
    name: prefix,
    components: {},
    props: {
        href: String,
        title: String
    },
    data () {
        return {
            prefix: prefix
        }
    },
    computed: {
        anchorLinkClasses () {
            return [
                this.prefix
            ]
        },
        linkTitleClasses () {
            return [
                `${this.prefix}-title`
            ]
        }
    },
    methods: {
        goAnchor () {
            console.log(this.href)
            document.getElementById(this.href).scrollIntoView({ behavior: 'smooth', inline: 'end' })
            // this.anchorCom.handleHashChange();
            // this.anchorCom.handleScrollTo();
            // this.anchorCom.$emit('on-select', this.href);
        }
    }
}
</script>
