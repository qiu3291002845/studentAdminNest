export const config = {
  client: {
    endpoint: 'oss-cn-shenzhen.aliyuncs.com', // endpoint域名
    accessKeyId: 'xxxxxxxxxxxx', // 账号
    accessKeySecret: 'xxxxxxx', // 密码
    bucket: 'xxxxxx', // 存储桶
    internal: false, // 是否使用阿里云内部网访问
    secure: true, // 使用 HTTPS
    cname: false, // 自定义endpoint
    timeout: '90s',
  },
  domain: '', // 自定义域名
};
