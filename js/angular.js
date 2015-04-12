var idChaineGamingLive = 'x1f124w';

var StreamView = angular.module('StreamView', ['ngMaterial', 'mc.resizer']);

StreamView.controller('ContentCtrl', function ($scope, $rootScope, $sce) {

  //valeur par défaut
  $rootScope.video_url = $sce.trustAsResourceUrl("//games.dailymotion.com/embed/x1uf230?quality=720&autoplay=1");
  $rootScope.chat_url = $sce.trustAsResourceUrl('http://webirc.jeuxvideo.com/#GamingLivetv1');


  $rootScope.switch_stream = function(stream_name){
    $rootScope.video_url = $sce.trustAsResourceUrl('http://www.twitch.tv/' + stream_name + '/embed');
    $rootScope.chat_url = $sce.trustAsResourceUrl('http://www.twitch.tv/' + stream_name + '/chat?popout=');
  };


});

StreamView.controller('NavbarCtrl', function($scope, $compile, $mdDialog) {
  $scope.alert = '';

  $scope.showGamingLiveDialog = function(ev) {

    $mdDialog.show({
      controller: DialogGamingLiveController,
      templateUrl: 'parts/dialog_gaminglive.html',
      targetEvent: ev,
      locals: {
          chaines: $scope.chaines,
      },
    });

  };
});


function DialogGamingLiveController($scope, $http, $compile, $rootScope, $sce, $mdDialog) {

  $scope.dialog_switchDailychannel = function(channel){

    var chat_channel = '';

    $.getJSON('./js/matchDailyIrc.json', function(data) {

      chat_channel = data[channel];

    }).done(function() {
      

      $rootScope.video_url = $sce.trustAsResourceUrl("//games.dailymotion.com/embed/"+ channel +"?quality=720&autoplay=1");

      $rootScope.chat_url = $sce.trustAsResourceUrl('http://webirc.jeuxvideo.com/#'+chat_channel);

      //avoid iframe reload forbid

      var template = '<iframe id="iframe_chat" ng-src="{{chat_url}}" frameborder="0" scrolling="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
      var linkFn = $compile(template);
      var content = linkFn($rootScope);
      $('.container-fluid.embed-chat').html(content);

    });

    $mdDialog.hide();
  };

  // Loads some data into the dialog scope
  $http.get('https://api.dailymotion.com/user/'+ idChaineGamingLive +'/videos?fields=audience,id,mode,onair,title,&private=0&sort=live-audience&limit=100')
    .success(function(data, status) {
      
      var tabOnAirChannel = [];

      for (var i = 0; i < data.list.length; i++) 
      {
        if(data.list[i].onair == true)
        {

          tabOnAirChannel.push(data.list[i]);

        }

      }

      $scope.items = tabOnAirChannel;
        
  });

}
