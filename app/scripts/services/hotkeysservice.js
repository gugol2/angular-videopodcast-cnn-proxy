(function () {

  'use strict';

  /**
   * @ngdoc service
   * @name angularVideopodcastCnnApp.hotkeysService
   * @description
   * # hotkeysService
   * Factory in the angularVideopodcastCnnApp.
   */
   var app=angular.module('angularVideopodcastCnnApp');

   app.factory('hotkeysService', ['hotkeys', 'setFocus', hotkeysService]);


   function hotkeysService(hotkeys, setFocus) {
    // Service logic

    var serviceHotkeys = {
      deleteHotkeys:deleteHotkeys,
      bindFeedSelectorHotkeys:bindFeedSelectorHotkeys,
      bindInputsearchboxHotkeys:bindInputsearchboxHotkeys,
      bindClipListHotkeys:bindClipListHotkeys,
      bindVideoAreaHotkeys: bindVideoAreaHotkeys
    };

      function deleteHotkeys() {
        hotkeys.del('left');
        hotkeys.del('right');
        hotkeys.del('up');
        hotkeys.del('down');
        hotkeys.del('enter');
      }


      function bindFeedSelectorHotkeys(vm) {
        // it will automatically unbind the hotkey when the scope is destroyed
        hotkeys.bindTo(vm).add({
          combo: 'up',
          description: 'Move up along the feed sources',
          callback: function() {
            //defined by default;
          }
        });

        hotkeys.bindTo(vm).add({
          combo: 'down',
          description: 'Move down along the feed sources',
          callback: function() {
            //defined by default;
          }
        });

        hotkeys.bindTo(vm).add({
          combo: 'enter',
          description: 'Select a feed source',
          callback: function() {
            //defined by default;
          }
        });
      }


      function bindInputsearchboxHotkeys(vm) {
        hotkeys.bindTo(vm).add({
          combo: 'up',
          description: 'Move up to the feed selector',
          callback: function() {
            //defined in cliplist controller;
          }
        });

        hotkeys.bindTo(vm).add({
          combo: 'down',
          description: 'Move down to the cliplist',
          callback: function() {
            //defined in cliplist controller;
          }
        });
      }


    function bindClipListHotkeys(vm) {
      var inputSearchBox;
      var elementList;
      var videoClip;

      hotkeys.bindTo(vm).add({
        combo: 'left',
        description: 'Go to search box',
        callback: function(event) {
          event.stopPropagation();
          inputSearchBox = angular.element('#input--search--box');
          setFocus.set(inputSearchBox);
          deleteHotkeys();
          bindInputsearchboxHotkeys(vm);
        }
      });

      hotkeys.bindTo(vm).add({
        combo: 'up',
        description: 'Go to previous clip',
        callback: function(event) {
          event.stopPropagation();
          elementList = angular.element('#clip--list--strict ul a:focus');
          setFocus.set(elementList.prev());
        }
      });

      hotkeys.bindTo(vm).add({
        combo: 'down',
        description: 'Go to next clip',
        callback: function(event) {
          event.stopPropagation();
          elementList = angular.element('#clip--list--strict ul a:focus');
          setFocus.set(elementList.next());
        }
      });

      hotkeys.bindTo(vm).add({
        combo: 'enter',
        description: 'Play selected clip',
        callback: function(event) {
          event.stopPropagation();
          //defined by default;
        }
      });

      hotkeys.bindTo(vm).add({
        combo: 'right',
        description: 'Go to video area',
        callback: function(event) {
          event.stopPropagation();

          videoClip = angular.element('#clip--video');

          if(videoClip.length){
            setFocus.set(videoClip);
            deleteHotkeys();
            bindVideoAreaHotkeys(vm);
          }
          
        }
      });
    }


    function bindVideoAreaHotkeys(vm) {
      var videoClipControls;
      var clipElementActive;

      hotkeys.bindTo(vm).add({
        combo: 'left',
        description: 'Go to selected clip',
        callback: function(event) {
          event.preventDefault();
          clipElementActive=angular.element('#clip--list--strict ul a.active');
          setFocus.set(clipElementActive);
          deleteHotkeys();
          bindClipListHotkeys(vm);
        }
      });

      hotkeys.bindTo(vm).add({
        combo: 'right',
        callback: function(event) {
          //Prevent default (for firefox) 
          event.preventDefault();
        }
      });

      hotkeys.bindTo(vm).add({
        combo: 'up',
        description: 'raise volume',
        callback: function(event) {
          event.preventDefault();
          videoClipControls = (angular.element(event.target))[0];
          if(videoClipControls.volume<1){
            videoClipControls.volume=(videoClipControls.volume+0.2).toFixed(1);
          }
        }
      });

      hotkeys.bindTo(vm).add({
        combo: 'down',
        description: 'lower volume',
        callback: function(event) {
          event.preventDefault();
          videoClipControls = (angular.element(event.target))[0];
          if(videoClipControls.volume>0){
            videoClipControls.volume=(videoClipControls.volume-0.2).toFixed(1);
          }
        }
      });

      hotkeys.bindTo(vm).add({
        combo: 'enter',
        description: 'play/pause video',
        callback: function(event) {
          event.preventDefault();
          videoClipControls = (angular.element(event.target))[0];
          if(videoClipControls.paused){
            videoClipControls.play();
          }else{
            videoClipControls.pause();
          }
        }
      });

    }

    // Public API here
    return serviceHotkeys;

  }
  
})();






