
namespace OoGebra {

  namespace Data {

    export const version = '3.0';

    export const name = `OoGebraData`

    const dataObjNameRegex = /^OoGebraData_\{3\.0_\[([^}]*)]}$/

    function isData(objName: string) {
      return dataObjNameRegex.test(objName);
    }

    function getDataKey(objName: string) {
      const match = dataObjNameRegex.exec(objName);
      if (match == null) return null;
      return keyUnescape(match[1]);
    }

    function getKeyObjName(key: string) {
      const escapedKey = keyEscape(key);
      return `${name}_{${version}_[${escapedKey}]}`;
    }

    const keyEscapeRegex = /&|}/g

    const keyEscapeReplacer = (match: string) => {
      switch (match) {
        case '}': return '&c';
        default: return '&a';
      }
    }

    const keyUnescapeRegex = /&c|&a/g

    const keyUnescapeReplacer = (match: string) => {
      switch (match) {
        case '&c': return '}';
        default: return '&';
      }
    }

    const dataEscapeRegex = /&|"/g

    const dataEscapeReplacer = (match: string) => {
      switch (match) {
        case '"': return '&q';
        default: return '&a';
      }
    }

    const dataUnescapeRegex = /&q|&a/g

    const dataUnescapeReplacer = (match: string) => {
      switch (match) {
        case '&q': return '"';
        default: return '&';
      }
    }

    function keyEscape (string: string) {
      return string.replace(keyEscapeRegex, keyEscapeReplacer);
    }

    function keyUnescape (string: string) {
      return string.replace(keyUnescapeRegex, keyUnescapeReplacer);
    }

    function dataEscape (string: string) {
      return string.replace(dataEscapeRegex, dataEscapeReplacer);
    }

    function dataUnescape (string: string) {
      return string.replace(dataUnescapeRegex, dataUnescapeReplacer);
    }

    let cache: { [key: string]: any } | null = null;

    function ensureCache() {
      if (cache == null) {
        cache = {};
        const objNames = ggbApplet.getAllObjectNames();
        for (const objName of objNames) {
          if (isData(objName+'')) {
            const key = getDataKey(objName+'')!;
            const data = JSON.parse(dataUnescape(ggbApplet.getValueString(objName+'')+''));
            cache![key] = data;
          }
        }
      }
    }

    export function set(key: string, data: any) {
      const prevIgnoreImm = getIgnoreImmutables();
      setIgnoreImmutables(true);

      ensureCache();
      cache![key] = data;

      const objName = getKeyObjName(key);
      const escapedData = dataEscape(JSON.stringify(data));
      const objDidNotExist = !ggbApplet.exists(objName);
      const command = `${objName} = "${escapedData}"`;
      ggbApplet.evalCommand(command);

      if (objDidNotExist) {
        setStyle(objName, Style.internal);
        setImmutable(objName, true);
      }

      setIgnoreImmutables(prevIgnoreImm);
    }

    export function get(key: string) {
      ensureCache();
      return cache![key];
    }

    export function del(key: string) {
      const prevIgnoreImm = getIgnoreImmutables();
      setIgnoreImmutables(true);

      ensureCache();
      delete cache![key];

      const objName = getKeyObjName(key);
      ggbApplet.deleteObject(objName);

      setIgnoreImmutables(prevIgnoreImm);
    }

  }

  export function setData(key: string, data: any) {
    return Data.set(key, data);
  }

  export function getData(key: string) {
    return Data.get(key);
  }

  export function deleteData(key: string) {
    return Data.del(key);
  }

}
