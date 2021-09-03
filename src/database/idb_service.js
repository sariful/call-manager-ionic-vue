import { connection } from "./jsstore_con";
import { DATA_TYPE } from "jsstore";

const getDatabase = () => {
    const tblContacts = {
        name: "contacts",
        columns: {
            id: {
                primaryKey: true,
                autoIncrement: true
            },
            rawId: {
                notNull: true,
                dataType: DATA_TYPE.Number
            },
            displayName: {
                notNull: false,
                dataType: DATA_TYPE.String
            },
            name: {
                notNull: false,
                dataType: DATA_TYPE.Object
            },
            nickname: {
                notNull: false,
                dataType: DATA_TYPE.String
            },
            phoneNumbers: {
                notNull: false,
                dataType: DATA_TYPE.Array
            },
        }
    };


    const tblCalLogs = {
        name: "cal_logs",
        columns: {
            id: {
                primaryKey: true,
                autoIncrement: true
            },
            date: {
                notNull: true,
                dataType: DATA_TYPE.Number
            },
            number: {
                notNull: true,
                dataType: DATA_TYPE.String
            },
            type: {
                notNull: true,
                dataType: DATA_TYPE.Number
            },
            duration: {
                notNull: true,
                dataType: DATA_TYPE.Number
            },
            new: {
                notNull: true,
                dataType: DATA_TYPE.Number
            },
            cachedNumberType: {
                notNull: true,
                dataType: DATA_TYPE.Number
            },
            phoneAccountId: {
                notNull: true,
                dataType: DATA_TYPE.String
            },
            viaNumber: {
                notNull: true,
                dataType: DATA_TYPE.String
            },
            name: {
                notNull: true,
                dataType: DATA_TYPE.String
            },
            contact: {
                notNull: true,
                dataType: DATA_TYPE.Number
            },
            photo: {
                notNull: true,
                dataType: DATA_TYPE.String
            },
            thumbPhoto: {
                notNull: true,
                dataType: DATA_TYPE.String
            }
        }
    };



    const dataBase = {
        name: "zubizi_call_manager",
        tables: [tblContacts, tblCalLogs]
    };
    return dataBase;
};

export const initJsStore = async () => {
    const dataBase = getDatabase();
    return await connection.initDb(dataBase);
};

