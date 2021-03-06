﻿import React = require('react');
import Moment = require('moment');

import { clone, makeInputValue} from '../ts-comm/comm-func';
import {config} from '../ts-comm/def-data';
import {ac_type_comm} from '../action_type';
//view
import {GridTable} from './vwGridTable';
import {GridSearch} from './vwGridSearch';
import {NavPage} from '../ts-comm/comm-cmpt';

export class Grid extends React.Component<any, any>{

    constructor() {
        super();
        this.changeSDVal = this.changeSDVal.bind(this);
        this.submitQuery = this.submitQuery.bind(this);
        this.queryGridData = this.queryGridData.bind(this);

        this.addType = this.addType.bind(this);
        this.modifyType = this.modifyType.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

        this.state = {
        };
    }
    queryGridData(page?: number) {
        let params = this.props.search;

        params['page'] = page == null ? this.props.page_operator.page : page;

        this.props.ajaxGridItem(params);
    }
    submitQuery(e: React.SyntheticEvent) {
        e.preventDefault();

        let params = this.props.search;
        params['page'] = this.props.page_operator.page;

        this.props.ajaxGridItem(params);
        return;
    }
    changeSDVal(name: string, e: React.SyntheticEvent) {
        let value = makeInputValue(e);
        this.props.setInputValue(ac_type_comm.chg_sch_val, name, value);
    }
    addType() {
        let data: server.MsgBoard = {
            msg_board_id: 0,
            resident_id: 0,
            msg_type_id: 0,
            q_name: '',
            q_tel: '',
            q_email: '',
            q_title: '',
            q_content: '',
            a_content: '',
            state: 0,
            i_Hide: false,
            i_Lang: 'zh-TW'
        };
        this.props.editState(ac_type_comm.add, 0, data);
    }
    modifyType(id: number | string) {
        this.props.ajaxEditItem(id);
    }
    deleteItem(id: number | string) {
        if (!confirm('確定是否刪除?')) {
            return;
        }
        let params = this.props.search;
        params['page'] = this.props.page_operator.page;
        this.props.ajaxDeleteItem(id, params);
    }
    render() {
        let out_html: JSX.Element = null;
        let pp = this.props;
        let p_info: server.PageInfo = pp.page_operator;

        out_html =
            (
                <form onSubmit={this.submitQuery}>
                <GridSearch search={pp.search} init_list={pp.type_list} changeSearchVal={this.changeSDVal} />
                <GridTable grid={pp.grid} clickItemEdit={this.modifyType} clickItemDel={this.deleteItem} type_list={pp.type_list}/>
                    <NavPage
                        page={p_info.page}
                        startcount={p_info.startcount}
                        endcount={p_info.endcount}
                        total={p_info.total}
                        records={p_info.records}
                        mapPage={this.queryGridData}
                        clickInsertState={this.addType}
                        showDelete={false}
                        showAdd={false}/>
                </form>
            );

        return out_html;
    }
}