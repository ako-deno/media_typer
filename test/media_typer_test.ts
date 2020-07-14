import {
  assertStrictEquals,
  assertThrows,
} from "https://deno.land/std@0.60.0/testing/asserts.ts";
import { format, test, parse } from "../mod.ts";

const invalidTypes = [
  " ",
  "null",
  "undefined",
  "/",
  "text/;plain",
  'text/"plain"',
  "text/p£ain",
  "text/(plain)",
  "text/@plain",
  "text/plain,wrong",
];

Deno.test("format(obj) should format basic type", () => {
  const str = format({ type: "text", subtype: "html" });
  assertStrictEquals(str, "text/html");
});

Deno.test("format(obj) should format type with suffix", () => {
  const str = format({ type: "text", subtype: "html" });
  assertStrictEquals(str, "text/html");
});

Deno.test("format(obj) should format type with suffix", function () {
  const str = format({ type: "image", subtype: "svg", suffix: "xml" });
  assertStrictEquals(str, "image/svg+xml");
});

Deno.test("format(obj) should reject invalid type", function () {
  const obj = { type: "text/", subtype: "html/" };
  assertThrows(format.bind(null, obj), TypeError, "invalid type");
});

Deno.test("format(obj) should reject invalid subtype", function () {
  const obj = { type: "text", subtype: "html/" };
  assertThrows(format.bind(null, obj), TypeError, "invalid subtype");
});

Deno.test("format(obj) should reject invalid suffix", function () {
  const obj = { type: "image", subtype: "svg", suffix: "xml\\" };
  assertThrows(format.bind(null, obj), TypeError, "invalid suffix");
});

Deno.test("parse(string) should parse basic type", function () {
  const type = parse("text/html");
  assertStrictEquals(type.type, "text");
  assertStrictEquals(type.subtype, "html");
});

Deno.test("parse(string) should parse with suffix", function () {
  const type = parse("image/svg+xml");
  assertStrictEquals(type.type, "image");
  assertStrictEquals(type.subtype, "svg");
  assertStrictEquals(type.suffix, "xml");
});

Deno.test("parse(string) should lower-case type", function () {
  const type = parse("IMAGE/SVG+XML");
  assertStrictEquals(type.type, "image");
  assertStrictEquals(type.subtype, "svg");
  assertStrictEquals(type.suffix, "xml");
});

invalidTypes.forEach(function (type) {
  Deno.test(
    "parse(string) should throw on invalid media type " + JSON.stringify(type),
    function () {
      assertThrows(parse.bind(null, type), TypeError, "invalid media type");
    },
  );
});

Deno.test("test(string) should pass basic type", function () {
  assertStrictEquals(test("text/html"), true);
});

Deno.test("test(string) should pass with suffix", function () {
  assertStrictEquals(test("image/svg+xml"), true);
});

Deno.test("test(string) should pass upper-case type", function () {
  assertStrictEquals(test("IMAGE/SVG+XML"), true);
});

invalidTypes.forEach(function (type) {
  Deno.test(
    "test(string) should fail invalid media type " + JSON.stringify(type),
    function () {
      assertStrictEquals(test(type), false);
    },
  );
});
