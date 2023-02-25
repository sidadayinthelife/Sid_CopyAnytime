class PastePro {
    constructor(msg) {
        console.log(typeof msg,msg)
        if(msg) {

            this.contextMenuTrigger();
            this.copyTrigger();
            this.pasteTrigger();
            this.cutTrigger();
            this.selectJSTrigger();
            this.selectCSSTrigger();
        }
        else {
            this.contextMenuDefault();
            this.copyDefault();
            this.pasteDefault();
            this.cutDefault();
            this.selectJSDefault();
            this.selectCSSDefault();
        }
    }
    
    contextMenuTrigger() {
        document.addEventListener('contextmenu',this.contextMenu,true);
    }

    contextMenuDefault() {
        document.removeEventListener('contextmenu',this.contextMenu,true);
    }

    contextMenu(e) {
        e.stopImmediatePropagation();
    }

    pasteTrigger() {
        document.addEventListener('paste',this.paste,true);
    }

    pasteDefault() {
        document.removeEventListener('paste',this.paste,true);
    }

    paste(e) {
        e.stopImmediatePropagation();
    }

    copyTrigger() {
        document.addEventListener('copy',this.copy,true);
    }

    copyDefault() {
        document.removeEventListener('copy',this.copy,true);
    }

    copy(e) {
        e.stopImmediatePropagation();
    }

    cutTrigger() {
        document.addEventListener('cut',this.cut,true);
    }

    cutDefault() {
        document.removeEventListener('cut',this.cut,true);
    }

    cut(e) {
        e.stopImmediatePropagation();
    }

    selectJSTrigger() {
        document.addEventListener('selectstart',this.selectJS,true);
    }

    selectJSDefault() {
        document.removeEventListener('selectstart',this.selectJS,true);
    }

    selectJS(e) {
        e.stopImmediatePropagation();
    }

    selectCSSTrigger() {
        document.addEventListener('mousedown',this.selectCSS,true);
    }

    selectCSSDefault() {
        document.removeEventListener('mousedown',this.selectCSS,true);
    }

    selectCSS(e) {
        e.target.style.userSelect = "text";
    }

}

chrome.runtime.onMessage.addListener((response)=>{
        new PastePro(response.isEnabled);
})









