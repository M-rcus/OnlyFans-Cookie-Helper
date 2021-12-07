const ls = chrome.storage.local;

/**
 * Helper for storing the new bcTokens object
 */
function storeBcTokens(bcTokens)
{
    ls.set({'bcTokens': bcTokens});
}

/**
 * Retrieve the stored bcTokens object
 * If none, return a fresh object
 */
async function getStoredBcTokens()
{
    return new Promise((resolve, reject) => {
        ls.get(['bcTokens'], function(data) {
            if (!data.bcTokens) {
                storeBcTokens({});
                resolve({});
                return;
            }

            resolve(data.bcTokens);
        });
    });
}

async function handleBcToken(data)
{
    const { bcTokenSha, id } = data;

    const bcTokens = await getStoredBcTokens();
    bcTokens[id] = bcTokenSha;
    storeBcTokens(bcTokens);

    return true;
}

chrome.runtime.onMessage.addListener(handleBcToken);
