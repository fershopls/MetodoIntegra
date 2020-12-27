<template>
  <div id="welcome_screen" v-show="visible" ref="welcomeScreen">
        <img src="/assets/logo.png" alt="" class="brand-img">
      
        <div class="brand-text">
            <div class="from">from</div>
            <div class="brand">Método Integra</div>
        </div>
  </div>
</template>


<style lang="stylus">
#welcome_screen
    position absolute
    z-index 999999
    top 0
    bottom 0
    left 0 
    right 0
    margin auto
    text-align center
    background-color #fff
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
import {
    createAnimation

} from "@ionic/vue"


export default {

    components: {
    },
    methods: {
        show(){
            this.visible = true
            this.$refs.welcomeScreen.style.opacity = 1
        },
        hide(){
            const animation = createAnimation()
            .addElement(this.$refs.welcomeScreen)
            .delay(350)
            .duration(350)
            .fromTo('opacity', '1', '0');
            
            animation.play().then(() => {
                this.visible = false
            })
        }
    },

    data() {
        return {
            visible: false,
        }
    },

}


</script>