import {
    createStore
} from "vuex";


import {
    CallLog
} from "@ionic-native/call-log";

import moment from "moment";
import axios from "axios";

const store = createStore({
    state() {
        return {
            apiBaseUrl: "http://localhost:4000",
            userDetails: {},
            isLoading: false,
            themeOption: "dark",
            last7DaysCalls: [],
            callFilters: []
        };
    },
    mutations: {
        setThemeOption(state, themeOption) {
            state.themeOption = themeOption;
        },
        addApiBaseUrl(state, apiBaseUrl) {
            state.apiBaseUrl = apiBaseUrl;
        },
        setUserDetails(state, userDetails) {
            state.userDetails = userDetails;
        },
        setLoaderState(state, loaderState) {
            state.isLoading = loaderState;
        },
        setLast7DaysCalls(state, callLogs) {
            state.last7DaysCalls = callLogs;
        }
    },
    actions: {
        addApiBaseUrl(state, apiBaseUrl) {
            state.commit("addApiBaseUrl", apiBaseUrl);
        },

        setThemeOption(state, themeOption) {
            localStorage.themeOption = themeOption;
            document.body.setAttribute("color-theme", themeOption);
            state.commit("setThemeOption", themeOption);
        },

        async setLast7DaysCalls(state) {
            const data = await CallLog.getCallLog([{
                "name": "date",
                "value": moment().subtract(7, 'd'),
                "operator": ">="
            }]);

            state.commit("setLast7DaysCalls", data);
            console.log({data});
            return data;
        },

        /**
         * 
         * get user details from jwt_token decrypt from backend
         * 
         */
        async setUserDetails(state) {
            const apiBaseUrl = state.getters.apiBaseUrl;

            // set loader to true
            state.commit("setLoaderState", true);

            // get data from backend through axios
            const result = await axios.get(`${apiBaseUrl}/api/user-details`);

            // set loader to false
            state.commit("setLoaderState", false);

            // add data to user details state
            state.commit("setUserDetails", result.data);
        },

    },
    getters: {
        getThemeOption(state) {
            return state.themeOption;
        },
        apiBaseUrl(state) {
            return state.apiBaseUrl;
        },
        checkIfLoading(state) {
            return state.isLoading;
        },
        getUserDetails(state) {
            return state.userDetails;
        },
    },
});

export default store;