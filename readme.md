# media_typer

[![tag](https://img.shields.io/github/tag/ako-deno/media_typer.svg)](https://github.com/ako-deno/media_typer/tags)
![media_typer-ci](https://github.com/ako-deno/media_typer/workflows/media_typer-ci/badge.svg)

Simple RFC 6838 media type parser and formatter for Deno, compatible with Browser. Based on `https://github.com/jshttp/media-typer`.

# Usage

This module will parse a given media type into it's component parts, like type,
subtype, and suffix. A formatter is also provided to put them back together and
the two can be combined to normalize media types into a canonical form.

If you are looking to parse the string that represents a media type and it's
parameters in HTTP (for example, the `Content-Type` header), use the
[content-type module](https://github.com/ako-deno/content_type).

## API
```js
import { format, test, parse, MediaType }  from "https://deno.land/x/media_typer/mod.ts";
```

### parse(string: string): MediaType

```js
let obj = parse('image/svg+xml');
```

Parse a media type string. This will return an object with the following
properties (examples are shown for the string `'image/svg+xml'`):

 - `type`: The type of the media type (always lower case). Example: `'image'`

 - `subtype`: The subtype of the media type (always lower case). Example: `'svg'`

 - `suffix`: The suffix of the media type (always lower case). Example: `'xml'`

If the given type string is invalid, then a `TypeError` is thrown.

### format(obj: MediaType): string

```js
let obj = format({ type: 'image', subtype: 'svg', suffix: 'xml' });
```

Format an object into a media type string. This will return a string of the
mime type for the given object. For the properties of the object, see the
documentation for `parse(string)`.

If any of the given object values are invalid, then a `TypeError` is thrown.

### test(string: string): boolean

```js
let valid = test('image/svg+xml');
```

Validate a media type string. This will return `true` is the string is a well-
formatted media type, or `false` otherwise.

### MediaType

```TypeScript
interface MediaType {
  type: string;
  subtype: string;
  suffix?: string;
}
```

# License

[MIT](./LICENSE)
