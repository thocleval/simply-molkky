<template>
    <div class="🖼 main-menu">
        <h1>Simply Mölkky</h1>
        <button @click="goToPlayerSelect">Start a game</button>
        <button @click="goToRules">Manage rules</button>
    </div>
</template>

<script>

export default {
    methods: {
        goToPlayerSelect () {
            this.$emit('goToPlayerSelect');
        },
        goToRules () {
            this.$emit('goToRules');
        },
    }
}
</script>

<style lang="less">

h1 {
    margin-bottom: 1rem;
    font-size: 3rem;
    font-weight: 100;
}

.main-menu {
	min-height: initial;
}

</style>
