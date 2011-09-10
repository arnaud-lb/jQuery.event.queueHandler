
jQuery plugin to queue a function to be ran after the current event's handlers have been ran.

### API

- event.queue(callback): queue a function to be ran after the current event's handlers have been ran

### Usecase

``` javascript
$(document).delegate('a[rel="external"]', 'click', function(event) {
    window.open(this.href);
});
$(document).delegate('a', 'click', function(event) {
    event.stopImmediatePropagation();
});
```

Problem in this code: The second event handler can't avoid the first event handle from being run.

Obvious solution: use `setTimeout()` in the first event handler and test for `event.isImmediatePropagationStopped()`:

``` javascript
$(document).delegate('a[rel="external"]', 'click', function(event) {
    setTimeout(function() {
        if (event.isImmediatePropagationStopped()) return;
        window.open(this.href);
    }, 0);
});
```

Problem: `window.open()` is blocked

Solution: queue a function to be ran just after other event handlers:

``` javascript
$(document).delegate('a[rel="external"]', 'click', function(event) {
    event.queue(function() {
        if (event.isImmediatePropagationStopped()) return;
        window.open(this.href);
    });
});
```

