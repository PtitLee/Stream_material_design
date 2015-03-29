angular.module('MultiStream', ['ngMaterial'])
.controller('NavbarCtrl', function($scope, $mdDialog) {
  $scope.alert = '';

  $scope.showGamingLiveDialog = function(ev) {
    $mdDialog.show({
      controller: DialogGamingLiveController,
      templateUrl: 'parts/dialog_gaminglive.html',
      targetEvent: ev,
      locals: {
          chaines: $scope.chaines,
      },
      onComplete: afterShowAnimation,
    });


    function afterShowAnimation(scope, element, options) {
       $scope.chaines = searchLiveStream('dailymotion');
    }

  };
});
function DialogGamingLiveController($scope, $mdDialog) {

  $scope.modal_switchStream = function(){
    $mdDialog.close($('input[name=nom_chaine]:checked').val());
  };

}




function searchLiveStream(TypeOfStream, userName)
{
  var tabActiveChannel = [];

  /*************************************************/
  /******** Intéraction avec Dailymotion ***********/
  /*************************************************/
  if (TypeOfStream == "dailymotion")
  {

    $.getJSON('https://api.dailymotion.com/user/'+ idChaineGamingLive +'/videos?fields=audience,id,mode,onair,title,&private=0&sort=live-audience&limit=100', function(data) {

      for (var i = 0; i < data.list.length; i++) 
      {
        if(data.list[i].onair == true)
        {

          tabActiveChannel.push( data.list[i] );

        }

      }

    }).done(function() {

      return tabActiveChannel;

    });
  }


}