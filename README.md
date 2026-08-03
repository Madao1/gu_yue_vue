# gu_yue_vue

220kV 古苑变建筑工程大屏 UI 的 Vue 2 重写版本 — **智慧绿色工地管控系统** 前端。

## 项目简介

本项目是智慧绿色工地管控系统的大屏前端，对应 Spring Boot 后端仓库 `gu_yue/`。系统实时展示施工现场的环境监测数据、设备运行状态，并提供设备远程控制能力。

## 技术栈

| 类别 | 技术 |
| ---- | ---- |
| 框架 | Vue 2.7（Options API） |
| 路由 | Vue Router 3（history 模式） |
| 构建 | Vite 5（`@vitejs/plugin-vue2`） |
| 图表 | ECharts 5、ApexCharts 3 |
| 实时通信 | STOMP over SockJS（`@stomp/stompjs` + `sockjs-client`） |
| HTTP | 原生 `fetch`（无 axios） |

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器（默认端口 5173，自动打开浏览器）
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview
```

> 开发服务器通过 Vite 代理将 `/api` 与 `/ws` 请求转发至后端 `http://localhost:8080`，需确保后端已启动。

## 页面路由

| 路径 | 名称 | 说明 |
| ---- | ---- | ---- |
| `/` | Dashboard | 数据大屏首页 |
| `/weather` | Weather | 施工现场晴雨表 |
| `/detail/:type` | Detail | 环境/设备详情弹窗（1-6 分别对应温度、湿度、CO₂、PM2.5、风速、化学气体） |

## 目录结构

```
gu_yue_vue/
├── index.html              # HTML 入口
├── vite.config.js          # Vite 配置（别名、代理、端口）
├── jsconfig.json           # JS 路径别名配置
├── public/
│   ├── icons/              # 环境指标与设备状态图标
│   └── images/             # 图片资源
└── src/
    ├── main.js             # 入口文件（Vue 实例、路由、全局样式）
    ├── App.vue             # 根组件（仅含 <router-view>）
    ├── api/
    │   ├── environment.js  # REST API：获取实时快照、切换设备
    │   └── websocket.js    # STOMP/SockJS 客户端（自动重连、指数退避）
    ├── charts/             # ECharts 配置工厂（静态演示数据）
    │   ├── chartDust24h.js # 24H 扬尘折线图
    │   ├── chartNoise24h.js# 24H 噪声象形柱状+折线图
    │   ├── chartRainMonth.js # 月雨水量玫瑰图
    │   └── chartTemp24h.js # 24H 温度渐变色柱状图
    ├── components/
    │   ├── BoxPanel.vue    # 面板容器（标题 + 插槽）
    │   ├── EchartPanel.vue # 可复用 ECharts 容器（响应式 resize）
    │   ├── EnvStatus.vue   # 12 项环境指标网格（噪声、PM10/2.5、TSP、风速风向等）
    │   ├── EquipStatus.vue # 8 个可切换设备（喷淋、雾炮、洗车槽、照明等）
    │   ├── SafetyDays.vue  # 安全运行天数倒计时显示
    │   ├── WeatherCalendar.vue # 施工现场晴雨表日历（随机演示数据）
    │   ├── LayoutHeader.vue # 顶部标题栏（实时时钟、项目名称）
    │   ├── ApexChartDetail.vue # 详情弹窗 ApexCharts 图表（随机演示数据）
    │   ├── HelloWorld.vue  # ⚠️ 脚手架遗留组件（未使用）
    ├── data/
    │   └── detailData.js   # 详情弹窗 6 类指标的静态配置
    ├── router/
    │   └── index.js        # 路由配置
    ├── store/
    │   └── index.js        # ⚠️ 空 Vuex store（脚手架遗留，未使用）
    ├── styles/
    │   ├── common.css      # 全局样式重置
    │   └── map.css         # 地图相关样式
    └── views/
        ├── Dashboard.vue   # 大屏首页（三栏布局）
        ├── WeatherPage.vue # 晴雨表页面
        ├── DetailModal.vue # 详情弹窗（页签：图表 / 数值 / 记录表）
        ├── HomeView.vue    # ⚠️ 脚手架遗留页面（未使用）
        └── AboutView.vue   # ⚠️ 脚手架遗留页面（未使用）
```

## 核心功能

### 1. 数据大屏（`/`）

三栏布局：

- **左栏**：实时环境状况（12 项指标）+ 环境设备状况（8 个可切换设备）
- **中栏**：安全运行天数 + 施工现场晴雨表 + 24H 扬尘状况
- **右栏**：月雨水量（玫瑰图）、24H 温度状况、24H 噪声状况

### 2. 实时数据流

- **REST 初始拉取**：`getCurrentSnapshot()` 请求 `GET /api/environment/current` 获取初始快照
- **WebSocket 实时推送**：STOMP over SockJS 连接 `/ws`，订阅 `/topic/environment` 接收实时快照
- **容错机制**：断线自动重连（指数退避 3s → 30s 封顶）、连接状态指示器、快照格式校验

### 3. 设备控制

- 点击可切换设备 → `POST /api/environment/devices/{key}/toggle`
- 支持解析多种开关状态值（`开启/关闭/true/false/1/0`），含操作中防重复点击保护

### 4. 详情弹窗（`/detail/:type`）

- 点击环境指标打开详情弹窗，type 1-6 分别对应温度、湿度、CO₂、PM2.5、风速、化学气体
- 页签 UI：历史日均图表（ApexCharts）、当前数值、报警记录表格

## 后端接口约定

前端通过 Vite 代理访问后端（默认 `localhost:8080`），接口约定如下：

### REST

| 方法 | 路径 | 说明 |
| ---- | ---- | ---- |
| GET | `/api/environment/current` | 获取当前环境 + 设备快照 |
| GET | `/api/environment/realtime` | 获取实时环境数据 |
| GET | `/api/environment/devices` | 获取设备状态 |
| POST | `/api/environment/devices/{deviceKey}/toggle` | 切换设备开关 |

### WebSocket

| 项 | 值 |
| -- | -- |
| 连接端点 | `/ws`（SockJS） |
| 订阅主题 | `/topic/environment` |

### 响应格式

```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

## 实现现状与注意事项

- ✅ **真实数据已接通**：环境指标、设备状态通过 REST + WebSocket 实时更新；设备切换调用真实后端接口。
- ⚠️ **静态/演示数据**：所有 ECharts 图表、晴雨表日历、ApexCharts 详情图表、详情表格均使用硬编码或随机数据，尚未对接真实接口。
- ⚠️ **遗留代码**：`HomeView.vue`、`AboutView.vue`、`HelloWorld.vue` 与空的 Vuex store 为脚手架遗留，当前未使用。
- 状态管理未使用 Vuex，组件状态均存放在各组件 `data()` 中。