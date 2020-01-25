export function* map<a, b>(a: Iterator<a>, f:(a:a) => b){
  let value = a.next()
  while(value.done == false) {
    yield f(value.value)
    value = a.next()
  }
}

export function first<a>(a: Iterator<a>) {
  return a.next().value
}

export function* take<a>(a: Iterator<a>, n: number) {
  let i = 0
  while(i < n) {
    yield a.next().value
    i++
  }
}

export function* skip<a>(a: Iterator<a>, n: number) {
  let i = 0
  let v = a.next()
  while (i < n) {
    v = a.next()
    i++
  }
  while(v.done == false) {
    v = a.next()
    yield v.value
  }
}

export function* filter<a>(a: Iterator<a>, p: (a:a) => boolean) {
  let current = a.next()
  while(current.done == false) {
    if(p(current.value)) yield current.value
    current = a.next()
  }
}

export const fromIterator = <a>(itt: Iterator<a>) => ({
  toArray: () => to_array(itt),
  filter: (p: (a: a) => boolean) => fromIterator(filter(itt, p)),
  map: <b>(f: (a: a) => b) => fromIterator(map(itt, f)),
  first: () => first(itt),
  skip: (n: number) => fromIterator(skip(itt, n)),
  take: (n: number) => fromIterator(take(itt, n))
})

export const fromArray = <a>(a:a[]) => fromIterator(from_array(a))

export const fromFunction = <a>(f:(i: number, last: a | undefined) => a) => fromIterator(from_function(f))

export const fromRange = (s: number, e?: number) => fromIterator(from_range(s, e))

function* from_range(s:number, e?: number) {
  let v = s
  while(e == undefined || v < e) {
    v++
    yield v
  }
}

function* from_function<a>(f:(i:number, last: a|undefined) => a) {
  let i = 0
  let v = undefined
  while(true) {
    const next = f(i, v)
    yield next
    i++
    v = next
  }
}

function* from_array<a>(a: a[]) {
  for (const v of a) yield v
}

function to_array<a>(a: Iterator<a>) {
  let result: a[] = []
  let current = a.next()
  while (current.done == false) {
    result.push(current.value)
    current = a.next()
  }
  return result
}