/**
 * Shamelessly copied from: https://techoverflow.net/2018/03/30/copying-strings-to-the-clipboard-using-pure-javascript/
 *
 * Only used as a fallback if for some reason the Clipboard API
 * does not exist... heh.
 */
async function copyStringToClipboard (str) {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
}

async function grabCookies() {
    /**
     * Grab the cookies from the browser...
     */
    const cookies = await browser.cookies.getAll({
        domain: '.onlyfans.com',
    });

    /**
     * We only care about `name` and `value` in each cookie entry.
     */
    const mappedCookies = {};
    for (const cookie of cookies)
    {
        mappedCookies[cookie.name] = cookie.value;
    }

    /**
     * Then we go through the relevant cookies for the OnlyFans Downloader
     */
    const relevantCookies = [
        'auth_hash',
        'auth_id',
        'auth_uniq_',
        'sess',
    ];

    /**
     * Define and check if `authId` exists
     * if not, return and call it a day...
     *
     * Also define the other elements.
     */
    const authId = mappedCookies.auth_id;
    const copyBtn = document.querySelector('#copy-to-clipboard');
    const jsonElement = document.querySelector('#json');

    /**
     * If authId isn't specified, user is not logged into
     * OnlyFans... or at least we assume so.
     */
    if (!authId) {
        jsonElement.setAttribute('style', 'color: red;');
        jsonElement.innerHTML = 'Could not find valid cookie values, make sure you are logged into OnlyFans.';
        copyBtn.remove();

        return;
    }

    /**
     * Actually extract the cookies we want/need.
     */
    const wantedCookies = {};
    for (const cookieName of relevantCookies)
    {
        let realCookieName = cookieName;

        /**
         * The 2FA cookie name is dynamic based on `auth_id`
         * so we need to handle it a bit differently.
         *
         * However, OnlyFans Downloader uses the normal `auth_uniq_` key in the
         * config file, so we still need to use it when setting _our_ key.
         */
        if (cookieName === 'auth_uniq_') {
            realCookieName = 'auth_uniq_' + authId;
        }

        const wantedCookie = mappedCookies[realCookieName];

        /**
         * Set cookie to empty string if it does not exist.
         */
        if (!wantedCookie) {
            wantedCookies[cookieName] = '';
            continue;
        }

        wantedCookies[cookieName] = wantedCookie;
    }

    /**
     * Finally we set some extra values that are technically non-cookies.
     */
    const config = {...wantedCookies};
    config.app_token = '33d57ade8c02dbc5a333db99ff9ae26a';
    config.user_agent = navigator.userAgent;
    config.support_2fa = true;
    config.username = 'u' + authId;
    // For the "profiles" feature added in v6.1
    config.active = true;

    /**
     * Then we print it to the popup :)
     * 
     * Third parameter to JSON.stringify() is for spacing the indentation.
     */
    const cookieJson = JSON.stringify(config, null, 2);
    jsonElement.innerHTML = cookieJson;

    /**
     * Use yee yee ghetto ass method as a fallback
     * method for copying to clipboard.
     */
    const clipboardWriteText = browser.clipboard.writeText || copyStringToClipboard;
    const oldBtnText = copyBtn.innerHTML;
    copyBtn.addEventListener('click', async () => {
        try {
            await clipboardWriteText(cookieJson);

            copyBtn.innerHTML = 'Copied to clipboard!';
            copyBtn.setAttribute('disabled', '1');
        }
        catch (err) {
            console.error(err);
        }

        setTimeout(() => {
            copyBtn.innerHTML = oldBtnText;
            copyBtn.removeAttribute('disabled');
        }, 2500);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await grabCookies();
});