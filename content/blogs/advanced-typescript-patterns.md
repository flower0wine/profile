---
id: "3"
title: "TypeScript 高级模式与实践"
excerpt: "探索 TypeScript 的高级类型系统、设计模式和性能优化技巧。"
coverImage: "/images/typescript-advanced.jpg"
publishDate: "2024-01-20"
author:
  name: "张三"
  image: "/images/authors/zhangsan.jpg"
tags:
  - TypeScript
  - 设计模式
  - 类型系统
format: markdown
---

# TypeScript 高级模式与实践

本文将深入探讨 TypeScript 的高级特性和常用设计模式，帮助你编写更安全、更优雅的代码。

## 1. 高级类型系统

### 1.1 条件类型

```typescript
type IsString<T> = T extends string ? true : false;
type Result1 = IsString<"hello">; // true
type Result2 = IsString<42>; // false

// 实际应用
type NonNullable<T> = T extends null | undefined ? never : T;
```

### 1.2 映射类型

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

// 高级映射
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
```

## 2. 类型推断优化

### 2.1 泛型约束

```typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): number {
  console.log(arg.length);
  return arg.length;
}

// 使用
logLength("hello"); // 5
logLength([1, 2, 3]); // 3
logLength({ length: 10 }); // 10
// logLength(42); // Error!
```

### 2.2 类型守卫

```typescript
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim();
  } else {
    pet.fly();
  }
}
```

## 3. 高级设计模式

### 3.1 Builder 模式

```typescript
class RequestBuilder {
  private url: string = "";
  private method: "GET" | "POST" = "GET";
  private headers: Record<string, string> = {};
  private body: unknown;

  setUrl(url: string): this {
    this.url = url;
    return this;
  }

  setMethod(method: "GET" | "POST"): this {
    this.method = method;
    return this;
  }

  setHeader(key: string, value: string): this {
    this.headers[key] = value;
    return this;
  }

  setBody<T>(body: T): this {
    this.body = body;
    return this;
  }

  build(): Request {
    return new Request(this.url, {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(this.body),
    });
  }
}
```

### 3.2 工厂模式

```typescript
interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }
}

class FileLogger implements Logger {
  log(message: string): void {
    // 写入文件逻辑
  }
}

class LoggerFactory {
  static createLogger(type: "console" | "file"): Logger {
    switch (type) {
      case "console":
        return new ConsoleLogger();
      case "file":
        return new FileLogger();
      default:
        throw new Error("Unknown logger type");
    }
  }
}
```

## 4. 性能优化技巧

### 4.1 类型缓存

```typescript
// 不好的写法
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// 好的写法
interface CachedType<T> {
  type: T;
}

type DeepPartialCached<T> =
  T extends CachedType<infer U>
    ? DeepPartial<U>
    : {
        [P in keyof T]?: T[P] extends object
          ? DeepPartialCached<CachedType<T[P]>>
          : T[P];
      };
```

### 4.2 条件类型分发

```typescript
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type Result = UnionToIntersection<{ a: string } | { b: number }>;
// Result = { a: string } & { b: number }
```

## 5. 实战应用

### 5.1 API 类型安全

```typescript
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

type ApiEndpoints = {
  "/users": {
    get: ApiResponse<User[]>;
    post: ApiResponse<User>;
  };
  "/posts": {
    get: ApiResponse<Post[]>;
    post: ApiResponse<Post>;
  };
};

async function apiRequest<
  T extends keyof ApiEndpoints,
  M extends keyof ApiEndpoints[T],
>(endpoint: T, method: M): Promise<ApiEndpoints[T][M]> {
  // 实现细节...
  return {} as ApiEndpoints[T][M];
}
```

## 6. 总结

TypeScript 的类型系统非常强大，通过合理使用这些高级特性，我们可以：

1. 提高代码的类型安全性
2. 改善开发体验
3. 减少运行时错误
4. 提高代码可维护性

---

> 参考资料：
>
> 1. [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
> 2. [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
