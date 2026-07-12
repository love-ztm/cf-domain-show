# CF Domain Show

一个部署在 **Cloudflare Pages** 上的轻量级域名及访问请求信息展示工具。

项目采用原生 HTML、JavaScript 和 Cloudflare Pages Functions 开发，无需购买服务器，即可快速部署到 Cloudflare 全球网络。

## 功能特点

- 显示当前访问域名
- 获取并展示访问请求相关信息
- 使用 Cloudflare Pages Functions 提供 API
- 原生 HTML + JavaScript，无复杂框架
- 支持 Cloudflare Pages 一键部署
- 支持绑定自定义域名
- 支持 Wrangler 本地调试和部署
- 无需传统服务器，部署简单

## 项目结构

```text
cf-domain-show/
├── functions/
│   └── api/                # Cloudflare Pages Functions API
├── public/                 # 前端页面及静态资源
├── README.md               # 项目说明
├── package.json            # 项目依赖及运行脚本
└── wrangler.toml           # Cloudflare Wrangler 配置
```

## 技术栈

- HTML
- JavaScript
- Cloudflare Pages
- Cloudflare Pages Functions
- Wrangler
- Node.js / npm

## 快速部署

### 方式一：通过 Cloudflare Pages 部署

1. Fork 本项目到自己的 GitHub 账号。

2. 登录 https://dash.cloudflare.com/。

3. 进入：

```text
Workers 和 Pages → 创建应用程序 → Pages → 连接到 Git
```

4. 选择 Fork 后的 `cf-domain-show` 仓库。

5. 配置部署参数：

```text
生产分支：main
构建命令：留空
构建输出目录：public
根目录：/
```

6. 点击“保存并部署”。

部署完成后，Cloudflare 会生成一个默认地址：

```text
https://你的项目名称.pages.dev
```

## 本地运行

### 1. 克隆项目

```bash
git clone https://github.com/love-ztm/cf-domain-show.git
cd cf-domain-show
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动本地开发环境

```bash
npx wrangler pages dev public
```

启动成功后，在浏览器中访问终端显示的地址，默认通常为：

```text
http://localhost:8788
```

## 使用 Wrangler 部署

### 1. 登录 Cloudflare

```bash
npx wrangler login
```

### 2. 创建 Pages 项目

如果 Cloudflare 中还没有对应项目，可以执行：

```bash
npx wrangler pages project create cf-domain-show
```

### 3. 部署项目

```bash
npx wrangler pages deploy public --project-name=cf-domain-show
```

部署成功后，可以通过 Cloudflare 提供的 `pages.dev` 地址访问。

## API 说明

项目 API 文件位于：

```text
functions/api/
```

Cloudflare Pages Functions 会根据文件目录自动生成对应的 API 路由。

例如：

```text
functions/api/info.js
```

对应的访问地址通常为：

```text
/api/info
```

完整地址示例：

```text
https://你的项目名称.pages.dev/api/info
```

具体接口名称和返回内容请以 `functions/api` 目录中的代码为准。

## 绑定自定义域名

1. 登录 Cloudflare Dashboard。
2. 进入对应的 Pages 项目。
3. 点击“自定义域”或“Custom domains”。
4. 点击“设置自定义域”。
5. 输入需要绑定的域名，例如：

```text
domain.example.com
```

6. 根据页面提示完成 DNS 配置。

如果域名已经接入 Cloudflare，系统一般会自动配置 DNS 记录和 HTTPS 证书。

## 更新项目

如果通过 GitHub 连接 Cloudflare Pages 部署，只需要将修改推送到 GitHub：

```bash
git add .
git commit -m "Update project"
git push
```

Cloudflare Pages 检测到代码变更后，会自动重新构建并部署。

如果使用 Wrangler 手动部署，请重新执行：

```bash
npx wrangler pages deploy public --project-name=cf-domain-show
```

## 常见问题

### 页面打开后显示空白

请检查：

- Cloudflare Pages 的输出目录是否为 `public`
- `public` 目录中是否存在入口页面
- 浏览器开发者工具中是否有 JavaScript 报错
- CSS、JavaScript 等静态资源路径是否正确
- 最新一次 Cloudflare Pages 部署是否成功

### API 返回 404

请检查：

- API 文件是否位于 `functions` 目录
- 文件目录是否与访问路径一致
- API 文件是否正确导出请求处理函数
- 部署时是否包含完整的 `functions` 目录
- 请求地址中的接口名称是否正确

### 本地可以运行，线上接口报错

请检查：

- Cloudflare Pages 环境变量是否已经配置
- `wrangler.toml` 配置是否正确
- Pages 项目名称是否一致
- API 是否依赖仅在特定环境中存在的数据
- Cloudflare Functions 日志中是否有报错

### 修改代码后页面没有变化

请尝试：

1. 确认代码已经推送到 `main` 分支。
2. 查看 Cloudflare Pages 的部署记录。
3. 确认最新一次部署状态为成功。
4. 清理浏览器缓存后重新访问。
5. 使用无痕模式打开网站进行测试。

## 安全说明

- 不要在前端代码中填写 Cloudflare API Token。
- 不要通过接口返回 Cookie、Token、Authorization 等敏感信息。
- 密钥应通过 Cloudflare 环境变量或 Secret 保存。
- 对外公开的 API 应增加参数验证和请求限制。
- 上线前请检查接口是否包含调试信息或内部配置。
- 请勿使用本项目收集或公开他人的敏感信息。

## 使用场景

本项目可用于：

- 域名访问检测
- Cloudflare 请求信息展示
- 网络环境信息查询
- Cloudflare Pages Functions 学习
- API 连通性测试
- 自定义域名部署测试
- 轻量级网络工具页面

## 贡献

欢迎提交 Issue 和 Pull Request。

如果你发现问题或有新的功能建议，可以通过 GitHub Issues 进行反馈。

## 开源协议

本项目的开源许可请以仓库中的 `LICENSE` 文件为准。

如果仓库暂时没有 `LICENSE` 文件，则默认不代表允许任意复制、修改或分发项目代码，建议项目维护者根据实际需要添加合适的开源协议。

## 免责声明

本项目仅供学习、开发和合法测试使用。

使用者应遵守当地法律法规、Cloudflare 服务条款及相关网络服务规则。禁止将本项目用于未经授权的信息收集、网络攻击、恶意扫描或其他违法用途。

因使用本项目造成的任何直接或间接损失，由使用者自行承担。

## 项目地址

[https://github.com/love-ztm/cf-domain-show](https://github.com/love-ztm/cf-domain-show)

如果这个项目对你有帮助，欢迎点一个 ⭐ Star。
