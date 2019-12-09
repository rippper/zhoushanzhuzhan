<template>
  <div class="home">
    <header-fix></header-fix>
    <div class="home_content">
      <div>
        
      </div>
    </div>
    <footer-fix></footer-fix>
  </div>
</template>

<script>
import { headerFix, footerFix } from '../components'
export default {
  name: 'home',
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

.home{
  width: 100%;
  min-width: 1025px;
  height: 2000px;
  background: url('../assets/bd_background.png') no-repeat;
  background-size: 100%;
  .home_content{
    width: 1000px;
    height: 500px;
    margin: 15px auto 0;
    background: #fff;
  }
}
</style>
