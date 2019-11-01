const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8188 });

wss.on('connection', function(ws) {
  console.log('server: 收到连接');
  ws.on('message', function(message) {
    console.log('server: 收到消息', message);
  });
  ws.send('来自服务数据1112222');
});