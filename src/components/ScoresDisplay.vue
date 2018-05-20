<template>
    <div class="scroll-view score-display">
            <div v-for="(player, index) in players" class="wrapper" :class="{ eliminated: player.isEliminated }">
                <p class="rank"> {{ index + 1 }} </p>
                <p class="name">{{ player.name }}</p>
                <div class="faults-wrapper">
                    <div v-for="indox in [1, 2 ,3]" class="faults" :class=" { x: player.fault >= indox} ">
                    </div>
                </div>
                <span class="points" >{{player.score}}</span>
            </div>
    </div>
</template>


<script>
export default {
    props: {
        players: {
                type: Array,
                required: true
        },
    },
}
</script>

<style lang="less">
    .wrapper{
        width: 80%;
        display: flex;
        padding: 1rem 1rem;
        border-bottom: 1px solid #2c3e50;
        align-items: center;
        height: 50px;

        &:last-child{
            border-bottom: none;
            margin-bottom: 0;
        }

        .rank{
            flex-grow: 0;
            border-right: 1px solid #2c3e50;
            padding-right: 10px;
            margin-right: 10px;
        }

        .name {
            text-align: left;
            flex-grow: 1;
        }
        .faults {
            height: 5px;
            width: 5px;
            font-size: 5px;
            line-height: 6px;
            margin: 4px 2px;
        }
        .points{
            width: 1.1rem;
            font-size: 1.3rem;
            text-align: right;
        }

        &.eliminated{
            color: red;
        }

        * + *{
            margin-top: 0;
        }
    }
</style>
