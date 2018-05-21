<template>
    <div class="🖼">
            <div v-for="(player, index) in ranking" :key="index">
                <p class="ranking" :class="{ first: index === 0, second: index === 1, third: index === 2 }">
                    <span v-if="index > 2">{{ index + ". " }}</span>
                    {{ player.name }}
                    <span v-if="index > 0">{{" : " + player.score + " points" }}</span>
                </p>
            </div>
            <button @click="goToMainMenu">Finish</button>
    </div>
</template>

<script>
export default {
    props: {
        ranking: {
                type: Array,
                required: true
        },
    },

    methods: {
        goToMainMenu () {
            this.$emit("finish")
        }
    }
}
</script>

<style lang="less">
.ranking {
    background: none;
    width: auto;
    font-weight: 100;

    &.first {
        font-size: 35px;

        &:before {
            content: "🏆"
        }
    }

    &.second {
        font-size: 30px;

        &:before {
            content: "🥈"
        }
    }

    &.third {
        font-size: 25px;

        &:before {
            content: "🥉"
        }
    }
}
</style>
