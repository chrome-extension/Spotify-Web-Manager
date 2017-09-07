
/*
// Notify the music playing
chrome.tabs.onCreated.addListener(event => {
    console.log('Tab Creation');
    const notificationOptions = {
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Music Title',
        message: 'Musique Groupe and Duration'
    };
    // chrome.notifications.create('id', notificationOptions);
});
*/

// Play or pause the song
chrome.commands.onCommand.addListener(() => playPause());

const playPause = () => {
    chrome.tabs.query({}, tabs => {
        if(hasSpotifyTabs(tabs)) {
            chrome.tabs.executeScript(getSpotifyTabId(tabs),
                {code :'document.querySelector(\'button.control-button.control-button--circled\').click()'})
        }
    })
};

const hasSpotifyTabs = (tabs) => {
  for(let tab of tabs) {
      if (tab.url.startsWith('https://open.spotify.com')) {
          return true
      }
  }
  return false;
};

const getSpotifyTabId = (tabs) => {
    for(let tab of tabs) {
        if (tab.url.startsWith('https://open.spotify.com')) {
            console.log(tab);
            return tab.id
        }
    }
};