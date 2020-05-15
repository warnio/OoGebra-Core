
namespace OoGebra {

  const DOUBLE_QUOTE = String.fromCharCode(34);

  namespace Data {

    export const version = '2.0';

    export const name = `OoGebraData`

    function getElemGeoName(index: number) {
      return `${name}_{${version}_[${index}]}`;
    }

    const dataEscapeRegex = new RegExp('&|'+DOUBLE_QUOTE, 'g');

    const dataEscapeReplacer = (match: string) => {
      switch (match) {
        case DOUBLE_QUOTE: return '&q';
        default: return '&a';
      }
    }

    const dataUnescapeRegex = new RegExp('&q|&a', 'g');

    const dataUnescapeReplacer = (match: string) => {
      switch (match) {
        case '&q': return DOUBLE_QUOTE;
        default: return '&';
      }
    }

    function dataEscape (string: string) {
      return string.replace(dataEscapeRegex, dataEscapeReplacer);
    }

    function dataUnescape (string: string) {
      return string.replace(dataUnescapeRegex, dataUnescapeReplacer);
    }

    const indexBits = 8;

    const listLength = Math.pow(2, indexBits);

    const cache: ({ [key: string]: any } | null)[] = [];

    function ensureDataObject(elemGeoName: string) {
      if (!ggbApplet.exists(elemGeoName)) {
        const elemGeoValue = DOUBLE_QUOTE + DOUBLE_QUOTE;

        ggbApplet.evalCommand(`${elemGeoName} = ${elemGeoValue}`);
        setInternal(elemGeoName);
        setImmutable(elemGeoName, true);
      }
    }

    function ensureCache() {
      for (let i = 0; i < listLength; i++) {
        if (cache[i] == null) {
          const elemGeoName = getElemGeoName(i);
          if (ggbApplet.exists(elemGeoName)) {
            const unescapedJsonString = ggbApplet.getValueString(elemGeoName) + '';
            if (unescapedJsonString) {
              cache[i] = JSON.parse(dataUnescape(unescapedJsonString));
            } else {
              cache[i] = {};
            }
          }
        }
      }
    }

    function getHash(str: string) {
      let hash = 0, i: number, chr: number;
      for (i = 0; i < str.length; i++) {
        chr   = str.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
    }

    export function set(key: string, data: any) {
      const prevIgnoreImm = getIgnoreImmutables();
      setIgnoreImmutables(true);

      const hash = getHash(key);
      const index = hash & (listLength - 1);
      const elemGeoName = getElemGeoName(index);

      ensureDataObject(elemGeoName);
      ensureCache();

      if (data === undefined) {
        delete cache[index]![key];
      } else {
        cache[index]![key] = data;
      }

      if (Object.keys(cache[index]!).length == 0) {
        ggbApplet.deleteObject(elemGeoName);
        setImmutable(elemGeoName, false);
      } else {
        const escapedData = dataEscape(JSON.stringify(cache[index]));
        const command = `${elemGeoName} = ${DOUBLE_QUOTE+escapedData+DOUBLE_QUOTE}`;
        ggbApplet.evalCommand(command);
      }

      setIgnoreImmutables(prevIgnoreImm);
    }

    export function get(key: string) {
      const hash = getHash(key);
      const index = hash & (listLength - 1);
      const elemGeoName = getElemGeoName(index);

      ensureDataObject(elemGeoName);
      ensureCache();

      return cache[index]![key];
    }

  }

  export function setData(key: string, data: any) {
    return Data.set(key, data);
  }

  export function getData(key: string) {
    return Data.get(key);
  }

  export function deleteData(key: string) {
    return Data.set(key, undefined);
  }

}
