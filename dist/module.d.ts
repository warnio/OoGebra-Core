declare namespace OoGebra {
    function getMode(): "development" | "production";
    function log(message: string): void;
    function setInternal(name: string): void;
}
declare namespace OoGebra {
    namespace Internal {
        class Listeners {
            private static readonly listeners;
        }
    }
    function registerListener(name: string, fn: Function): string;
    function unregisterListener(name: string): void;
}
declare namespace OoGebra {
    function setData(key: string, data: any): void;
    function getData(key: string): any;
    function deleteData(key: string): void;
}
declare namespace OoGebra {
    function setImmutable(objName: string, immutable: boolean): void;
    function setIgnoreImmutables(ignore: boolean): void;
    function getIgnoreImmutables(): boolean;
}
declare namespace OoGebra {
    namespace Core {
        const version = "2.0";
        const name = "OoGebraCore";
        const geoName: string;
    }
}
declare namespace OoGebra {
}
declare const global: any;
