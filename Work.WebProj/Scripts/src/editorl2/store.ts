﻿import update = require('react-addons-update');
import { combineReducers } from 'redux'
import {ac_type_comm} from '../action_type';


let searchData = {
    keyword: '',
    l1_id: gb_id
};

export const search = (state = searchData, action) => {

    switch (action.type) {
        case ac_type_comm.chg_sch_val:
            let struct = {
                [action.name]: { $set: action.value }
            };
            let n_state = update(state, struct);
            return n_state;
        default:
            return state
    }
}
const grid = (state: Array<server.Editor_L2> = [], action): Array<server.Editor_L2> => {
    switch (action.type) {
        case ac_type_comm.load:
            return action.items;
        default:
            return state;
    }
}

let page_operator_state: server.PageInfo = {
    page: 0,
    startcount: 0,
    endcount: 0,
    total: 0,
    records: 0,
    //field: null,
    //sort: null
}
export const page_operator = (state = page_operator_state, action) => {

    switch (action.type) {
        case ac_type_comm.load:
            return action.pageinfo;
        default:
            return state
    }
}

const field = (state: server.Editor_L2 = {}, action) => {

    switch (action.type) {
        case ac_type_comm.chg_fld_val:
            let f_struct_1 = {
                [action.name]: { $set: action.value }
            };
            let n_state_1 = update(state, f_struct_1);
            return n_state_1;
        case ac_type_comm.chg_dil_fld_val:
            let f_struct_2 = {
                ["Editor_L3"]: {
                    [action.i]: {
                        [action.name]: { $set: action.value }
                    }
                }
            };
            let n_state_2 = update(state, f_struct_2);
            return n_state_2;
        case ac_type_comm.add_detail:
            let f_struct_3 = {
                ["Editor_L3"]: { $push: [action.data] }
            };
            let n_state_3 = update(state, f_struct_3);
            return n_state_3;
        case ac_type_comm.del_detail:
            let f_struct_4 = {
                ["Editor_L3"]: { $splice: [[action.i, 1]] }
            };
            let n_state_4 = update(state, f_struct_4);
            return n_state_4;
        case ac_type_comm.add:
            return action.data;
        case ac_type_comm.update:
            return action.data;
        case ac_type_comm.load:
            return {};

        default:
            return state
    }
}

const edit_type = (state = IEditType.none, action: Redux.Action): IEditType => {

    switch (action.type) {
        case ac_type_comm.load:
            return IEditType.none;
        case ac_type_comm.grid:
            return IEditType.none;
        case ac_type_comm.add:
            return IEditType.insert;
        case ac_type_comm.update:
            return IEditType.update;
        default:
            return state
    }
}


interface Init_Params {
    id: number,
}
let init_params: Init_Params = { id: null };
const params = (state = init_params, action): any => {
    switch (action.type) {
        case ac_type_comm.load: {
            return init_params;
        }
        case ac_type_comm.add:
            let r_a: Init_Params = {
                id: 0
            };
            return r_a;
        case ac_type_comm.update:
            let r_u: Init_Params = {
                id: action.id
            };
            return r_u;
        default:
            return state
    }
}

export const combine = combineReducers({
    grid, field, edit_type, page_operator, search, params
})

export default combine;