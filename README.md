# gu_yue_vue

220kV 古苑变建筑工程大屏 UI 的 Vue 2 重写版本 — **智慧绿色工地管控系统** 前端。

## 项目简介

本项目是智慧绿色工地管控系统的大屏前端，对应 Spring Boot 后端仓库 `gu_yue/`。系统通过 REST + WebSocket 实时展示施工现场的环境监测数据、设备运行状态、安全运行天数及晴雨表，并提供设备远程控制能力。

## 技术栈

| 类别 | 技术 |
| ---- | ---- |
| 框架 | Vue 2.7.16（Options API） |
| 路由 | Vue Router 3.6.5（history 模式） |
| 构建 | Vite 5.4.14（`@vitejs/plugin-vue2`） |
| 图表 | ECharts 5.6.0、ApexCharts 3.54.1 |
| 实时通信 | STOMP over SockJS（`@stomp/stompjs` 7.0.0 + `sockjs-client`） |
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
| `/detail/:type` | Detail | 环境/设备详情弹窗；`type` 可为指标 key（`noise`、`pm10`、`pm25`、`tsp`、`dust`、`windSpeed`、`windDirection`、`precipitation`、`airPressure`、`temperature`、`humidity`、`smoke1`、`smoke2`）或旧数字类型 1-6（1=温度、2=湿度、4=PM2.5、5=风速；3=CO2、6=化学气体为遗留类型，环境中暂无对应实时数据） |

## 目录结构

```
gu_yue_vue/
├── index.html              # HTML 入口
├── vite.config.js          # Vite 配置（别名、代理、端口）
├── jsconfig.json           # JS 路径别名配置
├── package.json            # 依赖与脚本
├── public/
│   ├── icons/              # 环境指标与设备状态图标
│   └── images/             # 图片资源
└── src/
    ├── main.js             # 入口文件（Vue 实例、路由、全局样式）
    ├── App.vue             # 根组件（仅含 <router-view>）
    ├── api/
    │   ├── environment.js  # REST API：环境快照、历史数据、设备切换
    │   ├── safetyDays.js   # 安全运行天数 API
    │   ├── weatherCalendar.js # 晴雨表 API
    │   └── websocket.js    # STOMP/SockJS 客户端（自动重连、指数退避）
    ├── charts/             # ECharts 配置工厂（均从后端 API 加载数据）
    │   ├── chartDust24h.js   # 24H 扬尘折线图
    │   ├── chartNoise24h.js  # 24H 噪声象形柱状+折线图
    │   ├── chartRainMonth.js # 31 天降水量柱状图
    │   └── chartTemp24h.js   # 24H 温度渐变色柱状图
    ├── components/
    │   ├── ApexChartDetail.vue # 详情弹窗历史数据 ApexCharts 图表
    │   ├── BoxPanel.vue    # 面板容器（标题 + 插槽）
    │   ├── EchartPanel.vue # 可复用 ECharts 容器（响应式 resize）
    │   ├── EnvStatus.vue   # 12 项环境指标网格（噪声、PM10/2.5、TSP、风速风向等）
    │   ├── EquipStatus.vue # 8 个可切换设备（喷淋、雾炮、洗车槽、照明等）
    │   ├── LayoutHeader.vue # 顶部标题栏（实时时钟、项目名称）
    │   ├── SafetyDays.vue  # 安全运行天数倒计时显示
    │   └── WeatherCalendar.vue # 施工现场晴雨表日历
    ├── data/
    │   └── detailData.js   # 详情弹窗 13 项指标配置
    ├── router/
    │   └── index.js        # 路由配置（全部懒加载）
    ├── store/
    │   └── index.js        # 空 Vuex store（脚手架遗留，未使用）
    ├── styles/
    │   ├── common.css      # 全局样式重置
    │   └── map.css         # 地图相关样式
    └── views/
        ├── Dashboard.vue   # 大屏首页（三栏布局）
        ├── WeatherPage.vue # 晴雨表页面
        ├── DetailModal.vue # 详情弹窗（历史数据图表）
        ├── HomeView.vue    # 脚手架遗留页面（未使用）
        └── AboutView.vue   # 脚手架遗留页面（未使用）
```

## 核心功能

### 1. 数据大屏（`/`）

三栏布局：

- **左栏**：实时环境状况（12 项指标）+ 环境设备状况（8 个可切换设备）
- **中栏**：安全运行天数 + 施工现场晴雨表 + 24H 扬尘状况
- **右栏**：31 天降水量、24H 温度状况、24H 噪声状况

### 2. 实时数据流

- **REST 初始拉取**：`getCurrentSnapshot()` 请求 `GET /api/environment/current` 获取初始快照
- **WebSocket 实时推送**：STOMP over SockJS 连接 `/ws`，订阅 `/topic/environment` 接收实时快照；后端每 5 秒推送一次
- **容错机制**：断线自动重连（指数退避 3s → 30s 封顶）、连接状态指示器、快照格式校验

### 3. 历史数据与图表

大屏历史图表均从后端 API 加载，含 loading / error / empty 状态：

- **24H 扬尘 / 温度 / 噪声**：`GET /api/environment/history/{metric}/hourly`
- **31 天降水量**：`GET /api/environment/history/precipitation/daily`
- **详情弹窗历史数据**：`GET /api/environment/history/{metric}`（默认 `limit=2000`）

支持的历史指标 key：

```text
noise、pm10、pm25、tsp、dust、windSpeed、windDirection、
precipitation、airPressure、temperature、humidity、smoke1、smoke2
```

其中 `windDirection`、`smoke1`、`smoke2` 为非数值型指标，详情弹窗仅展示占位。

### 4. 设备控制

- 点击可切换设备 → `POST /api/environment/devices/{key}/toggle`
- 支持解析多种开关状态值（`开启/开/true/1`、`关闭/关/闭/false/0`），含操作中防重复点击保护

### 5. 详情弹窗（`/detail/:type`）

- 支持 13 项环境指标（见第 3 节），旧路由数字 1-6 兼容映射
- 历史数据图表通过 ApexCharts 展示指标历史趋势；非数值型指标显示占位

### 6. 晴雨表页面（`/weather`）

- 调用 `GET /api/weather-calendar?year=&month=` 按年月获取每日天气、温度、累计降水
- 降雨量阈值由后端配置 `app.weather.rain-threshold` 决定

### 7. 安全运行天数

- 调用 `GET /api/safety-days` 获取安全运行天数、施工天数、竣工倒计时

## 后端接口约定

前端通过 Vite 代理访问后端（默认 `localhost:8080`），接口约定如下：

### REST

| 方法 | 路径 | 说明 |
| ---- | ---- | ---- |
| GET | `/api/environment/current` | 获取当前环境 + 设备快照 |
| GET | `/api/environment/history/{metric}` | 获取指定指标历史数据（可选 `start`、`end`、`limit`） |
| GET | `/api/environment/history/{metric}/hourly` | 获取指定指标最近 24 小时历史数据 |
| GET | `/api/environment/history/precipitation/daily` | 获取最近 31 天日累计降水量 |
| POST | `/api/environment/devices/{deviceKey}/toggle` | 切换设备开关 |
| GET | `/api/safety-days` | 获取安全运行天数、施工天数、竣工倒计时 |
| GET | `/api/weather-calendar?year=&month=` | 获取指定年月的晴雨表数据 |

### WebSocket

| 项 | 值 |
| -- | -- |
| 连接端点 | `/ws`（SockJS） |
| 订阅主题 | `/topic/environment` |
| 推送频率 | 后端每 5 秒推送一次（需开启 `app.websocket.push.enabled`） |

### 响应格式

```json
{
  "code": 200,
  "message": "success",
  "data": {},
  "timestamp": "2026-07-28T15:00:00"
}
```

## 实现现状与注意事项

- 大屏环境指标、设备状态、历史图表、晴雨表、安全运行天数均已接入真实后端接口。
- 所有路由视图与图表模块均通过动态 `import()` 懒加载，降低首屏体积。
- 状态管理未使用 Vuex，组件状态均存放在各组件 `data()` 中。
- `HomeView.vue`、`AboutView.vue`、`HelloWorld.vue` 与空 Vuex store 为脚手架遗留，当前未使用。
