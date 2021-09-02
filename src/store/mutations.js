export default {
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
    },
    setContact(state, contact_list) {
        state.contacts = contact_list;
    },
    setCallLogs(state, callLogs) {
        state.callLogs = callLogs;
    }
};