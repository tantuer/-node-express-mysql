# node-express-mysql

express+mysql 搭建的服务端应用

## 安装依赖

npm install

## 在本地 mysql 创建数据库 test

## 修改数据库连接配置

/src/schemas/schema.js

const connection = mysql.createConnection({  
host: 'localhost',  
port: '3306',  
user: 'root',  
password: '123456',  
database: 'test' // 创建的数据库名  
});

## 启动服务

npm start  
启动地址:http://localhost:3004  
启动之后，程序会自动往 test 数据库中插入数据表 news（如果该表不存在）  
此时可访问 http://localhost:3004/news 读取数据表的 news 的数据

GET http://localhost:3004/news 读取列表  
POST http://localhost:3004/news 添加数据  
PUT http://localhost:3004/news/:id 修改此 id 的数据内容  
DELETE http://localhost:3004/news/:id 删除该 id 的数据  
GET http://localhost:3004/news/:id 读取该 id 的数据内容
