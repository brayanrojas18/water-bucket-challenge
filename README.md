# water-bucket-challenge-chicks-gold

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### General

- This project is made with vue 3 and tailwind, it consists of the water bucket challenge which is developed in app.vue

- Taking into account the requirement, it consists of an initial configuration which must establish the capacity of jar x (Bucket 1), jar 2 (Bucket 2) and the desired quantity, once this is done it must be saved so that the jars can perform the filling, transfer and emptying actions.

- When saving the initial configuration, a validation is performed to determine if there is a possible solution to reach the desired quantity according to the configuration. This validation is done with a function called “validateSolution” that uses Bézout’s theorem which tells us that for a quantity 𝑍 to be possible to obtain using two jars with capacities 𝑋 and 𝑌, 𝑍 must be a multiple of the GCD of 𝑋 and 𝑌, and 𝑍 must be less than or equal to the size of the largest jar and the Euclidean algorithm used to find the GCD of two numbers. This function returns a “no solution” message if there is none.

- Two jars or buckets are shown on the screen which, after setting the initial values, are available to perform the aforementioned actions. This works by clicking on the buckets, which displays a menu where the filling, transferring and emptying actions are shown.

- Each action mentioned above has its function, which are:

* “handledFill” to fill the desired jugs
* “handleEmpty” to empty the desired jugs
* “handleTransfer” to transfer from one jug to another

handleTransfer: This last one uses a series of validations to be able to transfer water from one jug to another. It uses a function called “checkSolution” which validates between both jugs or buckets when one of them reaches the desired amount. If this is the case, it shows a “Solved” message.

Test Cases

Example 1:
X: 3, Y: 9, Z: 6

This is the best solution:

Bucket x Bucket y Explanation
3 0 Fill bucket x
0 3 Transfer from bucket x to bucket y
3 3 Fill bucket x
0 6 Transfer from bucket x to bucket y. SOLVED

Worst solution:
Bucket x Bucket y Explanation
0 9 Fill bucket y
3 6 Transfer from bucket y to bucket x
0 6 Empty bucket x. SOLVED

Example 2:
X: 4, Y: 7, Z: 5

Bucket x Bucket y Explanation
4 0 Fill bucket x
0 4 Transfer from bucket x to bucket y
4 4 Fill bucket x
1 7 Transfer from bucket x to bucket y
1 0 Empty bucket y
0 1 Transfer from bucket y to bucket x
4 1 Fill bucket x
0 5 Transfer bucket x to bucket y. SOLVED

Example 3:

Borderline case (no solution) X: 5, Y: 15, Z: 4

Solution: No solution possible. Displays "No solution".

# water-bucket-challenge
