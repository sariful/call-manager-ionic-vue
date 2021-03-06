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
            callFilters: [],
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
            const callLogPermission = await state.getters.getCallLogPermission;

            function getLastNDays(the_days = 7) {
                var result = [];
                for (var i = 0; i < the_days; i++) {
                    var d = new Date();
                    d.setDate(d.getDate() - i);
                    result.push(moment(d).format('YYYY-MM-DD'));
                }
                return result.reverse();
            }
            
            function getCallByDay(the_day) {
                console.log("get call by day");
                return new Promise(function (resolve) {
                    var filters = [{
                            "name": "date",
                            "value": moment(the_day).format('x'),
                            "operator": ">="
                        },
                        {
                            "name": "date",
                            "value": moment(the_day).add(1, 'days').format('x'),
                            "operator": "<="
                        }
                    ];
                    CallLog.getCallLog(filters, function (call_data) {
                        resolve(call_data);
                    }, function (error) {
                        resolve(error);
                    });
                });
            }


            const days = getLastNDays(7);
            const result = [];
            if (callLogPermission) {
                for (const day of days) {
                    const day_result = await getCallByDay(day);
                    result.push(day_result);
                }
            }
            state.commit("setLast7DaysCalls", result);

            return result;
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
        getLast7DaysCalls(state) {
            return state.last7DaysCalls;
        },
        getCallLogPermission() {
            return new Promise(function (resolve) {
                CallLog.hasReadPermission(function (status) {
                    if (status) {
                        resolve({
                            status: true
                        });
                    } else {
                        CallLog.requestReadPermission(function (result) {
                            resolve({
                                status: true,
                                debug: result
                            });
                        }, function (err) {
                            resolve({
                                status: false,
                                debug: err
                            });
                        });
                    }
                }, function (err) {
                    resolve({
                        status: false,
                        debug: err
                    });
                });
            });
        }
    },
});

export default store;