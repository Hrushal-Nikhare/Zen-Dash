// Remove the getAllInWindow call which may not exist
browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.data === "tabs") {
        browser.tabs.query({})
            .then(tabs => {
                sendResponse({ success: true, tabs });
            })
            .catch(error => {
                console.error("Error querying tabs:", error);
                sendResponse({ success: false, error: error.message });
            });
        return true; // Keep the message channel open for async response
    }
    sendResponse({ success: false, message: "Unknown request" });
    return true;
});
