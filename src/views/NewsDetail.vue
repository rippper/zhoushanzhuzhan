<template>
    <div>
        <header-fix></header-fix>
        <div>

        </div>
        <footer-fix></footer-fix>
    </div>
</template>

<script>
import { headerFix, footerFix } from '../components'
export default {
    name: 'NewsDetail',
    data () {
        return {

        }
    },
    methods: {

    },
    components: {
        headerFix,
        footerFix
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
</style>
