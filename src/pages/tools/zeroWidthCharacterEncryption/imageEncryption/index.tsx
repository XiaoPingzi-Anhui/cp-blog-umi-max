import { useState } from 'react';
import { styled } from '@umijs/max';
import { PageContainer } from '@ant-design/pro-components';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: (file) => {
    console.log('file:', file);
    return '';
  },
  onChange(info) {
    console.log();
    const { status, originFileObj } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () =>
        console.log('result:', fileReader.result),
      );
      fileReader.readAsArrayBuffer(originFileObj!);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

export default function ImageEncryption() {
  const [showText, setShowText] = useState('');
  const [encryptText, setEncryptText] = useState('');

  return (
    <PageContainer>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
    </PageContainer>
  );
}

const TextWrapper = styled.div``;
