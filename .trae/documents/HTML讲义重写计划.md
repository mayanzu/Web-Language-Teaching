# HTML讲义重写计划

## 一、目标
根据CSS讲义的样式和内容详细程度，将HTML讲义彻底重写为12次课，采用统一的Apple Developer风格设计。

## 二、课程结构规划

### 第1课：HTML基础入门
- 什么是HTML
- HTML文档结构
- 常用文本标签
- 第一个HTML页面

### 第2课：HTML排版与文本格式化
- 标题与段落
- 文本样式（粗体、斜体、下划线等）
- 换行与水平线
- 特殊字符

### 第3课：HTML列表
- 无序列表（ul/li）
- 有序列表（ol/li）
- 定义列表（dl/dt/dd）
- 列表嵌套

### 第4课：HTML链接
- 基本链接语法
- 链接属性（target, title等）
- 内部链接与锚点
- 邮件链接与电话链接

### 第5课：HTML图片
- 图片标签语法
- 图片属性（alt, width, height等）
- 相对路径与绝对路径
- 图片格式（JPG, PNG, GIF, SVG）

### 第6课：HTML表格基础
- 表格结构（table, tr, td, th）
- 表头与表体
- 表格属性
- 简单表格制作

### 第7课：HTML表格进阶
- 合并单元格（colspan, rowspan）
- 表格样式
- 复杂表格制作
- 表格语义化

### 第8课：HTML表单基础
- 表单结构（form, input, button）
- 文本输入控件
- 单选按钮与复选框
- 提交与重置按钮

### 第9课：HTML表单进阶
- 下拉菜单（select, option）
- 文本域（textarea）
- 表单分组（fieldset, legend）
- 表单验证基础

### 第10课：HTML语义化标签
- 什么是语义化
- 常见语义化标签（header, nav, main, section, article, footer等）
- 语义化结构设计
- 语义化的优势

### 第11课：HTML多媒体
- 音频标签（audio）
- 视频标签（video）
- 嵌入内容（iframe）
- 媒体属性与事件

### 第12课：HTML5新特性与最佳实践
- HTML5新标签
- 本地存储简介
- 响应式设计基础
- HTML最佳实践与规范

## 三、讲义设计方案

### 1. 样式设计
采用与CSS讲义一致的Apple Developer风格：
- 统一的CSS变量定义
- 侧边栏固定导航
- 流畅的滚动效果
- 清晰的层次结构
- 现代化的配色方案

### 2. 内容组织
- 每课包含：课程概览、多个知识点章节、示例代码、练习题
- 使用表格展示属性和语法
- 加入提示框（💡 提示）和注意事项
- 设计互动实验环节

### 3. 页面结构
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>第X课：HTML XXX</title>
    <style>
        /* Apple Developer风格样式 */
        :root {
            --color-text: #1D1D1F;
            --color-text-light: #86868B;
            --color-heading: #111;
            --color-accent: #0066CC;
            --color-bg: #F5F5F7;
            --color-white: #FFFFFF;
            --border-color: #D2D2D7;
            --code-bg: #f6f8fa;
            /* 其他样式变量 */
        }
        /* 完整样式定义 */
    </style>
</head>
<body>
    <!-- 侧边栏导航 -->
    <nav class="sidebar">
        <div class="sidebar-nav">
            <a href="#intro">👋 课程概览</a>
            <!-- 各章节导航 -->
        </div>
    </nav>
    
    <!-- 主内容区 -->
    <main class="content">
        <header id="intro">
            <h1>第X课：HTML XXX</h1>
            <p class="intro">课程简介...</p>
        </header>
        
        <!-- 各章节内容 -->
        <section id="chapter1">
            <h2>1. XXX</h2>
            <p>内容...</p>
            <!-- 示例代码 -->
            <!-- 表格 -->
            <!-- 提示框 -->
        </section>
        
        <!-- 更多章节 -->
    </main>
</body>
</html>
```

## 四、实施步骤

1. 创建12个HTML讲义文件，每个对应一课
2. 为每个文件应用统一的样式模板
3. 按照课程规划编写内容
4. 加入示例代码和互动元素
5. 确保所有讲义风格一致
6. 测试页面渲染效果

## 五、预期效果

- 12份风格统一、内容详实的HTML讲义
- 采用现代化的Apple Developer设计风格
- 内容覆盖HTML从基础到进阶的全部知识点
- 包含丰富的示例代码和互动环节
- 适合系统化学习HTML的课程体系