/*
 * Auto-generated content from the Brackets New Project extension.
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global $, window, document */

// Simple jQuery event handler
    "use strict";
var audio;

$(document).ready(function(){
         $('#pause').hide();
    
        initAudio($('#play-list li:first-child'));
    
        function initAudio(element){
          
            
            var song = element.attr('song');
            var title = element.text();
            var cover = element.attr('cover');
            var artist = element.attr('artist');

            audio = new Audio('media/' + song);
        
        //insert info
        $('.artist').text(artist);
        $('.title').text(title);
        
        $('#play-list li').removeClass('active');
        element.addClass('active');
        }
    
    //play stop pause
    $('#play').click(function(){
        audio.play();
        $('#play').hide();
        $('#pause').show();
        showDuration();
    });

     $('#pause').click(function(){
        audio.pause();
        $('#pause').hide();
        $('#play').show();
    });
    
     $('#stop').click(function(){
        audio.pause();
        audio.currentTime = 0;
         $('#pause').hide();
         $('#play').show();
    });
    
         $('#next').click(function(){
        audio.pause();
        var next = $('#play-list li.active').next();
             
             if(next.length == 0){
                 next = $('#play-list li.first-child');
                 $('#pause').hide();
                 $('#play').show();
             }
             initAudio(next);
             audio.play();
             showDuration();
    });
    
             $('#prev').click(function(){
        audio.pause();
        var prev = $('#play-list li.active').prev();
             
             if(prev.length == 0){
                 prev = $('#play-list li.last-child');
                 $('#pause').hide();
                 $('#play').show();
             }
             initAudio(prev);
             audio.play();
             showDuration();
    });
    
    //click song hendler
    $('#play-list li').click(function(){
        audio.pause();
        initAudio($(this));
        $('#play').hide();
        $('#pause').show();
        audio.play();
        showDuration();
    });
    
    //volume
    $('#volume').change(function(){
        audio.volume = parseFloat(this.value / 10);
    });
    
    //duration
    function showDuration(){
        $(audio).bind('timeupdate', function(){
            var s = parseInt(audio.currentTime % 60)
            var m = parseInt(audio.currentTime / 60) %60;
            
            if(s < 10){
                s = '0'+s;
            }
            $('#duration').html(m+ ':' +s);
            var value = 0;
            if(audio.currentTime > 0){
                value = Math.floor((100 / audio.duration) * audio.currentTime)
            }
            $('#progress').css('width',value+'%');
        });
    }
    

    
});