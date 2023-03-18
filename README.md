# OnlyFans Cookie Helper

An extension made to make it easier to copy the correct `config.json` values when using [DIGITALCRIMINALS/OnlyFans](https://github.com/DIGITALCRIMINALS/OnlyFans).

It's ugly and super simple.

## How to install

Extension isn't available on extension stores for now, so you can't install this extension like most normal ones.  
One of these days I might explore putting them on the extension stores, but no guarantees.

### Firefox

#### Option 1

Go to [Releases](https://github.com/M-rcus/OnlyFans-Cookie-Helper/releases), download the `.xpi` file and install it by typing `about:addons` into your URL bar, pressing `CTRL+Shift+A` or clicking the "hamburger menu" top-right of the Firefox window and then "Addons".

![Screenshot on how to do Firefox install option 1](https://i.marcus.pw/ss/2021-04-10_vOzkx1.png)

#### Option 2

Follow the [Trying it out](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#Trying_it_out) steps on their developer website.

### Chrome / Chromium

These steps MAY work on other Chromium-based browsers, such as: Brave, Microsoft Edge, Vivaldi and Opera (to name a few).  
No guarantees though, I only do simple tests on a basic Chromium install, as my primary browser is Firefox.

#### Option 1

This option is only available as of v2.2.0. This is **VERY unofficial way** of installing the extension and you might a few warnings about it being unsafe (which is _generally_ true).  
<ins>If you are not comfortable with that, you can either choose to use Firefox instead or try option 2 below.</ins>

1. Go to [Releases](https://github.com/M-rcus/OnlyFans-Cookie-Helper/releases) and click the `.crx` file. Your browser might prompt you to install the extension. You can then just click 'Add extension'.

If it _does not_ prompt you to install the extension, you can try the following:

1. Right-click on the `.crx` download link and click "Save link as..."
    - As I mentioned, it will likely ask you (sometimes multiple times) if you want to keep the file as it can be malicious. You want to keep the file.
2. In your Chromium-browser, go to your URL bar and hit enter after typing in `chrome://extensions`
3. Find the `.crx` file that you just downloaded.
4. Click and drag the `.crx` file into your Chromium browser window, where `chrome://extensions` is open.
5. It should prompt you to add the extension.

#### Option 2

1. Download the ZIP file of the version - `Source code (.zip)`
2. Extract the ZIP into a folder.
3. In your Chromium-browser, go to your URL bar and hit enter after typing in `chrome://extensions`
4. Click on "Load unpacked". **Select** the extracted folder and click "Open".

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

Screenshot as of extension version v1.0.3, which means it's slightly outdated.  
A few things to note:
- `auth_hash`, `auth_uniq_`, `email` and `password` are _typically empty_. Don't panic if they don't have any values, as it's completely normal.
- The `username` field is by default set to "u" plus the same number as `auth_id`. It _does not_ need to be your actual OnlyFans username.

![Preview of extension](https://i.marcus.pw/ss/2021-05-20_5hI4rK.png)

## Permissions

Overview of permissions and why they're required.

- `cookies`
    - Values such as `auth_id` and `sess` are contained within cookies.
    - Keep in mind that the `cookies` permission only applies for `onlyfans.com` and no other websites.
- `clipboardWrite`
    - To copy the `auth.json` values into your clipboard
- `storage`
    - This is specifically just to "synchronize" the `x_bc` value to the popup (so it can be copied).
    - `x_bc` isn't available via the regular `cookies` permission, so we need a workaround (which utilizes the `storage` permission).
- `contextualIdentities`
    - On Firefox, it's used to support multi-account containers.
    - ~~On Chromium-based browsers (Google Chrome, Brave, Microsoft Edge, Vivaldi, Opera etc.) it does nothing. However, it may give a warning. The extension should still work even with this warning.~~ - This should no longer happen as of v2.2.0.

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
