<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>Now： {{now | formatDate('Y-m-d-H-i-s')}}</p>
    <p>Num: {{1567564.156 | formatNum(4)}}</p>
    <p>Num: {{1567564.156 | toFixedFix | money2Chinese}}</p>
  </div>
</template>
<script>
export default {
    data(){
        return {}
    },
    computed: {
        now(){
            return Date.parse(new Date()) / 1000;
        }
    }
}
</script>
