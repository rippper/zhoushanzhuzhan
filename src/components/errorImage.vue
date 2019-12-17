<template>
  <div class="picShow">
    <img class="trueImg" :src="imageSrc" ref="img" v-if="showTrueImg">
    <img class="errorImg" :src="male" v-else>
  </div>
</template>

<script>
import baseErrorSrc from '../assets/noDataPic.png'

export default {
  name: 'errorImg',
  data () {
    return {
      imageSrc: this.src,
      male: baseErrorSrc,
      showTrueImg: true
    }
  },
  mounted () {
    if (!this.src) {
      this.showTrueImg = false
    }
    this.$refs.img.onerror = () => {
      this.showTrueImg = false
    }
  },
  props: ['src'],
  watch: {
    src (val) {
      if (val) {
        this.imageSrc = val
        this.showTrueImg = true
      } 
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../style/mixin';

  .picShow{
    .trueImg{
      width: 160px;
      height: 100px;
    }
    .errorImg{
      width: 98px;
      height: 120px;
      display: block;
      margin: 0 auto;
    }
  }
</style>
