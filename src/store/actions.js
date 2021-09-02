import { ContactFindOptions } from "@ionic-native/contacts";

import { CallLog } from "@ionic-native/call-log";



import moment from "moment";
import axios from "axios";


import mixins from "../mixins";

export default {
    addApiBaseUrl(state, apiBaseUrl) {
        state.commit("addApiBaseUrl", apiBaseUrl);
    },

    setThemeOption(state, themeOption) {
        localStorage.themeOption = themeOption;
        document.body.setAttribute("color-theme", themeOption);
        state.commit("setThemeOption", themeOption);
    },

    async setLast7DaysCalls(state) {

        const days = mixins.getLastNDays(7);


        const callLogPermission = await state.getters.getCallLogPermission;

        function getCallByDay(the_day) {
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




        var data = {
            labels: [],
            data: [],
            actual_call_count: [],
            call_duration: [],
            total_call_duration: [],
            all_datas: [],
        };



        if (callLogPermission) {
            for (let i = 0; i < days.length; i++) {
                var day = days[i];
                var day_data = await getCallByDay(day);
                data.labels.push(moment(day).format("dddd"));
                data.data.push(day_data.length);
                // data.all_datas.push(day_data);

                var call_duration = 0;
                var total_duration = 0;
                var daily_actual_call_count_total = 0;
                if (day_data.length > 0) {
                    for (let j = 0; j < day_data.length; j++) {
                        var duration = day_data[j].duration;
                        total_duration += +duration;
                        if (day_data[j].duration > 0) {
                            daily_actual_call_count_total += 1;
                        }
                    }
                    if (total_duration > 60) {
                        var call_minute = (total_duration / 60).toFixed(0);
                        call_duration = call_minute + "." + (total_duration % 60);
                    }
                }
                data.actual_call_count.push(daily_actual_call_count_total);
                data.total_call_duration.push(total_duration);
                data.call_duration.push(call_duration);
            }
        }

        state.commit("setLast7DaysCalls", data);

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

    fetchContacts({ commit }) {
        const options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;

        const fields = ["displayName", "phoneNumbers"];

        function onSuccessContact(contact_list) {
            commit("setContact", contact_list);
            console.log(contact_list);
        }

        function onErrorContact(error) {
            console.log(error);
        }
        navigator.contacts.find(fields, onSuccessContact, onErrorContact, options);

        return {};
    }
};