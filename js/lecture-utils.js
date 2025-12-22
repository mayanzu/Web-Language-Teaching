// ============================================
// 讲义通用工具函数库
// 提供所有讲义共用的交互逻辑和工具方法
// ============================================

// 存储所有实验的初始内容
const initialContents = {};

// 存储 HTML+CSS 实验的初始内容
const initialHtmlCssContents = {};

// 页面加载时初始化所有实验的初始内容
document.addEventListener('DOMContentLoaded', function() {
    // 存储所有HTML编辑器的初始内容
    const htmlEditors = document.querySelectorAll('[id^="html-"]');
    htmlEditors.forEach(editor => {
        const id = editor.id.replace('html-', '');
        initialContents[id] = editor.innerHTML;
        // 同时存储到 HTML+CSS 专用对象
        initialHtmlCssContents[editor.id] = editor.innerHTML;
    });
    
    // 存储所有CSS编辑器的初始内容
    const cssEditors = document.querySelectorAll('[id^="css-"]');
    cssEditors.forEach(editor => {
        initialHtmlCssContents[editor.id] = editor.innerHTML;
    });
    
    // 存储特定实验的初始内容
    const specificEditors = document.querySelectorAll('[id$="-html"]');
    specificEditors.forEach(editor => {
        const id = editor.id.replace('-html', '');
        initialContents[id] = editor.innerHTML;
    });

    // 存储所有代码编辑器和预览区域的初始内容
    const allEditors = document.querySelectorAll('.code-editor, .html-editor');
    allEditors.forEach(editor => {
        if (editor.id) initialContents[editor.id] = editor.innerHTML;
    });

    const allPreviews = document.querySelectorAll('[id*="preview"], [id*="output"], [id*="display"]');
    allPreviews.forEach(preview => {
        if (preview.id) initialContents[preview.id] = preview.innerHTML;
    });
});

// 运行HTML实验
function runHtmlExperiment(editorId, previewId, statusId) {
    const editor = document.getElementById(editorId);
    const preview = document.getElementById(previewId);
    const status = document.getElementById(statusId);
    
    if (editor && preview) {
        let code = editor.innerText;
        // 移除编辑器标签
        code = code.replace('HTML (可编辑)', '');
        code = code.replace('CSS (可编辑)', '');
        code = code.replace('JavaScript (可编辑)', '');
        
        // 注入到预览区域
        preview.innerHTML = code;
        
        // 更新状态
        if (status) {
            status.textContent = '已运行';
            status.className = 'status-badge active';
        }
    }
}

// 重置HTML实验
function resetHtmlExperiment(editorId, previewId, statusId) {
    const editor = document.getElementById(editorId);
    const preview = document.getElementById(previewId);
    const status = document.getElementById(statusId);
    
    // 恢复编辑器的初始内容
    if (editor && initialContents[editorId]) {
        editor.innerHTML = initialContents[editorId];
    }
    
    // 重置预览区域
    if (preview) {
        preview.innerHTML = '<div class="panel-label">预览效果</div>';
    }
    
    // 更新状态
    if (status) {
        status.textContent = '未运行';
        status.className = 'status-badge';
    }
}

// 运行CSS实验
function runCssExperiment(editorId, previewId, statusId) {
    const editor = document.getElementById(editorId);
    const preview = document.getElementById(previewId);
    const status = document.getElementById(statusId);
    
    if (editor && preview) {
        let code = editor.innerText;
        // 移除编辑器标签
        code = code.replace('CSS (可编辑)', '');
        
        // 创建style标签
        const style = document.createElement('style');
        style.textContent = code;
        
        // 注入到预览区域
        preview.innerHTML = '<div class="panel-label">预览效果</div>';
        preview.appendChild(style);
        
        // 更新状态
        if (status) {
            status.textContent = '已运行';
            status.className = 'status-badge active';
        }
    }
}

// 运行 HTML + CSS 组合实验
function runHtmlCssExperiment(htmlEditorId, cssEditorId, previewId, statusId) {
    const htmlEditor = document.getElementById(htmlEditorId);
    const cssEditor = document.getElementById(cssEditorId);
    const preview = document.getElementById(previewId);
    const status = document.getElementById(statusId);
    
    if (htmlEditor && cssEditor && preview) {
        // 获取 HTML 代码
        let htmlCode = htmlEditor.innerText;
        htmlCode = htmlCode.replace('HTML (可编辑)', '').trim();
        
        // 获取 CSS 代码
        let cssCode = cssEditor.innerText;
        cssCode = cssCode.replace('CSS (可编辑)', '').trim();
        
        // 清空预览区域
        preview.innerHTML = '';
        
        // 创建一个隔离的容器
        const container = document.createElement('div');
        container.className = 'html-css-preview-container';
        
        // 创建 style 标签并添加 scoped 样式
        const style = document.createElement('style');
        // 为 CSS 规则添加容器前缀，实现样式隔离
        const scopedCss = cssCode.replace(/([^{}]+)\{/g, function(match, selector) {
            // 处理多个选择器（逗号分隔）
            const selectors = selector.split(',').map(s => {
                s = s.trim();
                // 跳过 @规则
                if (s.startsWith('@')) return s;
                // 为每个选择器添加容器前缀
                return `#${previewId} .html-css-preview-container ${s}`;
            });
            return selectors.join(', ') + ' {';
        });
        style.textContent = scopedCss;
        
        // 注入 HTML 内容
        container.innerHTML = htmlCode;
        
        // 添加到预览区域
        preview.appendChild(style);
        preview.appendChild(container);
        
        // 更新状态
        if (status) {
            status.textContent = '已运行';
            status.className = 'status-badge active';
        }
    }
}

// 重置 HTML + CSS 组合实验
function resetHtmlCssExperiment(htmlEditorId, cssEditorId, previewId, statusId) {
    const htmlEditor = document.getElementById(htmlEditorId);
    const cssEditor = document.getElementById(cssEditorId);
    const preview = document.getElementById(previewId);
    const status = document.getElementById(statusId);
    
    // 恢复 HTML 编辑器的初始内容
    if (htmlEditor && initialHtmlCssContents[htmlEditorId]) {
        htmlEditor.innerHTML = initialHtmlCssContents[htmlEditorId];
    }
    
    // 恢复 CSS 编辑器的初始内容
    if (cssEditor && initialHtmlCssContents[cssEditorId]) {
        cssEditor.innerHTML = initialHtmlCssContents[cssEditorId];
    }
    
    // 清空预览区域
    if (preview) {
        preview.innerHTML = '';
    }
    
    // 更新状态
    if (status) {
        status.textContent = '动手实践';
        status.className = 'status-badge beginner';
    }
}

// 运行JavaScript实验
function runJsExperiment(editorId, previewId, statusId) {
    const editor = document.getElementById(editorId);
    const preview = document.getElementById(previewId);
    const status = document.getElementById(statusId);
    
    if (editor && preview) {
        let code = editor.innerText;
        // 移除编辑器标签
        code = code.replace('JavaScript (可编辑)', '');
        
        try {
            // 执行JavaScript代码
            const result = eval(code);
            
            // 显示结果
            preview.innerHTML = `<div class="panel-label">运行结果</div><pre>${JSON.stringify(result, null, 2)}</pre>`;
            
            // 更新状态
            if (status) {
                status.textContent = '已运行';
                status.className = 'status-badge active';
            }
        } catch (error) {
            // 显示错误信息
            preview.innerHTML = `<div class="panel-label">运行错误</div><pre style="color: #d73a49;">${error.message}</pre>`;
            
            // 更新状态
            if (status) {
                status.textContent = '运行出错';
                status.className = 'status-badge active';
            }
        }
    }
}

// 运行JS DOM实验 (不覆盖预览区，只执行代码)
function runJsDomExperiment(editorId, statusId) {
    const editor = document.getElementById(editorId);
    const status = document.getElementById(statusId);
    
    if (editor) {
        let code = editor.innerText;
        code = code.replace('JavaScript (可编辑)', '');
        
        // 自动查找顶层函数并挂载到 window，以便 HTML 中的 onclick 能调用
        const functionMatches = code.matchAll(/(?:async\s+)?function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\(/g);
        let exportCode = '\n// Auto-export functions to window\n';
        for (const match of functionMatches) {
            const funcName = match[1];
            exportCode += `if (typeof ${funcName} === 'function') { window.${funcName} = ${funcName}; }\n`;
        }
        
        try {
            // 使用普通 eval (保留局部作用域，支持 let 重复运行)，但配合 exportCode 暴露函数
            eval(code + exportCode);
            
            if (status) {
                status.textContent = '已运行';
                status.className = 'status-badge active';
            }
        } catch (error) {
            console.error(error);
            alert('运行出错: ' + error.message);
        }
    }
}

// 重置JS DOM实验
function resetJsDomExperiment(editorId, previewId, statusId) {
    const editor = document.getElementById(editorId);
    const preview = document.getElementById(previewId);
    const status = document.getElementById(statusId);
    
    if (editor && initialContents[editorId]) {
        editor.innerHTML = initialContents[editorId];
    }
    
    if (preview && initialContents[previewId]) {
        preview.innerHTML = initialContents[previewId];
    }
    
    if (status) {
        status.textContent = '未运行';
        status.className = 'status-badge';
    }
}

// 应用HTML代码
function applyHTML(id) {
    const editor = document.getElementById(`html-${id}`);
    const preview = document.getElementById(`preview-${id}`);
    
    if (editor && preview) {
        let code = editor.innerText;
        // 移除编辑器标签
        code = code.replace('HTML (可编辑)', '');
        
        // 注入到预览区域
        preview.innerHTML = code;
        
        // 更新状态
        updateStatus(id, true);
    }
}

// 重置HTML代码
function resetHTML(id) {
    const editor = document.getElementById(`html-${id}`);
    const preview = document.getElementById(`preview-${id}`);
    
    if (editor) {
        // 恢复编辑器的初始内容
        if (initialContents[id]) {
            editor.innerHTML = initialContents[id];
        }
        
        // 清空预览
        if (preview) {
            preview.innerHTML = '<div class="panel-label">预览效果</div>';
        }
        
        // 更新状态
        updateStatus(id, false);
    }
}

// 更新状态标签
function updateStatus(id, isActive) {
    const badge = document.getElementById(`badge-${id}`);
    if (badge) {
        if (isActive) {
            badge.textContent = "已运行";
            badge.className = "status-badge status-active";
        } else {
            badge.textContent = "未运行";
            badge.className = "status-badge";
        }
    }
}

// 应用CSS代码
function applyCSS(id) {
    const editor = document.getElementById(`css-${id}`);
    const preview = document.getElementById(`preview-${id}`);
    
    if (editor && preview) {
        let code = editor.innerText;
        // 移除编辑器标签
        code = code.replace('CSS (可编辑)', '');
        
        // 创建style标签
        const style = document.createElement('style');
        style.textContent = code;
        
        // 注入到预览区域
        preview.innerHTML = '<div class="panel-label">预览效果</div>';
        preview.appendChild(style);
        
        // 更新状态
        updateStatus(id, true);
    }
}

// 重置CSS代码
function resetCSS(id) {
    const editor = document.getElementById(`css-${id}`);
    const preview = document.getElementById(`preview-${id}`);
    
    if (editor) {
        // 恢复编辑器的初始内容
        if (initialContents[id]) {
            editor.innerHTML = initialContents[id];
        }
        
        // 清空预览
        if (preview) {
            preview.innerHTML = '<div class="panel-label">预览效果</div>';
        }
        
        // 更新状态
        updateStatus(id, false);
    }
}

// 应用JavaScript代码
function applyJS(id) {
    const editor = document.getElementById(`js-${id}`);
    const preview = document.getElementById(`preview-${id}`);
    
    if (editor && preview) {
        let code = editor.innerText;
        // 移除编辑器标签
        code = code.replace('JavaScript (可编辑)', '');
        
        try {
            // 执行JavaScript代码
            const result = eval(code);
            
            // 显示结果
            preview.innerHTML = `<div class="panel-label">运行结果</div><pre>${JSON.stringify(result, null, 2)}</pre>`;
            
            // 更新状态
            updateStatus(id, true);
        } catch (error) {
            // 显示错误信息
            preview.innerHTML = `<div class="panel-label">运行错误</div><pre style="color: #d73a49;">${error.message}</pre>`;
            
            // 更新状态
            updateStatus(id, true);
        }
    }
}

// 重置JavaScript代码
function resetJS(id) {
    const editor = document.getElementById(`js-${id}`);
    const preview = document.getElementById(`preview-${id}`);
    
    if (editor) {
        // 恢复编辑器的初始内容
        if (initialContents[id]) {
            editor.innerHTML = initialContents[id];
        }
        
        // 清空预览
        if (preview) {
            preview.innerHTML = '<div class="panel-label">预览效果</div>';
        }
        
        // 更新状态
        updateStatus(id, false);
    }
}

// 移除CSS代码
function removeCSS(id) {
    const preview = document.getElementById(`preview-${id}`);
    if (preview) {
        preview.innerHTML = '<div class="panel-label">预览效果</div>';
    }
    updateStatus(id, false);
}

// 移除JavaScript代码
function removeJS(id) {
    const preview = document.getElementById(`preview-${id}`);
    if (preview) {
        preview.innerHTML = '<div class="panel-label">预览效果</div>';
    }
    updateStatus(id, false);
}