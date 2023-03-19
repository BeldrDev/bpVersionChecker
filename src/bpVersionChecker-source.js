/**
 * ! bpVersionChecker 0.1
 * ! made by BeldrProductions
 * 
 * * THIS CODE IS PROTECTED BY THE GPLv3 License
 * * https://www.gnu.org/licenses/gpl-3.0.en.html
 * 
 * ? Website: https://beldrproductions.nl
 * ? More info about the library: https://github.com/beldrdev/bpVersionChecker
 * 
 *   Made with <3 by @beldrnl (@beldrdev @ github.com)
 * 
 *   You may not remove this notice
 */
const bpVersionChecker = {
    config: {
        serverUrl: '', 
        appVersion: ''
    },
    check: () => {
        fetch(bpVersionChecker.config.serverUrl, {
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.text())
            .then(text => {
                let serverVersion = JSON.parse(text);

                if (!sessionStorage.getItem('bpVersionChecker')) {
                    sessionStorage.setItem('bpVersionChecker', true);
                } else {
                    console.warn('bpVersionChecker -> Cancelled checking, Already checked this session. (' + bpVersionChecker.config.appVersion + '/' + serverVersion.version + ')')
                    return false;
                }

                if (serverVersion.version != bpVersionChecker.config.appVersion) {
                    console.error('bpVersionChecker -> Update available. (' + bpVersionChecker.config.appVersion + '/' + serverVersion.version + ')')
                    return 'updateAvailable';
                } else {
                    console.log('bpVersionChecker -> Application up-to-date. (' + bpVersionChecker.config.appVersion + '/' + serverVersion.version + ')');
                    return 'upToDate';
                }
            }).catch(error => {
                console.error('bpVersionChecker -> APPLICATION UPDATE CHECK ERROR: The server did not respond. ' + error + ' - Is the server down?');
                return false;
            })
    }
}