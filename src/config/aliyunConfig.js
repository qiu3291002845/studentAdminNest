const aliyunConfig = {
  client: {
    endpoint: 'oss-cn-beijing.aliyuncs.com', // endpoint域名
    accessKeyId: 'LTAI4G79gBgCCdgan6uVZjSY', // 账号
    accessKeySecret: 'f2VHOxDAQwHE0ajH9syiKAnO3e1pYn', // 密码
    bucket: 'czh1010', // 存储桶
    internal: false, // 是否使用阿里云内部网访问
    secure: true, // 使用 HTTPS
    cname: false, // 自定义endpoint
    timeout: '90s',
  },
  domain: '', // 自定义域名})],
};
export { aliyunConfig };
