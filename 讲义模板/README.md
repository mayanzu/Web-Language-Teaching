# 讲义模板使用说明

## 一、文件结构

```
讲义模板/
├── 讲义模板.html      # 完整的讲义模板文件
└── README.md          # 本说明文档
```

## 二、模板元素清单

### 1. 页面结构
- **侧边栏导航** (`<nav class="sidebar">`)：课程目录和快速跳转
- **主内容区** (`<main class="content">`)：所有正文内容
- **课程头部** (`<header id="intro">`)：标题、简介和知识点标签

### 2. 标题层级
- **h1**：课程主标题，每页仅一个
- **h2**：大章节标题（一、二、三...）
- **h3**：二级小节标题（1.1、1.2...）
- **h4**：三级细分标题

### 3. 提示框组件
| 组件 | CSS类名 | 用途 |
|------|---------|------|
| 提示框 | `.tip-box` | 小技巧、类比说明、辅助理解 |
| 笔记框 | `.note-box` | 重要概念、核心定义 |
| 警告框 | `.warning-box` | 常见错误、易错点 |

### 4. 表格组件
- **属性表格** (`.prop-table`)：用于属性列表、概念对比

### 5. 列表组件
- **普通列表** (`<ul>`, `<ol>`)
- **步骤列表** (`.lab-steps`)：有序步骤说明
- **清单列表** (`.checklist`)：检查项列表

### 6. 代码块组件
- **HTML代码** (`<pre class="html">`)
- **CSS代码** (`<pre class="css">`)
- **JavaScript代码** (`<pre class="js">`)

### 7. 实验卡片组件
| 类型 | 用途 | 状态徽章 |
|------|------|----------|
| 只读展示型 | 示例展示 | `readonly` |
| HTML实验型 | HTML编辑预览 | `beginner` |
| JS交互型 | DOM操作实验 | `beginner` |
| 进阶实验型 | 带输入的复杂实验 | `advanced` |
| 综合案例型 | 整合所有知识点 | `advanced` |

### 8. 知识点标签
- **pill-list**：课程概览的知识点标签列表

## 三、使用方法

### 1. 创建新讲义
1. 复制 `讲义模板.html` 到新的课程文件夹
2. 重命名为 `讲义.html`
3. 修改 `<title>` 和 `<h1>` 为课程标题
4. 更新侧边栏导航链接
5. 填充正文内容

### 2. 添加内容时的注意事项
- 每个 `<section>` 必须有唯一的 `id` 属性
- 侧边栏链接的 `href` 必须与 section 的 `id` 对应
- 代码块使用正确的类名以显示语言标签
- 实验卡片的各个元素 ID 必须保持一致

### 3. 交互实验的函数
- `runHtmlExperiment(editorId, previewId, statusId)` - 运行HTML实验
- `resetHtmlExperiment(editorId, previewId, statusId)` - 重置HTML实验
- `runJsDomExperiment(editorId, statusId)` - 运行JS DOM实验
- `resetJsDomExperiment(editorId, previewId, statusId)` - 重置JS DOM实验

## 四、样式引用

确保以下文件路径正确：
```html
<link rel='stylesheet' href='../统一讲义样式模板.css'>
<script src='../js/lecture-utils.js'></script>
```

## 五、最佳实践

1. **内容组织**：按照"引入 → 概念 → 示例 → 实验 → 总结"的结构组织
2. **代码示例**：先展示简单示例，再逐步增加复杂度
3. **实验设计**：每个实验聚焦于一个具体的知识点
4. **提示框使用**：
   - `tip-box`：辅助理解，非核心内容
   - `note-box`：核心概念，需要记忆
   - `warning-box`：易错点，特别注意
5. **表格使用**：用于结构化对比和总结

## 六、版本更新

- **v1.0** (2025-12-21)：初始版本，包含所有基础组件
