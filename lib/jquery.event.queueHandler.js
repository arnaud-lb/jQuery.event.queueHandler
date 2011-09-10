/**
 * jQuery event queue plugin
 *
 * Allows to queue functions to be ran after event handlers
 * have been ran.
 *
 * Copyright (c) 2011 Arnaud Le Blanc
 *
 * MIT license
 */
(function($, window) {

    var origFix = $.event.fix;
    var origHandle = $.event.handle;

    /**
     * Extends event objects
     */
    $.event.fix = function() {

        var event = origFix.apply(this, arguments);

        $.extend(event, {
            _handlerQueue: []
            , queueHandler: function(fun) {

                var event = this;
                var origEvent = $.extend({}, this);

                this._handlerQueue.push(function() {
                    $.extend(event, origEvent);
                    fun.apply(event.currentTarget, arguments);
                });
            }
        });

        return event;
    };

    /**
     * Calls queued handlers after event handlers have been ran
     */
    $.event.handle = function(event) {

        event = jQuery.event.fix( event || window.event );

        var args = Array.prototype.slice.call(arguments, 0);
        args[0] = event;

        origHandle.apply(this, args);

        for (var i = 0, l = event._handlerQueue.length; i < l; ++i) {
            event._handlerQueue[i].apply(this, args);
        }

        return event.result;
    };

}(jQuery, window));

