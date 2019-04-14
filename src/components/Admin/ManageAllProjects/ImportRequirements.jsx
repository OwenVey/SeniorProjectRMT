import { Upload, Icon, message } from 'antd';

function getBase64(csv, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(csv);
}

function beforeUpload(file) {
  const isCSV = file.type === 'csv';
  if (!isCSV) {
    message.error('You can only upload CSV file!');
  }
  return isCSV;
}

class Avatar extends React.Component {
  state = {
    loading: false,
  };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({ loading: false });
      return;
    }
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="//jsonplaceholder.typicode.com/posts/"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    );
  }
}

ReactDOM.render(<Avatar />, mountNode);