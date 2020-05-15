
namespace OoGebra {
  log('OoGebra sucessfully loaded!')
}

declare const global: any;
if (!global.hasOwnProperty('OoGebra')) {
  Object.defineProperty(global, 'OoGebra', {
    value: OoGebra
  });
}
