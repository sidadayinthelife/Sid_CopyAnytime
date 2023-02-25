class ControlUI {

    constructor() {
        this.disableTitle = 'Disabled';
        this.enableTitle = 'Enabled';
    } 
    
    setTitle(title) {
        chrome.action.setTitle({
            title:title
        })
    }


    sendMessage(tabId,isEnabled) {
        chrome.tabs.sendMessage(tabId,{
            isEnabled : isEnabled
        })
    }

}



let active = false;
    let tabs = []; 

const UI = new ControlUI;
chrome.action.onClicked.addListener((currentTab)=>{

    

    const tab = {};
    tab.id = currentTab.id;
    if(!active) {
        tab.isInjected = true;
        active = true;
        UI.setTitle(UI.enableTitle);
        UI.sendMessage(currentTab.id,active);
    }
    else {
        tab.isInjected = false;
        active = false;
        UI.setTitle(UI.disableTitle);
        UI.sendMessage(currentTab.id,active);
    }

    tabs.forEach((value,index)=>{
        if(value.id===currentTab.id) {
            tabs.splice(index,1);
            return true;
        }
    })

    tabs.push(tab);
});
  

chrome.tabs.onActivated.addListener((newTab)=>{
    active = false;
    UI.setTitle(UI.disableTitle);
        
    tabs.forEach((value,index)=>{
        if(value.id===newTab.tabId && value.isInjected) {
            active = true;
            value.isInjected = true;
            UI.setTitle(UI.enableTitle);
            return true;
        }
    })
}) 

chrome.runtime.onMessage.addListener((response,sender)=>{

    if(response.refresh==="yes") {
        active = false;
        UI.setTitle(UI.disableTitle);
        tabs.forEach((value,index) =>{
            if(value.id===sender.tab.id) {
                tabs.splice(index,1);
                return true;
            }
        })
    }
})


chrome.tabs.onUpdated.addListener((currentTabId)=>{
        active = false;
        UI.setTitle(UI.disableTitle);
        tabs.forEach((value,index) =>{
            if(value.id===currentTabId) {
                tabs.splice(index,1);
                return true;
            }
        })
})