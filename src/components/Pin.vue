<template>
    <p  class="🎳"
        :class="{ selected: isSelected }"
        @click="onClick">{{ number }}
    </p>
</template>


<script>
export default {
    props: {
        number: {
                type: Number,
                required: true
        },
        isSelected: {
                type: Boolean,
                required: true
        }
    },
    methods: {
        onClick: function () {
            this.$emit('pinClicked', this.number);
      },
    },
}
</script>

<style lang="less">
.🎳 {
    height: 4rem;
    width: 4rem;
    line-height: 4rem;
    border-radius: 50%;
    margin: 0 0.3rem;
    border: 2px solid #2c3e50;
    background: transparent;
    transform: perspective(1px) translateZ(0);
    transition-property: color background border;
    transition-duration: 0.5s;
    cursor: pointer;
    text-align: center;
    font-size: 2rem;
    font-weight: 100;
    text-transform: uppercase;
    outline: none;

    &:before {
        content: "";
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        background-color: rgba(255,255,255,0.4);
        transform: scale(0);
        transition-property: transform;
        transition-duration: 0.2s;
        transition-timing-function: ease-out;
	}

    &:hover, &:focus, &:active{
        &:before {
            transform: scale(1);
        }
    }

    &.disabled {
        opacity: 0.3;
        cursor: not-allowed;

        &:before{
            display: none;
        }
    }

    &.selected {
        background: #2c3e50;
        color: white;
        border: 2px solid rgba(255,255,255,0.4);

        &:before {
            background-color: #1b2733;
        }
    }
}
</style>
