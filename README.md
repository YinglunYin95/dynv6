# dynv6 DDNS自动同步
## 编译可执行文件
1. 在根目录下执行 ```pkg .```

## 使用
1. 编辑出可执行文件dynv6.exe
2. 在开始菜单搜索“计划任务”，打开计划任务控制面板
3. 点击右侧“创建基本任务”，触发器为“计算机启动时”，操作为“启动程序”，点击浏览按钮，选择编译出的exe文件，并在“添加参数”输入框中，按照```<token> <zone>```的格式，填写从dynv6平台获取到的token和域名
4. 在面板中找到刚刚创建的任务，点击属性，选择“不管是否登录都要运行”并勾选“不存储密码”
5. 重启计算机，登录dynv6网站，观察ip是否被自动更新