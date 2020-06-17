chrome.webNavigation.onBeforeNavigate.addListener(function({url: currentUrl}) {
  if (!currentUrl.match('authuser')) {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      const tab = tabs[0];
      const separator = currentUrl.match("\\?") ? "&" : "?";
      const destination = `${currentUrl}${separator}authuser=1`;
      console.info(`Redirected from ${currentUrl} to ${destination}`);
      chrome.tabs.update(tab.id, {url: destination});
    });
  }
}, { url: [{ hostEquals: 'meet.google.com' }] });
