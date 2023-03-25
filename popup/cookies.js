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

const containerNames = {};
const containersEnabled = browser.contextualIdentities !== undefined;

/**
 * Get the correct bcToken from storage
 */
async function getBcTokenSha(id)
{
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(['bcTokens'], function(data) {
            const bcTokens = data.bcTokens || {};

            if (bcTokens[id]) {
                resolve(bcTokens[id]);
                return;
            }

            resolve(null);
        });
    });
}

async function getContainers()
{
    /**
     * Prefill popup with "no container" cookies
     */
    grabCookies();

    /**
     * Non-Firefox browser or containers not enabled.
     */
    if (!containersEnabled) {
        return;
    }

    /**
     * Containers are enabled, but none found.
     */
    let containers = await browser.contextualIdentities.query({});
    if (containers.length < 1) {
        return;
    }

    // Sort container list by name.
    containers.sort(function(a, b) {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (nameA < nameB) {
            return -1;
        }

        if (nameA > nameB) {
            return 1;
        }

        return 0;
    });

    const containerSection = document.querySelector('#container-list');
    containerSection.classList.remove('hidden');

    const optionList = containerSection.querySelector('select');

    for (const container of containers)
    {
        const storeId = container.cookieStoreId;
        const { name } = container;

        containerNames[storeId] = name;

        const option = document.createElement('option');
        option.setAttribute('value', storeId);
        option.textContent = name;

        optionList.insertAdjacentElement('beforeend', option);
    }

    optionList.addEventListener('change', function(event) {
        const storeId = event.target.value;

        if (!storeId || storeId.length < 1) {
            grabCookies(null);
            return;
        }

        grabCookies(storeId);
    });
}

async function grabCookies(cookieStoreId) {
    /**
     * Grab the cookies from the browser...
     */
    const cookieOpts = {
        domain: '.onlyfans.com',
    };

    /**
     * Container tabs
     */
    if (cookieStoreId) {
        cookieOpts.storeId = cookieStoreId;
    }

    const cookies = await browser.cookies.getAll(cookieOpts);

    /**
     * We only care about `name` and `value` in each cookie entry.
     */
    const mappedCookies = {};
    for (const cookie of cookies)
    {
        mappedCookies[cookie.name] = cookie.value;
    }

    /**
     * Define and check if `authId` exists
     * if not, return and call it a day...
     *
     * Also define the other elements.
     */
    const authId = mappedCookies.auth_id;
    const sess = mappedCookies.sess;
    const copyBtn = document.querySelector('#copy-to-clipboard');
    const jsonElement = document.querySelector('#json');
    const errorElement = document.querySelector('#errorMessage');

    /**
     * If authId isn't specified, user is not logged into
     * OnlyFans... or at least we assume so.
     */
    if (!authId || !sess) {
        let errorMessage = 'Could not find valid cookie values, make sure you are logged into OnlyFans.';
        if (containersEnabled) {
            const containerName = containerNames[cookieStoreId] || 'Default (no container)';
            errorMessage = `Could not find valid cookie values in container: <strong>${containerName}</strong><br>Make sure you are logged into OnlyFans.`;
        }

        errorElement.innerHTML = errorMessage;
        errorElement.classList.remove('hidden');

        if (!copyBtn.classList.contains('hidden')) {
            copyBtn.classList.add('hidden');
            jsonElement.classList.add('hidden');
        }

        return;
    }

    // See `background/background.js` as to why we use `st` here
    const st = mappedCookies.st;
    const bcToken = await getBcTokenSha(st);
    if (!bcToken) {
        let errorMessage = 'Could not find valid x_bc value. Please open OnlyFans.com once and make sure it fully loads. If you are not logged in, please log in and <i>refresh the page</i>.';
        if (containersEnabled) {
            const containerName = containerNames[cookieStoreId] || 'Default (no container)';
            errorMessage = `Could not find valid x_bc value. Please open OnlyFans.com once in container: <strong>${containerName}</strong><br>Make sure it fully loads. If you are not logged in, please log in and <i>refresh the page</i>.`;
        }

        errorElement.innerHTML = errorMessage;
        errorElement.classList.remove('hidden');

        if (!copyBtn.classList.contains('hidden')) {
            copyBtn.classList.add('hidden');
            jsonElement.classList.add('hidden');
        }

        return;
    }

    copyBtn.classList.remove('hidden');
    jsonElement.classList.remove('hidden');
    errorElement.classList.add('hidden');

    /**
     * Fill out the object that OnlyFans excepts
     */
    const config = {
        username: 'u' + authId,
        cookie: `auth_id=${authId}; sess=${sess}; auth_hash=; auth_uniq_${authId}=; auth_uid_${authId}=;`,
        // TODO: Still need to handle this better...
        user_agent: navigator.userAgent,
        x_bc: bcToken,
        support_2fa: true,
        active: true,
        email: "",
        password: "",
        hashed: false,
    };

    /**
     * Then we print it to the popup :)
     *
     * Third parameter to JSON.stringify() is for spacing the indentation.
     */
    const authConfig = {
        auth: config,
    };

    const cookieJson = JSON.stringify(authConfig, null, 2);
    jsonElement.textContent = cookieJson;

    /**
     * Use yee yee ghetto ass method as a fallback
     * method for copying to clipboard.
     */
    const clipboardWriteText = browser.clipboard.writeText || copyStringToClipboard;
    const oldBtnText = copyBtn.innerHTML;
    copyBtn.addEventListener('click', async () => {
        try {
            await clipboardWriteText(cookieJson);

            copyBtn.textContent = 'Copied to clipboard!';
            copyBtn.setAttribute('disabled', '1');
        }
        catch (err) {
            console.error(err);
        }

        setTimeout(() => {
            copyBtn.textContent = oldBtnText;
            copyBtn.removeAttribute('disabled');
        }, 2500);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await getContainers();
});
