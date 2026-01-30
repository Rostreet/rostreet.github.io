---
title: TypeScript 最佳实践指南
date: 2024-12-26
readTime: 6 分钟
category: TypeScript
author: Zhai Changhao
excerpt: 提升你的 TypeScript 代码质量，学习类型系统的高级用法和常见模式的实现。
---

# TypeScript 最佳实践

TypeScript 已经成为现代前端开发的标准，它能帮助我们捕获错误、提高代码质量和开发效率。

## 类型基础

### 1. 使用 interface vs type

```typescript
// 使用 interface 定义对象结构
interface User {
  id: number;
  name: string;
  email: string;
}

// 使用 type 定义联合类型或交叉类型
type Status = "pending" | "approved" | "rejected";
type UserWithStatus = User & { status: Status };
```

### 2. 避免使用 any

```typescript
// ❌ 不好
function processData(data: any) {
  return data.value;
}

// ✅ 好
function processData(data: { value: string }) {
  return data.value;
}

// ✅ 更好 - 使用泛型
function processData<T extends { value: string }>(data: T): T {
  return data;
}
```

## 高级类型

### 1. 泛型约束

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

### 2. 条件类型

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;
```

### 3. 映射类型

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

## 实用模式

### 1. 类型守卫

```typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processValue(value: unknown) {
  if (isString(value)) {
    // TypeScript 知道这里 value 是 string
    console.log(value.toUpperCase());
  }
}
```

### 2. Discriminated Unions

```typescript
type Success = {
  status: "success";
  data: string;
};

type Error = {
  status: "error";
  message: string;
};

type Result = Success | Error;

function handleResult(result: Result) {
  if (result.status === "success") {
    console.log(result.data);
  } else {
    console.log(result.message);
  }
}
```

### 3. Utility Types

```typescript
// Partial - 所有属性可选
type PartialUser = Partial<User>;

// Required - 所有属性必需
type RequiredUser = Required<Partial<User>>;

// Pick - 选择部分属性
type UserPreview = Pick<User, "id" | "name">;

// Omit - 排除部分属性
type CreateUserInput = Omit<User, "id">;

// Record - 构建对象类型
type UserMap = Record<string, User>;
```

## 配置最佳实践

### tsconfig.json 推荐

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

## 代码组织

### 1. 导出类型

```typescript
// types.ts
export interface User {}
export type UserRole = "admin" | "user";

// 使用
import { User, UserRole } from "./types";
```

### 2. 类型导入

```typescript
// 仅导入类型
import type { User } from "./types";
import { userService } from "./services"; // 导入值
```

## 总结

遵循这些 TypeScript 最佳实践，将帮助你：

- 编写更安全的代码
- 提高开发效率
- 减少运行时错误
- 改善代码可维护性

TypeScript 是一个强大的工具，掌握它将让你的开发工作事半功倍。
