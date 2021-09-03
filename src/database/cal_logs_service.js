import { connection } from "./jsstore_con";

export class CalLogService {

    constructor() {
        this.tableName = "cal_logs";
    }

    getCalLogs() {
        return connection.select({
            from: this.tableName,
        });
    }

    addCalLog(cal_log) {
        return connection.insert({
            into: this.tableName,
            values: [cal_log],
            return: true
        });
    }

    getCalLogById(id) {
        return connection.select({
            from: this.tableName,
            where: {
                id: id
            }
        });
    }

    removeCalLog(id) {
        return connection.remove({
            from: this.tableName,
            where: {
                id: id
            }
        });
    }

}
