import React, { Component } from "react";
import { Button } from 'antd';
let { json2excel } = require('js2excel');

// excel's data will be exports, which you probably get it from server.
let data = [
    {
        "userId": 1,
        "userPhoneNumber": 1888888888,
        "userAddress": 'xxxx',
        "date": '2013/09/10 09:10'  // string
    },
    {
        "userId": 2,
        "userPhoneNumber": 1888888888,
        "userAddress": 'xxxx',
        "date": new Date()
    },
    {
        "userId": 3,
        "userPhoneNumber": 1888888888,
        "userAddress": 'xxxx',
        "date": new Date()
    }
];

class ExportButtonExcel extends Component {
    handleExportExcel = () => {
        try {
            json2excel({
                data,
                name: 'user-info-data',
                formateDate: 'yyyy/mm/dd'
            });
        } catch (e) {
            console.error('export error');
        }

        // for webpack 3: dynamic import
        // import(/* webpackChunkName: "js2excel" */ 'js2excel').then(({ json2excel }) => {
        //     json2excel({
        //         data,
        //         name: 'test',
        //         formateDate: 'dd/mm/yyyy'
        //     });
        // }).catch((e) => {

        // });
    };

    render() {

        return (
            <React.Fragment>
                <Button icon="export" onClick={() => this.handleExportExcel()}>Export to Excel</Button>
            </React.Fragment>
        );
    }
}
export default ExportButtonExcel;