
namespace Oogebra {

  const DOUBLE_QUOTE = String.fromCharCode(34);

  namespace Data {

    export const version = '1.0';

    export const name = `OogebraData_{${version}}`

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

    function ensureDataObject() {
      if (!ggbApplet.exists(name)) {
        let listElements = new Array(listLength);
        for (let i = 0; i < listElements.length; i++) {
            listElements[i] = DOUBLE_QUOTE + DOUBLE_QUOTE;
        }
        ggbApplet.evalCommand(`${name} = {${listElements.join(',')}}`);

        ignoreImmutables(true);
        setInternal(Data.name);
        ignoreImmutables(false);
        setImmutable(Data.name, true);
      }
    }

    function ensureCache() {
      if (cache.length === 0) {
        const tempObjName = ggbApplet.evalCommandGetLabels(DOUBLE_QUOTE+DOUBLE_QUOTE);
        for (let i = 0; i < listLength; i++) {
          const listIndex = i + 1;
          ggbApplet.evalCommand(`${tempObjName} = ${name}(${listIndex})`);
          const jsonString = ggbApplet.getValueString(tempObjName) + '';
          cache[i] = JSON.parse(dataUnescape(jsonString || 'null'));
        }
        ggbApplet.deleteObject(tempObjName);
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
      ensureDataObject();
      ensureCache();

      let hash = getHash(key);
      let hashLow = hash & (listLength - 1);
      let listIndex = hashLow + 1;

      cache[hashLow] = cache[hashLow] || {};
      if (data === undefined) {
        delete cache[hashLow]![key];
      } else {
        cache[hashLow]![key] = data;
      }

      const escapedData = dataEscape(JSON.stringify(cache[hashLow]));
      const command = `SetValue(${name}, ${listIndex}, ${DOUBLE_QUOTE+escapedData+DOUBLE_QUOTE})`;

      ignoreImmutables(true);
      ggbApplet.evalCommand(command);
      ignoreImmutables(false);

      return ;
    }

    export function get(key: string) {
      ensureDataObject();
      ensureCache();

      let hash = getHash(key);
      let hashLow = hash & (listLength - 1);

      let cacheMapping = cache[hashLow];
      if (cacheMapping == null) {
        return null
      }

      return cacheMapping[key];
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
