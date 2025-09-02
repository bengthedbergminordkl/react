# TypeScript Cheatsheet 📖

TypeScript is a superset of JavaScript that adds **static typing** to the language. This cheatsheet covers the fundamental concepts to get you up and running quickly.

---

## ⚙️ Basic Types

TypeScript has several built-in types.

- `number`: Represents both integer and floating-point numbers.
  ```typescript
  let age: number = 30;
  ```
- `string`: Represents text.
  ```typescript
  let name: string = "Alice";
  ```
- `boolean`: Represents a logical value, either `true` or `false`.
  ```typescript
  let isActive: boolean = true;
  ```
- `any`: A type that disables type-checking, allowing a variable to be any type. Use sparingly.
  ```typescript
  let data: any = "can be a string or number";
  data = 100;
  ```
- `unknown`: A safer alternative to `any`. Variables of type `unknown` must have their type narrowed before you can perform operations on them.
  ```typescript
  let value: unknown = "hello";
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
  ```
- `void`: The return type for functions that do not return a value.
  ```typescript
  function logMessage(): void {
    console.log("This function returns nothing.");
  }
  ```
- `null` and `undefined`: These types represent `null` and `undefined` values, respectively. They are also subtypes of all other types.
  ```typescript
  let u: undefined = undefined;
  let n: null = null;
  ```

---

## 📂 Arrays and Tuples

Arrays store a collection of elements of a single type. Tuples are a fixed-size array with elements of known types.

- **Arrays**:
  ```typescript
  let numbers: number[] = [1, 2, 3];
  let names: Array<string> = ["Bob", "Charlie"]; // Generics syntax
  ```
- **Tuples**:
  ```typescript
  let person: [string, number] = ["Bob", 25];
  ```

---

## 📝 Functions

Type annotations can be applied to function parameters and return values.

- **Syntax**:
  ```typescript
  function add(a: number, b: number): number {
    return a + b;
  }
  ```
- **Optional and Default Parameters**: Use `?` for optional parameters and `=` for default values.
  ```typescript
  function greet(name: string, age?: number): string {
    return `Hello, ${name}!`;
  }
  function multiply(a: number, b: number = 2): number {
    return a * b;
  }
  ```

---

## 🧱 Interfaces and Types

Interfaces and types are used to describe the shape of an object.

- **Interfaces**: Define contracts for object shapes. They are often preferred for object types and can be extended.

  ```typescript
  interface User {
    id: number;
    name: string;
    email?: string; // Optional property
  }

  const user: User = {
    id: 1,
    name: "Alice",
  };
  ```

- **Type Aliases**: Create a new name for a type. Can be used for primitive types, unions, and tuples.

  ```typescript
  type ID = string | number;
  type Point = { x: number; y: number };

  let userId: ID = "abc-123";
  ```

- **Extending Interfaces**: Interfaces can inherit from other interfaces.
  ```typescript
  interface Admin extends User {
    role: string;
  }
  const adminUser: Admin = {
    id: 2,
    name: "Bob",
    role: "admin",
  };
  ```

---

## 🔀 Union and Intersection Types

- **Union Types**: A variable can be one of several types. Use `|`.
  ```typescript
  let result: number | string;
  result = 10;
  result = "success";
  ```
- **Intersection Types**: Combines multiple types into one. A variable must have all properties of the intersected types. Use `&`.
  ```typescript
  type HasName = { name: string };
  type HasAge = { age: number };
  type Person = HasName & HasAge;
  const person: Person = {
    name: "John",
    age: 30,
  };
  ```

---

## 🗄️ Classes

TypeScript supports object-oriented programming with classes.

- **Basic Class**:
  ```typescript
  class Animal {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
    makeSound(): string {
      return "Generic sound";
    }
  }
  ```
- **Inheritance**: Use `extends` to inherit from a base class. Use `super()` to call the parent's constructor.
  ```typescript
  class Dog extends Animal {
    constructor(name: string) {
      super(name);
    }
    makeSound(): string {
      return "Woof!";
    }
  }
  const myDog = new Dog("Buddy");
  console.log(myDog.makeSound()); // "Woof!"
  ```
- **Access Modifiers**: Control the visibility of class members.
  - `public` (default): Accessible from anywhere.
  - `private`: Accessible only within the class.
  - `protected`: Accessible within the class and by subclasses.

---

## 🏷️ Enums

Enums are a way of giving more friendly names to sets of numeric values.

- **Numeric Enum**:
  ```typescript
  enum Direction {
    Up, // 0
    Down, // 1
    Left, // 2
    Right, // 3
  }
  let myDirection: Direction = Direction.Up;
  ```
- **String Enum**:
  ```typescript
  enum Status {
    Success = "SUCCESS",
    Error = "ERROR",
  }
  let currentStatus: Status = Status.Success;
  ```

---

## ✨ Generics

Generics allow you to create reusable components that can work with a variety of types rather than a single one.

- **Syntax**: Use a type variable (e.g., `T`) inside angle brackets.
  ```typescript
  function identity<T>(arg: T): T {
    return arg;
  }
  let output = identity<string>("myString");
  let output2 = identity<number>(123);
  ```

---

## 🛠️ Common Object Functions

TypeScript leverages JavaScript's built-in object methods, often with type inference.

- **`Object.keys()`**: Returns an array of a given object's own enumerable property names. The return type is `string[]`.

  ```typescript
  const user = { name: "Alice", age: 30 };
  const keys: string[] = Object.keys(user); // ['name', 'age']
  ```

- **`Object.values()`**: Returns an array of a given object's own enumerable property values. The return type is inferred as a union of the value types.

  ```typescript
  const user = { name: "Alice", age: 30 };
  const values: (string | number)[] = Object.values(user); // ['Alice', 30]
  ```

- **`Object.entries()`**: Returns an array of a given object's own enumerable string-keyed property `[key, value]` pairs. The return type is a tuple array.

  ```typescript
  const user = { name: "Alice", age: 30 };
  const entries: [string, string | number][] = Object.entries(user); // [['name', 'Alice'], ['age', 30]]
  ```

- **`Object.assign()`**: Copies all enumerable own properties from one or more source objects to a target object. It returns the target object.

  ```typescript
  const target = { a: 1 };
  const source = { b: 2, c: 3 };
  const merged = Object.assign(target, source); // { a: 1, b: 2, c: 3 }
  ```

- **Spread Syntax (`...`)**: A modern and common way to copy properties from one object to another. This is often preferred over `Object.assign()` for its conciseness.

  ```typescript
  const obj1 = { a: 1, b: 2 };
  const obj2 = { c: 3, d: 4 };
  const combined = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }
  ```

- **Optional Chaining (`?.`)**: Allows you to safely access nested properties without explicit null checks.

  ```typescript
  interface UserProfile {
    name: string;
    address?: {
      street: string;
    };
  }
  const user: UserProfile = { name: "Alice" };
  const street = user.address?.street; // undefined, no error
  ```

- **Nullish Coalescing (`??`)**: Provides a default value for an expression that is `null` or `undefined`.

  ```typescript
  const user = { name: "Alice", age: null };
  const age = user.age ?? 25; // age is 25
  ```
