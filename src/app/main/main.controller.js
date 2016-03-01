export class MainController {
  constructor ($timeout,  $q, $scope, $location, _soundCloud) {
    'ngInject';
    this.classAnimation = '';
    this.creationDate = 1454445734459;
    this._scope = $scope;
    this.loc = $location;
    if(_soundCloud.getSc() == null){
      _soundCloud.setSc({client_id:'b861cf4f67c435a1183dc13112b0f56f', promise:$q.defer, processing:null,  scope:$scope, tracksearchcallback:null});
      this._sc =  _soundCloud.getSc();
    }else{
      this._sc =  _soundCloud.getSc();
    }
    this._sc._currentTrack = null;
    this.activate($timeout);
  }

  activate($timeout) {
    this.reset();
    this._scope.submit = function($value) {
      this.loc.path('/home');
      this._scope.$broadcast('grabSound', $value);
    }.bind(this);
    
    this._scope.goVisualize = function ( obj ) {
        this._sc.setPlay(obj);
        this.loc.path('/play/' + obj.id + '/' + obj.permalink);
    }.bind(this);
    setTimeout(function(){this.triggerSearch()}.bind(this), 50);
    
  }

  reset(){
    this._sc.destroyScene();
  }


  triggerSearch(){
    if(this._sc._currentSeach != null){
      this.loc.path('/home');
      $('#tracksearchInput').val(this._sc._currentSeach)
      this._scope.$broadcast('grabSound', this._sc._currentSeach);
    }
  }

}
