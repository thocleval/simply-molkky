import Vue from 'vue';

Vue.directive('long-press', {
  bind(el, binding, vnode) {
    vnode.timeout = null;

    const longPressDuration = binding.value ? binding.value : 500;

    vnode.onmouseup = () => {
      clearTimeout(vnode.timeout);
      document.removeEventListener('mouseup', vnode.onmouseup);
    };

    vnode.onmousedown = () => {
      document.addEventListener('mouseup', vnode.onmouseup);

      vnode.timeout = setTimeout(() => {
        const longPressEvent = new Event('long-press');

        el.dispatchEvent(longPressEvent);
      }, longPressDuration);
    };

    el.addEventListener('mousedown', vnode.onmousedown);
  },
  unbind(el, binding, vnode) {
    clearTimeout(vnode.timeout);
    el.removeEventListener('mousedown', vnode.onmousedown);
    document.removeEventListener('mouseup', vnode.onmouseup);
  },
});
