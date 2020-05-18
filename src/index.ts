
namespace OoGebra { }

OoGebra.init();

declare const global: any;
if (!global.hasOwnProperty('OoGebra')) {
  Object.defineProperty(global, 'OoGebra', {
    value: OoGebra
  });
}
