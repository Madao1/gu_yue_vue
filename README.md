# gu_yue_vue

220kV 古苑变建筑工程大屏 UI 的 Vue 2 重写版本。

## 技术栈

- Vue 2.7
- Vue Router 3
- Vite 5
- ECharts 5
- ApexCharts 3

## 启动

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 页面

- `/` — 数据大屏首页
- `/weather` — 施工现场晴雨表
- `/detail/:type` — 环境/设备详情（1-6 分别对应温度、湿度、CO₂、PM2.5、风速、化学气体）
