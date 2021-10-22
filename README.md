# OnlyFans Cookie Helper

An extension made to make it easier to copy the correct `config.json` values when using [DIGITALCRIMINAL/OnlyFans](https://github.com/DIGITALCRIMINAL/OnlyFans).

It's ugly and super simple.

## How to install

For now you have to download the repository and load it manually.  
Eventually I may upload it to the Firefox / Chrome extension stores, but for now this is what you can do to use the extension...

### Firefox

#### Option 1:
Go to [Releases](https://github.com/M-rcus/OnlyFans-Cookie-Helper/releases), download the `.xpi` file and install it by typing `about:addons` into your URL bar, pressing `CTRL+Shift+A` or clicking the "hamburger menu" top-right of the Firefox window and then "Addons".

![Screenshot on how to do Firefox install option 1](https://i.marcus.pw/ss/2021-04-10_vOzkx1.png)

#### Option 2:
Follow the [Trying it out](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#Trying_it_out) steps on their developer website.

### Chrome / Brave

Follow the steps on [Chrome's "Getting Started" tutorial](https://developer.chrome.com/extensions/getstarted#manifest) for extensions.

**NOTES:**
- You do NOT need to create the `manifest.json` file yourself, that is already included in the repository.
- The extension may say it contains errors and then highlight a permission called "contextualIdentities": ![](https://i.marcus.pw/ss/2021-10-22_qxfIFE.png)
    - It's safe to ignore, as it's a permission meant for Firefox users, but does not affect Chrome / Brave.

These steps MAY work on Microsoft Edge (the new version), but no guarantees.

## How to use

Make sure you're logged into the OnlyFans website normally.

After installing the extension, click the cookie icon.  
A popup should show up (see [preview](#preview)) with a JSON-formatted text.  
There's a a "Copy to clipboard" button at the bottom of the popup that should copy the text to your clipboard.  
If it does not work, you can just copy the text manually by selecting it.

Once you've copied the text to clipboard, you can paste it into the `auth.json` file in your profiles folder.  
The default `auth.json` file should be located in `<OnlyFans-Software-Folder>/.profiles/OnlyFans/default/auth.json`, but may not show up until you've started up the OnlyFans software at least once.

You can also create a new folder and a separate `auth.json` file, which is useful if you have multiple accounts.  
For example:
- `<OnlyFans-Software-Folder>/.profiles/OnlyFans/my-personal-account/auth.json`
- `<OnlyFans-Software-Folder>/.profiles/OnlyFans/my-secret-account/auth.json`

### Preview

Screenshot as of extension version v1.0.3.  
A few things to note:
- `auth_hash`, `auth_uniq_`, `email` and `password` are _typically empty_. Don't panic if they don't have any values, as it's completely normal.
- The `username` field is by default set to "u" plus the same number as `auth_id`. It _does not_ need to be your actual OnlyFans username.

![Preview of extension](https://i.marcus.pw/ss/2021-05-20_5hI4rK.png)

## LICENSE

[MIT License](./LICENSE.md)

## Mirrors

This project is currently mirrored to three different providers:

- [GitHub](https://github.com/M-rcus/OnlyFans-Cookie-Helper)
- [GitLab](https://gitlab.com/Maarcus/OnlyFans-Cookie-Helper)
- [GitGud.io](https://gitgud.io/Maarcus/OnlyFans-Cookie-Helper)

Those are the only 'official' sources for this extension.  
Anyone else can of course freely mirror the project as they see fit.

## Sellout (Tips)
If you find the extension useful and would like to send me a tip, then I'll gladly take some crypto <3

- Bitcoin: `bc1qps35rpadgmpf2a7vmuq45xnt7qscymtlnny6mx`
- Dogecoin: `DAjtoHdXFFhRc3qJq8sqCWpQLLDB8t3L6n`
- Litecoin: `LbX5iqVfYoRz7kPAPQoEKdqiN7Y9PRxsAg`
