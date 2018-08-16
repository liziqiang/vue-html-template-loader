# vue-html-template-loader

## usage

```javascript
{
    test: /\.html$/,
    loader: 'vue-html-template-loader',
    options: {
        include: [path]
    }
}
```

replace `html-loader` to `vue-html-template-loader`; if you want to handle some specific file use options.include to use `vue-html-template-loader`;