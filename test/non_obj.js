var test = require('tap').test;
var traverse = require('../');

test('traverse non-objects by customising isTraversable', function (t) {
    t.plan(1);
    var fun = function() {
    };

    fun.foo = "foo!";
    fun.bar = {baz: null};

    acc = [];
    traverse.forEach({fun: fun}, function() {
        this.isTraversable(function(obj) { return typeof(obj) != 'string'; });
        if(this.path.length > 0) acc.push(this.path.join("."));
    });

    t.equal(acc.join("\n"), [
            'fun',
            'fun.foo',
            'fun.bar',
            'fun.bar.baz'].join("\n"));
});
