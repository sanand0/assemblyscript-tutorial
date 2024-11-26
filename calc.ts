// calc.ts

// This is a simple function. It accepts a string (handled via bindings) and returns an i32: an AssemblyScript type.
export function len(a: string): i32 {
  // String methods are supported.
  return a.length;
}

// This is a more complex function. It calls JS functions and returns an object.
export function add(a: i32, b: i32): ResultObject {
  const result = a + b * 2;

  // String concatenation is supported.
  const message = a.toString() + " + " + b.toString() + " = " + result.toString();

  // You can call JavaScript functions.
  logObject({ level: "info", message });

  // You can update the DOM via JavaScript
  changeTitle("Running add()");

  // Console.
  consoleLog(message);
  return { result };
}

// You can declare to any JS function available in window.* (or globalThis.*)
// @ts-ignore -- @external is an AssemblyScript extension
@external("env", "console.log")
declare function consoleLog(s: string): void;

// You can declare any JS function from any ES module
// @ts-ignore -- @external is an AssemblyScript extension
@external("./utils.js", "changeTitle")
declare function changeTitle(title: string): void;

// @ts-ignore -- @external is an AssemblyScript extension
@external("./utils.js", "logObject")
declare function logObject(info: LogInfo): void;

// You can accept objects. Declare them as a class.
class LogInfo {
  // @ts-ignore -- field is not initialized
  level: string;
  // @ts-ignore -- field is not initialized
  message: string;
}

// You can return objects. Declare them as a class.
class ResultObject {
  // @ts-ignore -- field is not initialized
  result: i32;
}
