/*  https://gist.github.com/niyazpk/f8ac616f181f6042d1e0
    Handles hashtags.

    Only updates the URI (string update). Does not push the new URI in browser.
*/

export const updateUrlParameter = (uri, key, value) => {
    // remove the hash part before operating on the uri
    const i = uri.indexOf('#');
    const hash = i === -1 ? '' : uri.substr(i);
    uri = i === -1 ? uri : uri.substr(0, i);
  
    const re = new RegExp(`([?&])${key}=.*?(&|$)`, 'i');
    const separator = uri.indexOf('?') !== -1 ? '&' : '?';
  
    if (value === null) {
      // remove key-value pair if value is specifically null
      uri = uri.replace(new RegExp(`([?&]?)${key}=[^&]*`, 'i'), '');
      if (uri.slice(-1) === '?') {
        uri = uri.slice(0, -1);
      }
      // replace first occurrence of & by ? if no ? is present
      if (uri.indexOf('?') === -1) uri = uri.replace(/&/, '?');
    } else if (uri.match(re)) {
      uri = uri.replace(re, `$1${key}=${value}$2`);
    } else {
      uri = `${uri + separator + key}=${value}`;
    }
    return uri + hash;
  };

// Push the new URI without reload.
export const uriPusher = (url, paramToChange, valueOfNewParam, edit) => {

    let newUrl;

    if (window.history.pushState) {
        edit ? newUrl = url : newUrl = updateUrlParameter(url, paramToChange, valueOfNewParam)
        window.history.pushState({path:newUrl},'',newUrl);
    }
}