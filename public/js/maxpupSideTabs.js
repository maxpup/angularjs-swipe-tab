angular.module('maxpupSideTabs',[])
.directive('maxpupSideTabs', function($timeout) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    controller: ['$scope', function MyTabsController($scope) {
      var panes = $scope.panes = [];
      $scope.swipeLeft = false;
      $scope.$watch('swipeLeft',function(newValue, oldValue){
        console.log("滑动"+ newValue);
        var next = 0;
        angular.forEach(panes, function(pane,index){
          if(pane.selected == true && index < panes.length-1){
            pane.selected = false;
            panes[index+1].selected = true;
            window.document.body.bgColor = panes[index+1].background;
            return;
          }
        });
      });
      $scope.swipeRight = false;
      $scope.$watch('swipeRight',function(newValue, oldValue){
        console.log("滑动"+ newValue);
        var next = 0;
        angular.forEach(panes, function(pane,index){
          if(pane.selected == true && index > 0){
            pane.selected = false;
            panes[index-1].selected = true;
            window.document.body.bgColor = panes[index-1].background;
            return;
          }
        });
      });
      $scope.select = function(pane) {
        angular.forEach(panes, function(pane) {
          pane.selected = false;
        });
        window.document.body.bgColor = pane.background;
        pane.selected = true;
      };

      this.addPane = function(pane) {
        if (panes.length === 0) {
          $scope.select(pane);
        }
        panes.push(pane);
      };
    }],
    template: '<div class="maxpup-tabs swipe" id="slider">'+
    '<ul class="nav" style="margin:0;-webkit-padding-start:0px">'+
    '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}" ng-style="pane.style1">'+
    '<div  ng-click="select(pane)" ng-style="pane.style2">{{pane.title}}'+'</div>'+'</li>'+
    '</ul>'+
    '<div class="bod swiper-wrapper" ng-transclude ng-swipe-left="swipeLeft=!swipeLeft" ng-swipe-right="swipeRight = !swipeRight"></div>'+'</div>',
    link: function(scope,element,attr){
      // $timeout(function () {
      //   window.mySwiper = new Swiper(document.getElementById('slider'),{
      //     startSlider:0,
      //     speed:400,
      //     auto:false,
      //     continuous:true,
      //     disableScroll:false,
      //     stopPropagation:false,
      //     callback:function(index, elem){
      //       // scope.safeApply(function(){
      //       //    scope.executeCallback();
      //       // });
      //     },
      //     transitionEnd: function(index, elem){}
      //   });
      // }, 0);
    }
  };
})
.directive('maxpupSidePane', function() {
  return {
    require: '^^maxpupSideTabs',
    restrict: 'AE',
    transclude: true,
    scope: {
      title: '@',
      background: '@',
      paneView: '@'
    },
    link: function(scope, element, attrs, tabsCtrl) {
      scope.style1 = {
        'background-color':scope.background,
        'display':'inline-block',
        'width': '30%',
        'height': '100px',
        'position':'relative',
        'z-index':2000,
        'margin-top': '0%',
        'padding': '0',
        'list-style': 'none',
        'text-align': 'center',
      };
      scope.style2 = {
        'width': '100%',
        'height': '100%',
        'color':'#fff',
        'font-size':'3em'
      }
      element[0].childNodes[0].className += " swiper-slide";
      tabsCtrl.addPane(scope);
    },
    templateUrl: function(elem, attr) {
      return attr.url;
    }
  };
})
