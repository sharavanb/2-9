// 获取公司名称
const companyName = document.querySelector('.hero h1').textContent.trim();

// 获取首个单词或首字母
function getLogoText(name) {
    const words = name.split(' ');
    return words.length > 1 ? words[0] : name.charAt(0);
}

// 生成SVG logo
function generateLogoSVG(text) {
    const colors = ['#007bff', '#0056b3']; // 使用主色和深色变体
    return `
    <svg width="100%" height="100%" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:${colors[0]};stop-opacity:1" />
                <stop offset="100%" style="stop-color:${colors[1]};stop-opacity:1" />
            </linearGradient>
        </defs>
        <text x="50%" y="50%" 
              dominant-baseline="middle" 
              text-anchor="middle"
              fill="url(#logoGradient)"
              style="font-family: 'Inter', sans-serif; font-weight: 700; font-size: 40px;">
            ${text}
        </text>
    </svg>
    `;
}

// 生成favicon
function generateFavicon(text) {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    // 设置背景
    ctx.fillStyle = '#007bff';
    ctx.fillRect(0, 0, 32, 32);

    // 设置文本
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text.charAt(0), 16, 16);

    return canvas.toDataURL();
}

// 应用logo和favicon
function applyDynamicBranding() {
    const logoText = getLogoText(companyName);
    
    // 更新所有logo图片
    document.querySelectorAll('.logo, .footer-logo').forEach(logo => {
        logo.outerHTML = generateLogoSVG(logoText);
    });

    // 更新favicon
    const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
    favicon.type = 'image/x-icon';
    favicon.rel = 'icon';
    favicon.href = generateFavicon(logoText);
    if (!document.querySelector('link[rel="icon"]')) {
        document.head.appendChild(favicon);
    }
}

// 当DOM加载完成后执行
document.addEventListener('DOMContentLoaded', applyDynamicBranding); 