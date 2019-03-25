<template>
    <div class="zov-color-picker">
        <Drop
            :value="true"
            never
        >
            <template #drop-head>
                <div>
                    123123
                </div>
            </template>
            <MainPanel/>
            <div class="zov-color-picker-bars">
                <div
                    class="zov-color-picker-bars-current"
                    :style="{
                            'background-color': currentValue
                        }"
                ></div>
                <div class="zov-color-picker-bars-tools">
                    <HueBar/>
                    <AlphaBar/>
                </div>
            </div>
        </Drop>
    </div>
</template>
<script>
import Drop from '../drop'
import HueBar from './hue-bar'
import AlphaBar from './alpha-bar'
import MainPanel from './main-panel'
let prefix = 'zov-color-picker'
export default {
    name: prefix,
    components: {
        Drop,
        HueBar,
        AlphaBar,
        MainPanel
    },
    props: {
        value: {
            type: String,
            default: 'red'
        }
    },
    computed: {
        currentValue () {
            return this.value
        }
    }
}
</script>
