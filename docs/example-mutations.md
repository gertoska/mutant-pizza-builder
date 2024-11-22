# Tipos de mutaciones en Mutation Testing

En el contexto de **Mutation Testing**, las mutaciones son pequeños cambios introducidos deliberadamente en el código para evaluar la calidad de las pruebas. Estos cambios, conocidos como **mutantes**, simulan errores comunes que podrían ocurrir durante el desarrollo. En este documento, exploraremos los principales tipos de mutaciones que se pueden aplicar, desde alteraciones aritméticas hasta modificaciones en comparaciones, proporcionando una visión general de cómo estas pueden alterar el código original.

## Índice
1. [Mutaciones aritméticas](#mutaciones-aritméticas)
2. [Mutaciones de comparación](#mutaciones-de-comparación)
3. [Mutaciones de constantes](#mutaciones-de-constantes)
4. [Mutaciones lógicas](#mutaciones-lógicas)
5. [Mutaciones de operadores booleanos](#mutaciones-de-operadores-booleanos)
6. [Mutaciones de control de flujo](#mutaciones-de-control-de-flujo)
7. [Mutaciones de eliminación de declaraciones](#mutaciones-de-eliminación-de-declaraciones)
8. [Mutaciones de duplicación de declaraciones](#mutaciones-de-duplicación-de-declaraciones)

## Mutaciones aritméticas

```typescript
// Original code
function calculateTotal(price: number, quantity: number): number {
  return price * quantity; // Multiplication
}

// Arithmetic mutation: Changing multiplication to addition
function calculateTotal(price: number, quantity: number): number {
  return price + quantity; // Addition
}

// Arithmetic mutation: Changing multiplication to subtraction
function calculateTotal(price: number, quantity: number): number {
  return price - quantity; // Subtraction
}

// Arithmetic mutation: Changing multiplication to division
function calculateTotal(price: number, quantity: number): number {
  return price / quantity; // Division
}
```

## Mutaciones de comparación

```typescript
// Original code
function isEligibleForDiscount(price: number): boolean {
  return price >= 100; // Greater than or equal to
}

// Comparison mutation: Changing >= to >
function isEligibleForDiscount(price: number): boolean {
  return price > 100; // Greater than
}

// Comparison mutation: Changing >= to <=
function isEligibleForDiscount(price: number): boolean {
  return price <= 100; // Less than or equal to
}

// Comparison mutation: Changing >= to <
function isEligibleForDiscount(price: number): boolean {
  return price < 100; // Less than
}

// Comparison mutation: Changing >= to ==
function isEligibleForDiscount(price: number): boolean {
  return price == 100; // Equal to
}
```

## Mutaciones de constantes

```typescript
// Original code
function calculateDiscount(price: number): number {
  return price - 10; // Subtracting a fixed constant
}

// Constant mutation: Changing the constant value
function calculateDiscount(price: number): number {
  return price - 20; // Subtracting a larger constant
}

// Constant mutation: Changing the constant to zero
function calculateDiscount(price: number): number {
  return price - 0; // No discount applied
}

// Constant mutation: Changing the sign of the constant
function calculateDiscount(price: number): number {
  return price + 10; // Adding instead of subtracting
}
```

## Mutaciones lógicas

```typescript
// Original code
function canAccessPremiumFeatures(isAdmin: boolean, isSubscriber: boolean): boolean {
  return isAdmin && isSubscriber; // Logical AND
}

// Logical mutation: Changing AND to OR
function canAccessPremiumFeatures(isAdmin: boolean, isSubscriber: boolean): boolean {
  return isAdmin || isSubscriber; // Logical OR
}

// Logical mutation: Negating a condition
function canAccessPremiumFeatures(isAdmin: boolean, isSubscriber: boolean): boolean {
  return !isAdmin && isSubscriber; // Negating isAdmin
}

// Logical mutation: Removing a condition
function canAccessPremiumFeatures(isAdmin: boolean, isSubscriber: boolean): boolean {
  return isSubscriber; // Only checks isSubscriber
}
```

## Mutaciones de operadores booleanos

```typescript
// Original code
function isFeatureEnabled(isEnabled: boolean): boolean {
  return isEnabled; // Returns the boolean as is
}

// Boolean operator mutation: Negating the boolean
function isFeatureEnabled(isEnabled: boolean): boolean {
  return !isEnabled; // Returns the negated boolean
}

// Boolean operator mutation: Always returning true
function isFeatureEnabled(isEnabled: boolean): boolean {
  return true; // Ignores the input and always returns true
}

// Boolean operator mutation: Always returning false
function isFeatureEnabled(isEnabled: boolean): boolean {
  return false; // Ignores the input and always returns false
}
```

## Mutaciones de control de flujo

```typescript
// Original code
function processOrder(status: string): string {
  if (status === "pending") {
    return "Processing order...";
  } else if (status === "completed") {
    return "Order completed.";
  } else {
    return "Invalid status.";
  }
}

// Control flow mutation: Removing an else-if branch
function processOrder(status: string): string {
  if (status === "pending") {
    return "Processing order...";
  } else {
    return "Invalid status."; // The "completed" branch is removed
  }
}

// Control flow mutation: Changing the condition
function processOrder(status: string): string {
  if (status !== "pending") { // Condition mutated from === to !==
    return "Processing order...";
  } else if (status === "completed") {
    return "Order completed.";
  } else {
    return "Invalid status.";
  }
}

// Control flow mutation: Reordering branches
function processOrder(status: string): string {
  if (status === "completed") { // "completed" branch moved to the top
    return "Order completed.";
  } else if (status === "pending") {
    return "Processing order...";
  } else {
    return "Invalid status.";
  }
}
```

## Mutaciones de eliminación de declaraciones

```typescript
// Original code
function calculateFinalPrice(price: number, discount: number): number {
  const discountedPrice = price - discount; // Calculate discounted price
  const tax = discountedPrice * 0.1; // Add tax
  return discountedPrice + tax; // Return final price
}

// Mutation: Removing the calculation of the tax
function calculateFinalPrice(price: number, discount: number): number {
  const discountedPrice = price - discount; // Calculate discounted price
  return discountedPrice; // Return discounted price directly
}

// Mutation: Removing the discount application
function calculateFinalPrice(price: number, discount: number): number {
  const tax = price * 0.1; // Add tax (without discount)
  return price + tax; // Return price with tax only
}
```

## Mutaciones de duplicación de declaraciones

```typescript
// Original code
function calculateTotal(price: number, quantity: number): number {
  return price * quantity; // Multiply price by quantity
}

// Mutation: Duplicating the multiplication
function calculateTotal(price: number, quantity: number): number {
  return price * quantity * quantity; // Duplicates the quantity in the calculation
}

// Mutation: Duplicating the addition of a constant
function calculateTotal(price: number, quantity: number): number {
  return (price * quantity) + 10 + 10; // Duplicates the addition of 10
}
```
