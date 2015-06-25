var textFocus = new function () {
    var me = this,
        $jc = {},
        originalCenter,
        stopAnim = false;
    
    me.init = function () {
       
       $jc = {
           container: $('.container'),
           textBlock: $('.text-focus'),
           lines: $('.text-focus > div')
       };
       
       
       originalCenter = $jc.textBlock.height() / 2;
       $(window).on('wheel mousewheel', mousewheelEventHandler);
       moveText(0);
       
       startAutoplay();
    };
   
    function startAutoplay() {
        animProps = {
            now: 1000
        }
        
        TweenLite.to(animProps, 5, {                
            now: -500,
            onUpdate: function () {
                if (!stopAnim) {
                    moveText(animProps.now);
                }
            },
            easing: Power1.easeInOut
        });
    }
    
    function getTransform($el) {
        var matrix=$el.css('transform');
        
        matrix= matrix.split(/[\(\)]/g)[1].split(',');
        return {
            x: parseFloat(matrix[0]),
            y: parseFloat(matrix[3])
        };
        
    }
    
     
    function mousewheelEventHandler(e) {
        e.preventDefault();
        stopAnim = true;
        var wheelDelta = e.originalEvent.wheelDelta/120 || e.originalEvent.deltaY,
            top = parseFloat($jc.textBlock.css('top'))
        moveText(top + wheelDelta * 3);
        
        
    }
    
    function moveText(y) {
        var top = parseFloat($jc.textBlock.css('top'))
            heightWithoutPadding = $jc.textBlock.height() - top,
            lineHeight = parseFloat($jc.textBlock.css('line-height')),
            focalPoint = heightWithoutPadding - lineHeight;
        
        $jc.textBlock.css('top', y);
        //getY($jc.textBlock);
        $jc.lines.each(function (i, el) {
           var $el = $(el),
               top = $el.offset().top,
               blur = Math.abs(originalCenter - top) / 10;
               
           $el.css('text-shadow', '0 0 ' + blur + 'px #fff');
               
           
            
        });
    }
};

textFocus.init();
