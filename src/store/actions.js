import { ContactFindOptions } from "@ionic-native/contacts";

import { CallLog } from "@ionic-native/call-log";



import moment from "moment";
// import axios from "axios";


import mixins from "../mixins";

export default {
    addApiBaseUrl({ commit }, apiBaseUrl) {
        commit("addApiBaseUrl", apiBaseUrl);
    },

    setThemeOption({ commit }, themeOption) {
        localStorage.themeOption = themeOption;
        document.body.setAttribute("color-theme", themeOption);
        commit("setThemeOption", themeOption);
    },

    async setLast7DaysCalls({ commit, getters }) {

        const days = mixins.getLastNDays(7);


        const callLogPermission = await getters.getCallLogPermission;

        function getCallByDay(the_day) {
            return new Promise(function (resolve) {
                var filters = [{
                    "name": "date",
                    "value": moment(the_day).format("x"),
                    "operator": ">="
                },
                {
                    "name": "date",
                    "value": moment(the_day).add(1, "days").format("x"),
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
            all_data: [],
            last_day_call_duration_minute: 0,
            last_day_total_no_of_call_count: 0,
        };



        if (callLogPermission) {
            for (let i = 0; i < days.length; i++) {
                var day = days[i];
                var day_data = await getCallByDay(day);
                data.labels.push(moment(day).format("dddd"));
                data.data.push(day_data.length);
                data.all_data.push({
                    date: moment(day).format("DD/MM/YY dddd"),
                    data: day_data
                });

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



                    if ((days.length - 1) == i) {
                        data.last_day_total_no_of_call_count = daily_actual_call_count_total;
                        data.last_day_call_duration_minute = call_duration;
                    }
                }
                data.actual_call_count.push(daily_actual_call_count_total);
                data.total_call_duration.push(total_duration);
                data.call_duration.push(call_duration);
            }
        }

        commit("setLast7DaysCalls", data);

        return data;
    },


    fetchContacts({ commit }) {
        const options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;

        const fields = ["displayName", "phoneNumbers"];

        function onSuccessContact(contact_list) {
            commit("setContact", contact_list);
        }

        function onErrorContact(error) {
            console.log(error);
        }

        if (navigator.contacts) {
            navigator.contacts.find(fields, onSuccessContact, onErrorContact, options);
        }

        return {};
    },

    fetchCallLogs({ commit }, { start_date, end_date }) {
        return new Promise(function (resolve) {
            console.log({ start_date, end_date });

            var filters = [{
                "name": "date",
                "value": moment(end_date).format("x"),
                "operator": ">="
            },
            {
                "name": "date",
                "value": moment(start_date).add(1, "days").format("x"),
                "operator": "<="
            }
            ];
            CallLog.getCallLog(filters, function (callLogs) {
                console.log(callLogs, "actions");
                commit("setCallLogs", callLogs);
                resolve(callLogs);
            }, function (error) {
                resolve(error);
            });
        });
    }
};
