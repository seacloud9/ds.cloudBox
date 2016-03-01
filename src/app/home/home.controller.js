export class HomeController {
  
  constructor ($timeout, webDevTec, toastr, $q, $scope, _soundCloud) {
    'ngInject';
    this._scope = $scope;
    this._deferred = $q.defer;
    this._sc = _soundCloud.getSc();

    this._scope.$on('grabSound', function($value) {
        this._sc._scope = this._scope;
        if ($value.targetScope.tracksearch || $('#tracksearchInput').val() != '') {
          if($value.targetScope.tracksearch){
            this._scope.tracksearch = $value.targetScope.tracksearch;
          }else{
            this._scope.tracksearch = $('#tracksearchInput').val();
          }
          this._sc.getTracks(this._scope.tracksearch);
        }
    }.bind(this));
  }
}
