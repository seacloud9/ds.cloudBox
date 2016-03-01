import { SoundCloudAnalyzer } from "../../es6/soundcloud";
export class SoundCloudWrapper {
  constructor () {
    'ngInject';
    this._sc =  null;
  }
  getSc() {
    return this._sc;
  }
  setSc(value) {
    this._sc =  new _SC(value);
  }
}
