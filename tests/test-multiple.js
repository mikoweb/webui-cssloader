require(["webui-cssloader"], function (loader) {
    "use strict";

    (function ($) {
        function styleExists(file) {
            return $(document).find('link[href="' + file + '"]').length > 0;
        }

        QUnit.test('loader test', function(assert) {
            var loads = 0, i, styleLoads = [], repeat = 4, interval, timeout = 3000, time = 0;

            QUnit.stop();
            loader.mode('static');
            loader.setBasePath('files');
            loader.definePath({
                style: 'style',
                style2: 'style2',
                style3: 'style3',
                style4: 'style4',
                style5: 'style5',
                style6: 'style6'
            });

            styleLoads.push(0);
            for (i = 0; i < repeat; ++i) {
                loader.inject(['@style', '@style2', '@style3'], function () {
                    ++loads;
                    ++styleLoads[0];
                    assert.ok(styleExists('files/style.css'), 'ok style.css');
                    assert.ok(styleExists('files/style2.css'), 'ok style2.css');
                    assert.ok(styleExists('files/style3.css'), 'ok style3.css');
                });
            }

            styleLoads.push(0);
            for (i = 0; i < repeat; ++i) {
                loader.inject(['@style4', '@style5', '@style6'], function () {
                    ++loads;
                    ++styleLoads[1];
                    assert.ok(styleExists('files/style4.css'), 'ok style4.css');
                    assert.ok(styleExists('files/style5.css'), 'ok style5.css');
                    assert.ok(styleExists('files/style6.css'), 'ok style6.css');
                });
            }

            interval = setInterval(function () {
                time += 100;
                if (time > timeout) {
                    assert.notOk(true, 'test timeout');
                    QUnit.start();
                    clearInterval(interval);
                }

                if (loads === (repeat * 2)) {
                    for (i = 0; i < styleLoads.length; ++i) {
                        assert.strictEqual(styleLoads[i], repeat, 'style ' + (i+1) + ' loads equal');
                    }

                    assert.strictEqual($('.test').css('fontSize'), '1px', 'font size 1px');
                    assert.strictEqual($('.test2').css('fontSize'), '2px', 'font size 2px');
                    assert.strictEqual($('.test3').css('fontSize'), '3px', 'font size 3px');
                    assert.strictEqual($('.test4').css('fontSize'), '4px', 'font size 4px');
                    assert.strictEqual($('.test5').css('fontSize'), '5px', 'font size 5px');
                    assert.strictEqual($('.test6').css('fontSize'), '6px', 'font size 6px');

                    QUnit.start();
                    clearInterval(interval);
                }
            }, 100);
        });
    }(jQuery));
});
