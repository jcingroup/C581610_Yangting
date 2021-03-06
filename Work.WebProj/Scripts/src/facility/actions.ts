﻿import {callGet, callPost, callPut, callDelete} from '../ts-comm/ajax';
import {ac_type_comm} from '../action_type';
import {tosMessage} from '../ts-comm/comm-func';

//ajax--
const apiPath: string = gb_approot + 'api/Facility';
export const ajaxGridItem = (search: any) => {
    return dispatch => {
        return callGet(apiPath, search)
            .done((data, textStatus, jqXHRdata) => {
                dispatch(getGridItem(data));
            })
    }
}

export const ajaxEditItem = (id: number | string) => {

    return dispatch => {
        return callGet(apiPath, { id: id })
            .done((data, textStatus, jqXHRdata) => {
                dispatch(editState(ac_type_comm.update, id, data.data));
            })
    }
}
export const ajaxDeleteItem = (id: number | string, params) => {

    return dispatch => {
        return callDelete(apiPath, { id: id })
            .done((data, textStatus, jqXHRdata) => {
                if (data.result) {
                    tosMessage(null, '刪除完成', 1);
                    dispatch(ajaxGridItem(params));
                } else {
                    alert(data.message);
                }
            })
    }
}
interface IDName {
    id: number | string //數字型用id 字串型用no
}
interface CallResult extends IResultBase, IDName { }
export const ajaxSubmit = (id, md, edit_type: IEditType) => {
    return dispatch => {
        let pm = { id: id, md: md };

        if (edit_type == IEditType.insert) {
            return callPost(apiPath, md)
                .done((data: CallResult, textStatus, jqXHRdata) => {
                    if (data.result) {
                        tosMessage(null, '新增完成', 1);
                        dispatch(ajaxEditItem(data.id));//新增完成後狀態更新為修改
                    } else {
                        alert(data.message);
                    }
                })
        }

        if (edit_type == IEditType.update) {
            return callPut(apiPath, pm)
                .done((data: CallResult, textStatus, jqXHRdata) => {
                    if (data.result) {
                        tosMessage(null, '修改完成', 1);
                    } else {
                        alert(data.message);
                    }
                })
        }
    }
}
//ajax--
const getGridItem = (data) => {
    return {
        type: ac_type_comm.load,
        items: data.rows,
        pageinfo: {
            total: data.total,
            page: data.page,
            records: data.records,
            startcount: data.startcount,
            endcount: data.endcount
        }
    }
}
export const getTypeListItem = (data) => {
    return {
        type: ac_type_comm.load_list,
        data
    }
}

export const setInputValue = (type, name, value) => {
    return {
        type: type,
        name,
        value
    }
}

export const setFieldValue = (type, item) => {
    return {
        type: type,
        item
    }
}

export const editState = (type, id, data) => {
    return {
        type: type,
        id,
        data
    }
}