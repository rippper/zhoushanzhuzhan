<template>
  <img class="noDataImg" :src="imageSrc" ref="img"/>
</template>
<script>
  import baseErrorSrc from '../assets/noDataImg.png'

  export default {
    data () {
      return {
        imageSrc: this.src,
        imgErrorSrc: this.errorSrc
      }
    },
    mounted () {
      if (!this.src) {
        this.imageSrc = this.imgErrorSrc || baseErrorSrc
      }
      this.$refs.img.onerror = () => {
        this.imageSrc = this.imgErrorSrc || baseErrorSrc
      }
    },
    props: ['src', 'errorSrc']

  }
</script>
