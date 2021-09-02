import { CallLog } from "@ionic-native/call-log";

export default {
    getThemeOption({ themeOption }) {
        return themeOption;
    },
    apiBaseUrl({ apiBaseUrl }) {
        return apiBaseUrl;
    },
    checkIfLoading({ isLoading }) {
        return isLoading;
    },
    getUserDetails({ userDetails }) {
        return userDetails;
    },
    getLast7DaysCalls({ last7DaysCalls }) {
        return last7DaysCalls;
    },
    getContacts({ contacts }) {
        return contacts;
    },
    getCallLogPermission() {
        return new Promise(function (resolve) {
            try {
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
            } catch (error) {
                resolve({
                    status: false,
                    debug: error
                });
            }
        });
    }
};