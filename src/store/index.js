import { createStore } from "vuex";

import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const store = createStore({
    state() {
        return {
            apiBaseUrl: "http://localhost:4000",
            userDetails: {},
            isLoading: false,
            themeOption: "dark",
            last7DaysCalls: {},
            callFilters: [],
            contacts: []
        };
    },
    mutations,
    actions,
    getters,
});

export default store;