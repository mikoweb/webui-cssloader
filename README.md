## Initialization

```javascript
require(["webui-cssloader"], function (loader) {
    loader.timeout(5000);
    loader.mode('static');
    loader.setBasePath('/css');
    loader.definePath({bxslider: 'lib/bxslider/bxslider', select2: 'lib/select2/select2'});
});
```

The above code defined two path:

- `@bxslider`: /css/lib/bxslider/bxslider.css
- `@select2`: /css/lib/select2/select2.css

## How to use

It's simple.

```javascript
require(["webui-cssloader"], function (loader) {
    loader.inject('@bxslider', function () {
        $('.bxslider').bxSlider();
    });
});
```
