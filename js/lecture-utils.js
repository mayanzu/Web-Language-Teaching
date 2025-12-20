// ============================================
// 讲义通用工具函数库
// 提供所有讲义共用的交互逻辑和工具方法
// ============================================

// 存储所有实验的初始内容
const initialContents = {};

// 页面加载时初始化所有实验的初始内容
document.addEventListener('DOMContentLoaded', function() {
    // 存储所有HTML编辑器的初始内容
    const htmlEditors = document.querySelectorAll('[id^="html-"]');
    htmlEditors.forEach(editor => {
        const id = editor.id.replace('html-', '');
        initialContents[id] = editor.innerHTML;
    });
    
    // 存储特定实验的初始内容
    const specificEditors = document.querySelectorAll('[id$="-html"]');
    specificEditors.forEach(editor => {
        const id = editor.id.replace('-html', '');
        initialContents[id] = editor.innerHTML;
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