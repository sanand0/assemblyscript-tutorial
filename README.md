# Learning AssemblyScript

These are notes from me learning AssemblyScript.

[AssemblyScript](https://www.assemblyscript.org/) compiles a TypeScript-like language to WebAssembly.

For example, create a [`calc.ts`](calc.ts) file:

```ts
// calc.ts
export function len(a: string): i32 { return a.length; }`
```

```shell
npm install --save-dev assemblyscript
npx asc calc.ts --outFile calc.wasm --bindings esm
```

Then, in your ESM code, you can `import { len } from './calc.js'`

## Calling JavaScript

WebAssembly can call browser JavaScript code via [Host bindings](https://www.assemblyscript.org/compiler.html#host-bindings).

For example, [`utils.js`](utils.js) contains:

```js
export function changeTitle(title) {
  document.title = title;
}
```

Then, in [`calc.ts`](calc.ts), you can define `changeTitle()` like below and call it from AssemblyScript:

```ts
@external("./utils.js", "changeTitle")
declare function changeTitle(title: string): void;
```

Note:

- JS functions must have one or more fixed signatures.
- `async` is not supported.

## Handling TypeScript

- In [`tsconfig.json`](tsconfig.json), add `"extends": "assemblyscript/std/assembly.json"` to use AssemblyScript types.
- `@external` is not valid TypeScript. Ignore via `// @ts-ignore` on the line before. [Ref](https://github.com/AssemblyScript/assemblyscript/issues/390#issuecomment-586739436)

## About WASM

This uses [`WebAssembly.instantiateStreaming`](https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/instantiateStreaming_static)
which fetches, compiles, and instantiates a WASM.

```js
export const { fn1, fn2, ... } = await WebAssembly.instantiateStreaming(fetch("file.wasm")).then((r) => r.instance.exports);
```

WebAssembly does not natively support the following and AssemblyScript bridges some of these:

- Type conversion. Handled via [Host bindings](https://www.assemblyscript.org/compiler.html#host-bindings)
- Garbage collection. AssemblyScript copies strings into WASM and garbage collects them later via `exports.__new(size, width)`.
- Async operations are [not currently supported](https://github.com/AssemblyScript/assemblyscript/issues/376)
- DOM manipulation, Fetch, etc. are not possible.
- Exception handling is not supported.
