### WATI AD-sdk

### Usage

Insert script into head or body

```html
<script type="text/javascript" data-phone="xxxx" src="ttps://demo.leeapps.dev/wati-capi.sdk.js"></script>
```

Passing parameters through `data-` prefix, `phone` is the only parameter required.

Currently supported custom parameters

- `phone` - phone number to whatsapp, `data-phone="xxxx"`
- `site` - custom website link, `data-site="xxx"`
- `src` - custom picture link, `data-src="xxx"`
- `width` - custom picture width, `data-width="xxx"`
- `height` - custom picture height, `data-height="xxx"`
- `elm` - custom element to insert, `data-elm="#wati-img"`
- `welcome` - First line of welcome text to whatsapp, `data-welcome="xxx"`
- `end` - Last line of welcome text to whatsapp, `data-end="xxx"`
- `style` - custom style for whatsapp button, `data-style="xxx"`
