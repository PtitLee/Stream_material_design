var idChaineGamingLive = 'x1f124w';

angular.module('StreamView', ['ngMaterial'])
.controller('NavbarCtrl', function($scope, $mdDialog) {
  $scope.alert = '';

  $scope.showGamingLiveDialog = function(ev) {

    // searchLiveStream('dailymotion');

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
function DialogGamingLiveController($scope, $http, $mdDialog) {

  $scope.dialog_switchDailychannel = function(channel){
    $mdDialog.close();

    var chat_channel = '';

    $.getJSON('./js/matchDailyIrc.json', function(data) {

      chat_channel = data[channel];

    }).done(function() {
      

    $rootScope.video_url = $sce.trustAsResourceUrl("//games.dailymotion.com/embed/"+ channel +"?quality=720&autoplay=1");

    $rootScope.chat_url = $sce.trustAsResourceUrl('http://webirc.jeuxvideo.com/#'+chat_channel);

    });
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
