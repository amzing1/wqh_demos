import { defineStore } from 'pinia';

// Pinia 让 Actions 更加的灵活：
// 可以通过组件或其他 action 调用
// 可以从其他 store 的 action 中调用
// 直接在 store 实例上调用
// 支持同步或异步
// 有任意数量的参数
// 可以包含有关如何更改状态的逻辑（也就是 vuex 的 mutations 的作用）
// 可以 $patch 方法直接更改状态属性

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    name: 'super admin',
  }),
  getters: {
    nameLength: (state) => state.name.length,
  },
  actions: {
    async changeName(data: string) {
      this.name = data;
    },
  },
});
