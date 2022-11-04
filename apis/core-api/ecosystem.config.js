module.exports = {
  apps: [
    {
      instances: 1,
      name: 'ultras',
      args: '--trace-warnings --unhandled-rejections=strict',
      exec_mode: 'fork',
      script: './dist/api/index.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
