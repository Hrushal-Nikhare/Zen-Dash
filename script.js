// Date.prototype.timeNow = function () {
//     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
// }

let now = new Date();
let currentTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'});
console.log(currentTime);

document.getElementById('time').innerHTML = currentTime;
// console.log(browser.tabs.getAllInWindow())
browser.runtime.sendMessage({data: "tabs"}).then((response) => {
    console.log(response);
    // Create a neat representation of tabs
    const escapeHTML = (str) => {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };

    const createTabsHTML = (tabs) => {
        if (!tabs || tabs.length === 0) {
            return '<p>No tabs found</p>';
        }
        
        return tabs.map(tab => {
            const title = escapeHTML(tab.title || 'Untitled Tab');
            const truncatedTitle = title.length > 30 ? 
                `${title.substring(0, 30)}...` : title;
            
            const favicon = tab.favIconUrl ? 
                `<img src="${escapeHTML(tab.favIconUrl)}" alt="" class="tab-favicon">` : 
                '<div class="tab-favicon-placeholder"></div>';
            
            return `
                <div class="tab-item" title="${title}">
                    ${favicon}
                    <span class="tab-title">${truncatedTitle}</span>
                </div>
            `;
        }).join('');
    };
    
    document.getElementById('tabs').innerHTML = 
        `<div class="tabs-container">${createTabsHTML(response.tabs)}</div>`;
});