import Function from "./Function"

var DataManager = {
    table:{},
    // getDataTable : async function getDataTable(element) {
    //     try {
    //         return await Function.getAllData({"table": element});
    //     }
    //     catch (erro) {
    //         return [];
    //     }
    // },

    getAllData:async function  getAllData() {
        var arrTable =["quyen","nhanvien"];
        arrTable.forEach( async (element)  => {
            DataManager.table[element] = await Function.getAllData({"table": element});
        });
    }
};
export default DataManager;