<template>
  <div id="screen" v-show="screen_visible">
        <img src="/assets/logo.png" alt="" class="brand-img">
      
        <div class="brand-text">
            <div class="from">from</div>
            <div class="brand">Método Integra</div>
        </div>
  </div>
</template>


<style lang="stylus">

#screen
    width 100%
    margin auto
    height 100%
    text-align center
    position relative
    .brand-img
        margin auto
        position absolute
        top 30%
        left 0
        right 0
    .brand-text
        position absolute
        bottom 50px
        left 0
        right 0
        margin auto
        .from
            text-transform lowercase
            font-size 14px
            color #aaa
            font-weight bold
            margin-bottom 8px
        .brand
            text-transform uppercase
            font-weight bold
            font-size 20px
            color #B62822
            letter-spacing 2.5px

</style>


<script>
//import {
//} from "@ionic/vue"


export default {

    components: {
    },
    data() {
        return {
            screen_visible: true,
        }
    }

}


</script>