// Background service worker for Abovesaid extension

chrome.runtime.onInstalled.addListener(() => {
  console.log('Abovesaid extension installed');
});

// Handle messages from content script if needed
chrome.runtime.onMessage.addListener(
  (
    message: unknown,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response?: unknown) => void
  ) => {
    console.log('Message received:', message);
    sendResponse({ success: true });
    return true;
  }
);

export {};

