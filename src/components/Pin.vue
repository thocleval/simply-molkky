<template>
    <div class="🎳" :class="{ selected: isSelected }" @click="onClick">
        <p class="number">{{ number }}</p>
    </div>
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
    width: auto;
    border-radius: 50%;
    border: 2px solid #2c3e50;
    background: transparent;
    position: relative;
    transition-property: color background border;
    transition-duration: 0.5s;
    cursor: pointer;
    font-size: 2rem;
    font-weight: 100;
    text-transform: uppercase;
    outline: none;

    &::before {
        content: '';
        padding-top: 100%;
        display: block;
    }

    .number {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
    }

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        background-color: rgba(255,255,255,0.4);
        transform: scale(0);
        transition: transform 0.2s ease;
	}

    &:hover, &:focus, &:active{
        &::after {
            transform: scale(1);
        }
    }

    &.disabled {
        opacity: 0.3;
        cursor: not-allowed;

        &::after {
            display: none;
        }
    }

    &.selected {
        background: #2c3e50;
        color: white;
        border-color: rgba(255, 255, 255, 0.4);

        &::after {
            background-color: #1b2733;
        }
    }
}
</style>
