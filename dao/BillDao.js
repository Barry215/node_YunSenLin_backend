/**
 * Created by frank on 17/2/22.
 */
var User = require('../model/User');
var LogType = require('../model/LogType');
var Count = require('../model/Count');
var Bill = require('../model/Bill');
var Log = require('../model/Log');
var LogData = require('../model/LogData');
var Timber = require('../model/Timber');
var TimberData = require('../model/TimberData');

function validateBillExist(record_time) {
    return Bill.findOne({
        where: {
            record_time: record_time
        }
    });

}

// function createLogType(logType,t) {
//     return LogType.create({
//         id: logType.id,
//         name: logType.name,
//         remark: logType.remark
//     },{transaction: t});
// }

// function updateLogType(logType,logType_id,t) {
//     return LogType.update({
//         name: logType.name,
//         remark: logType.remark
//     },{
//         where : {
//             id : logType_id
//         }
//     },{transaction: t});
// }

function createCount(count,t) {
    return Count.create({
        total: count.total,
        num: count.num,
        volume: count.volume
    },{transaction: t});
}

function updateCount(count,count_id,t) {
    return Count.update({
        total: count.total,
        num: count.num,
        volume: count.volume
    },{
        where : {
            id : count_id
        }
    },{transaction: t});
}

function createLogInput(log,logType_id,t) {
    return Log.create({
        index: log.index,
        length: log.length,
        diameter:log.diameter,
        num:log.num,
        piece:log.piece,
        volume:log.volume,
        perVolume:log.perVolume,
        total:log.total,
        record_time:log.recordTime,
        logType_id:logType_id
    },{transaction: t});
}

function updateLogInput(log,log_id,t) {
    return Log.update({
        index: log.index,
        length: log.length,
        diameter:log.diameter,
        num:log.num,
        piece:log.piece,
        volume:log.volume,
        perVolume:log.perVolume,
        total:log.total,
        record_time:log.recordTime
    },{
        where : {
            id : log_id
        }
    },{transaction: t});
}

function getLogInput(log_input_id, t) {
    return Log.findOne({
        where:{
            id : log_input_id
        }
    },{transaction: t});
}

function createLog(log,logType_id,log_data_id,t) {
    return Log.create({
        index: log.index,
        length: log.length,
        diameter:log.diameter,
        num:log.num,
        piece:log.piece,
        volume:log.volume,
        perVolume:log.perVolume,
        total:log.total,
        record_time:log.recordTime,
        logType_id:logType_id,
        log_data_id:log_data_id
    },{transaction: t});
}

function updateLog(log,log_id,t) {
    return Log.update({
        index: log.index,
        length: log.length,
        diameter:log.diameter,
        num:log.num,
        piece:log.piece,
        volume:log.volume,
        perVolume:log.perVolume,
        total:log.total
    },{
        where:{
            id : log_id
        }
    },{transaction: t});
}


function getLog(record_time, t) {
    return Log.findOne({
        where:{
            record_time : record_time
        }
    },{transaction: t});
}

function deleteLog(log_data_id, t) {
    return Log.destroy({
        where:{
            log_data_id : log_data_id
        }
    },{transaction: t});
}

function createTimber(timber,timber_data_id,t) {
    return Timber.create({
        index: timber.index,
        length: timber.length,
        width: timber.width,
        height: timber.height,
        stack:timber.stack,
        num:timber.num,
        piece:timber.piece,
        volume:timber.volume,
        perVolume:timber.perVolume,
        total:timber.total,
        record_time:timber.recordTime,
        timber_data_id:timber_data_id
    },{transaction: t});
}

function deleteTimber(timber_data_id, t) {
    return Timber.destroy({
        where:{
            timber_data_id : timber_data_id
        }
    },{transaction: t});
}

function createTimberInput(timber,t) {
    return Timber.create({
        index: timber.index,
        length: timber.length,
        width: timber.width,
        height: timber.height,
        stack:timber.stack,
        num:timber.num,
        piece:timber.piece,
        volume:timber.volume,
        perVolume:timber.perVolume,
        total:timber.total,
        record_time:timber.recordTime
    },{transaction: t});
}

function updateTimberInput(timber,timber_id,t) {
    return Timber.update({
        index: timber.index,
        length: timber.length,
        width: timber.width,
        height: timber.height,
        stack:timber.stack,
        num:timber.num,
        piece:timber.piece,
        volume:timber.volume,
        perVolume:timber.perVolume,
        total:timber.total,
        record_time:timber.recordTime
    },{
        where:{
            id : timber_id
        }
    },{transaction: t});
}

function createLogData(count_id, log_id, input_index, logType_id,t) {
    return LogData.create({
        count_id: count_id,
        log_id: log_id,
        input_index: input_index,
        logType_id: logType_id
    },{transaction: t});
}

function updateLogData(input_index, log_data_id, t) {
    return LogData.update({
        input_index: input_index
    },{
        where:{
            id : log_data_id
        }
    },{transaction: t});
}

function getLogData(log_data_id, t) {
    return LogData.findOne({
        where:{
            id : log_data_id
        }
    },{transaction: t});
}

function createTimberData(count_id, timber_id, input_index, t) {
    return TimberData.create({
        count_id: count_id,
        timber_id: timber_id,
        input_index: input_index
    },{transaction: t});
}

function updateTimberData(input_index, timber_data_id, t) {
    return TimberData.update({
        input_index: input_index
    },{
        where:{
            id : timber_data_id
        }
    },{transaction: t});
}

function getTimberData(timber_data_id, t) {
    return TimberData.findOne({
        where:{
            id : timber_data_id
        }
    },{transaction: t});
}

function createBill(finance, record_time, type, data_id, user_id, which, t) {
    return Bill.create({
        finance: finance,
        record_time:record_time,
        type: type,
        data_id: data_id,
        user_id: user_id,
        which: which
    },{transaction: t});
}

function updateBill(finance, record_time, type, t) {
    return Bill.update({
        finance: finance,
        type: type
    },{
        where:{
            record_time : record_time
        }
    },{transaction: t});
}

module.exports = {
    validateBillExist : validateBillExist,
    // createLogType : createLogType,
    // updateLogType : updateLogType,
    getLogInput : getLogInput,
    createCount : createCount,
    updateCount : updateCount,
    createLog : createLog,
    updateLog : updateLog,
    deleteLog : deleteLog,
    // getLog : getLog,
    createLogInput : createLogInput,
    updateLogInput : updateLogInput,
    createTimber : createTimber,
    deleteTimber : deleteTimber,
    createTimberInput : createTimberInput,
    updateTimberInput : updateTimberInput,
    createLogData : createLogData,
    updateLogData : updateLogData,
    getLogData : getLogData,
    createTimberData : createTimberData,
    updateTimberData : updateTimberData,
    getTimberData : getTimberData,
    createBill : createBill,
    updateBill : updateBill
};
