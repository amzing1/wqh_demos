import { createStore } from 'vuex'

export default createStore({
    state: {
        dyComponents: [
            'base',
            'bezier',
            'gradient',
            'text',
            'transform'
        ],
        currentComponent: 'bezier',
    },
    mutations: {
        changeCurrentComp(state, componentName) {
            state.currentComponent = componentName;
        }
    },
    actions: {

    },
    modules: {

    }
})