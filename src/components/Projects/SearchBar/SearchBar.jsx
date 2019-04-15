import React, { Component } from "react";
import { Input, Upload, message, Icon, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExportButtonExcel from '../ExportExcel/ExportExcel';

import './SearchBar.css';

const uploadProps = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class SearchBar extends Component {

  render() {

    return (
      <div className='searchbar'>
        <div className='bar'>

          <div className='project-name-group'>
            <div className='project-name'>Example Project Name</div>
            <FontAwesomeIcon icon='cog' className='gear-icon' />
          </div>

          <div className='searchgroup'>
            <div className='tempImportButton'>
              <Upload {...uploadProps}>
                <Button>
                  <Icon type="upload" /> Import CSV
                </Button>
              </Upload>,
            </div>
            <div className='tempExportButton'>
              <ExportButtonExcel />
            </div>

            <div>
              <Input.Search
                style={{ width: '300px' }}
                className='searchbox'
                placeholder='Search...'
              />
            </div>
            <div className='advanced-search' onClick={() => { alert('open advanced search window'); }}>Advanced Search</div>

          </div>
        </div>
      </div>
    )
  }
}

export default SearchBar;