var DataHelper = /** @class */ (function () {
    function DataHelper(dataKey, primaryKey) {
        this.dataKey = dataKey;
        this.primaryKey = primaryKey;
    }
    DataHelper.prototype.readData = function () {
        // 读取本地数据
        var strData = localStorage.getItem(this.dataKey);
        var arrData = [];
        if (strData != null) {
            arrData = JSON.parse(strData);
        }
        return arrData;
    };
    DataHelper.prototype.saveData = function (arrData) {
        var str = JSON.stringify(arrData);
        localStorage.setItem(this.dataKey, str);
    };
    DataHelper.prototype.addData = function (conStr) {
        var arr = this.readData();
        var obj = {
            content: conStr
        };
        var newId = arr.length > 0 ? arr[arr.length - 1][this.primaryKey] + 1 : 1;
        obj[this.primaryKey] = newId;
        arr.push(obj);
        this.saveData(arr);
        return newId;
    };
    DataHelper.prototype.removeDataById = function (id) {
        var _this = this;
        var arr = this.readData();
        var index = arr.findIndex(function (ele) {
            return ele[_this.primaryKey] == id;
        });
        if (index > -1) {
            arr.splice(index, 1);
            this.saveData(arr);
            return true;
        }
        return false;
    };
    return DataHelper;
}());
// let dh = new DataHelper('plData', 'id')
// console.log(dh.dataKey, dh.primaryKey)
