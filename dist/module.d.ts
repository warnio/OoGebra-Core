declare namespace Oogebra {
    function getMode(): "development" | "production";
    function log(message: string): void;
    function setInternal(name: string): void;
}
declare namespace Oogebra {
    namespace Internal {
        class Listeners {
            private static readonly listeners;
        }
    }
    function registerListener(name: string, fn: Function): string;
    function unregisterListener(name: string): void;
}
declare namespace Oogebra {
    function setData(key: string, data: any): void;
    function getData(key: string): any;
    function deleteData(key: string): void;
}
declare namespace Oogebra {
    function setImmutable(objName: string, immutable: boolean): void;
    function ignoreImmutables(ignore: boolean): void;
}
declare namespace Oogebra {
    namespace Core {
        const version = "1.0";
        const name: string;
    }
}
declare namespace Oogebra {
}
declare const global: any;
