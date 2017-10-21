# How long
Break down the difference between two js dates into customisable units, using this simple, fast, lightweight module.

## Installation
```js
npm install --save how-long
```

```js
howLong(Date.now(), Date.now() + 61001, 'seconds')
```
```json
{
  "seconds": 61
}
```
```js
howLong(Date.now(), Date.now() + 61001, ['minutes', 'seconds'])
```
```json
{
  "minutes": 1,
  "seconds": 1
}
```
If you do not specify time units, how-long will break down the difference in terms of all the time units it knows about:

```js
howLong(Date.now(), Date.now() + 61001)
```
```json
{
  "years": 0,
  "months": 0,
  "weeks": 0,
  "days": 0,
  "hours": 0,
  "minutes": 1,
  "seconds": 1,
  "milliseconds": 1
}
```
