# Generators For Better Performing TypeScript Collections

In recend years the JavaScript community has embraced the functional array methods like `map` and `filter`. Writing for-loops has become something that gets acosiated with 2015 and JQuery. But the array methods in JavaScript are far from ideal when we are talking about performance. Lets introduce an example to clarrify the issues:

```ts
const x = [1,2,3,4,5]
  .map(x => x * 2)
  .filter(x => x > 5)
  [0]
```

This code will execute the following steps:
- create the array with 5 items
- create a new array with all the numbers doubled
- create a new array with the numbers filtered
- take the first one

This involves a lot more stuff happening then is actualy needed. The only thing has to happen is that the first item that passes `x > 5` gets processed an returned. In other languages (like Python) iterators are used to solve this issue. Those iterators are a lazzy data collection and only processes data when it is requested. If JavaScript would use lazzy iterators for its array methods the following would happen instead:

- `[0]` requests the first item from `filter`
- `filter` requests items from `map` until it has one item that passes the predicate and yields it
- `map` has processed an item for each time `filter` requested it

Here we did only map and filter the first tree items in the array because no more items where requested from the iterable. There where also no additional arrays or iterables constructed because every item goes through the entire pipeline one after the other. This is a concept that results in massive performance gains when processing a lot a data.







Generators allow us to create lazzy sequences in TypeScript. With higher-order generators we can transform such lazyy collections without iterating them. Building collection-logic with generators instead of with arrays will garanty us that as little as posible resources are spend on calculating the result. 

```ts
function* map<a, b>(a: Iterator<a>, f:(a:a) => b){
  let value = a.next()
  while(value.done == false) {
    yield f(value.value)
    value = a.next()
  }
}
```

```ts
function first<a>(a: Iterator<a>) {
  return a.next().value
}
```