
import { BabylonHxJS } from "../components/babylon/BabylonHxJS";

class SoundCloudAnalyzer {
	constructor(options = {/*sc: SC,*/ client_id: 'b861cf4f67c435a1183dc13112b0f56f', promise: $q.defer, processing:processing, scopet: $scope, tracksearchcallback:null}) {
		this._deferred = options.promise;
		this._processing = options.processing;
		this._ci = options.client_id;
		this._scope = options.scope;
		this._scope.tracks = [];
	  	this._defaultSelections = ["massive attack", "beastie boys", "thievery corporation", "david bowie", "velvet underground"];
	  	this._trackSearchCallback = options.tracksearchcallback;
	  	this.getDefaultTrack();
	  	this._currentArtist = null;
	  	this._BabylonSound = _BabylonSound;
	  	this._yDiff = 240;
	  	this._zDiff = 30;
	  	this._currentTrack = null;
	  	this._soundPlaing = null;
	  	this._currentSeach = null;
	  	this._defaultZoom = 5;
  }

  getCurrentArtist(){
  	return this._currentArtist;
  }

  getRandomArr(arr) {
  	return Math.floor(Math.random() * arr.length)
  }

  initScene(){

  }

  destroyScene(){
  	this._currentTrack = null;
  	$('canvas').remove();
    if(this._soundPlaing != null){
      this._BabylonSound._milkDrop.stopPlaying();
      this._soundPlaing.stop();
      this._soundPlaing = null;
    }
    this._BabylonSound = null;
    $('.soundscape').fadeIn('fast');
  }

  initSoundCloud(){
  	window.SC.initialize({
  		client_id: this._ci
  	});
  }

  initDom(){
  	TweenLite.set(jQuery('body'), {css:{transformPerspective:400, perspective:400, transformStyle:"preserve-3d"}});
  	jQuery(window).on('mousewheel',  function(event) {
           event.preventDefault();
           event.stopPropagation();
           if (!$(this).data('flag'))
		    {
		        var self = this;
		        $(this).data('timeout', window.setTimeout(function()
		        {
		           $(self).data('flag', false);
		        }, 800));
		        $(this).data('flag', true);
		        this.zoomPlane(event.deltaY);
		    }
        }.bind(this));

  	$( window ).keypress(function(e){
  		if(e.charCode == 119){
  				this.zoomPlane(this._defaultZoom++ * 5);
  		}
  		if(e.charCode == 115){
  				this.zoomPlane(this._defaultZoom-- * 5);
  		}	
  	}.bind(this));
  }


  zoomPlane(zoom){
  	for(var si=0; si < jQuery('.soundBlock').length; si++){
	           		var currentElement = jQuery('.soundBlock')[si];
	           			TweenLite.to(currentElement, 1, {transform: 'translateZ('+ (parseInt(jQuery(currentElement).attr('data-z')) +  (zoom * 20)) + 'px)' }).eventCallback("onComplete", function(){ currentElement.isMoving = false }, [currentElement]);
            	}
  }

  debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
  }


  getDefaultTrack(){
  	this.initDom();
  	var _artist  = this.getRandomArr(this._defaultSelections); 
  	this._currentArtist = this._defaultSelections[_artist];
  	this.getTracks( this._currentArtist );
  }

  getTracks( _q = "st. vincent" ){
  	this.initSoundCloud();
  	window.SC.get('/tracks', { q: _q }, function(tracks) {
  		this._currentSeach = _q;
  		this._scope.$apply(function(){
  			this.resolveTrackPromise( tracks);
  			this._scope.tracks = tracks.concat(this._scope.tracks);

  			setTimeout(this.buildPlanes, 5)
  			if(this._trackSearchCallback != null){
  				this._trackSearchCallback();
  			} 
  		}.bind(this));
   }.bind(this));
  }

  resolveTrackPromise(tracks){
  	this._deferred().resolve(tracks);
  	return this._deferred().promise;
  }

  setPlay(obj){
  	this._currentTrack = obj;
  }

  goVisualize(id){
  	console.log('track id ' + id);
  }

  streamTrack(){
  	if(this._currentTrack != null){
  		window.SC.stream("/tracks/"+this._currentTrack.id, function(sound){
  		   this._soundPlaing = sound;
           this._BabylonSound = new _BabylonSound(sound.url);
           $('.soundscape').fadeOut('fast');
   		 }.bind(this));
  	}  	
  }

  buildPlanes(){
  	for(var i=0; i < jQuery('.soundBlock').length; i++){
          var element = jQuery('.soundBlock')[i];
          var _tY = 20;
          var _tZ =  (-70 + -(i * 200));
          $(element).css('transform', 'translateY('+ _tY +'px) translateZ('+_tZ +'px)');
          $(element).attr('data-z', _tZ);
          $(element).attr('data-y', _tY);
       	  $(element).fadeIn('fast');
       }
  }

  render(){

  }

  postprocess(){

  }

  resize(){

  }

  wrapTexture(){

  }

  analyzeTrack(){

  }

  visualizeTrack(){

  }


}

module.exports = SoundCloudAnalyzer;
window._SC = SoundCloudAnalyzer;