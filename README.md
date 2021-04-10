# OnlyFans Cookie Helper

An extension made to make it easier to copy the correct `config.json` values when using [DIGITALCRIMINAL/OnlyFans](https://github.com/DIGITALCRIMINAL/OnlyFans).

It's ugly and super simple.

**FYI**: As of v1.0.1 the `"fp": "xxxxxxxxxxxx"` value is no longer included, as it's no longer being used by the software.

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

**NOTE:** You do NOT need to create the `manifest.json` file yourself, that is already included in the repository.

These steps MAY work on Microsoft Edge (the new version), but no guarantees.

## How to use

Make sure you're logged into the OnlyFans website normally.

After installing the extension, click the cookie icon.  
A popup should show up (see [preview](#preview)) with a JSON-formatted text.  
There's a a "Copy to clipboard" button at the bottom of the popup that should copy the text to your clipboard.  
If it does not work, you can just copy the text manually by selecting it.

### Preview

**FYI**: This is an old screenshot, but the popup looks practically identical.
As of v1.0.1 the `"fp": "xxxxxxxxxxxx"` value is no longer included, as it's no longer being used by the software.

![Preview of extension](https://i.marcus.pw/ss/2020-09-03_m5qLXS.png)

## LICENSE

[MIT License](./LICENSE.md)