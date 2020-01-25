# Lazy collections with iterators for TypeScript

Read the article here for more context

## Interface

### Constructors

#### `fromArray`
Convers an array to a lazy collection.

#### `fromFunction`
Creates a sequence based of a function. The function will get the index and the previous value as a param and should return the next value. The last value is undefiend on the first call.

#### `fromRange` 
Creates a sequence of numbers based on a min and max.

### Collection methods

#### `toArray`
converts the collection to an array. Causes a full iteration of the complete data pipeline. Don't use this unless needed.

#### `filter`
Filter a collection based on a predicate. This is a lazy operation, no iteration will be caused.

#### `map`
Convert all items in the collection by applying a function. This is a lazy operation, no iteration will be caused.

#### `first`
Get the first item from the collection. This will only cause the pipeline to proccess the first item. No full iteration will occure. Collections are a stream, so you can only recieve every item once.

#### `skip`
Skips a given amount of items of the collection. This will only cause the pipeline to proccess the skipped items. No full iteration will occure. 

#### `take`
Limit the size of the collection to a given number. This is a lazy operation, no iteration will be caused.