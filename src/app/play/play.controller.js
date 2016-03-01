export class PlayController {
  constructor ($timeout, $q, $scope, $location, _soundCloud) {
    'ngInject';
    this.classAnimation = '';
    this.creationDate = 1454445734459;
    this._scope = $scope;
    this.loc = $location;
    this._sc =  _soundCloud.getSc();
    this.activate($timeout);
    console.log(this);
  }

  activate($timeout) {
    console.log(this._sc );
    this._sc.streamTrack();
    this._scope.submit = function($value) {
      this._sc._currentSeach = $value;
      this.loc.path('/home');
      this._scope.$broadcast('grabSound', $value);
    }.bind(this);

    //this._sc.goVisualize(id);
  }


}
