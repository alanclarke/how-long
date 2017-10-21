/* globals describe it */
var howLong = require('../index')
var expect = require('chai').expect

describe('how long', function () {
  var ms = {}
  ms.milliseconds = 1
  ms.seconds = 1000
  ms.minutes = ms.seconds * 60
  ms.hours = ms.minutes * 60
  ms.days = ms.hours * 24
  ms.weeks = ms.days * 7

  it('should compute years', function () {
    var date1 = new Date()
    var date2 = new Date(date1.getTime())
    date2.setFullYear(date2.getFullYear() + 1)
    expect(howLong(date1, date2)).to.eql({
      years: 1,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0
    })
  })

  it('should compute months', function () {
    var date1 = new Date()
    var date2 = new Date(date1.getTime())
    date2.setMonth(date2.getMonth() + 1)
    expect(howLong(date1, date2)).to.eql({
      years: 0,
      months: 1,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0
    })
  })

  it('should compute weeks', function () {
    var date1 = new Date()
    var date2 = new Date(date1.getTime())
    date2.setTime(date2.getTime() + ms.weeks)
    expect(howLong(date1, date2)).to.eql({
      years: 0,
      months: 0,
      weeks: 1,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0
    })
  })

  it('should compute days', function () {
    var date1 = new Date()
    var date2 = new Date(date1.getTime())
    date2.setTime(date2.getTime() + ms.days)
    expect(howLong(date1, date2)).to.eql({
      years: 0,
      months: 0,
      weeks: 0,
      days: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0
    })
  })

  it('should compute hours', function () {
    var date1 = new Date()
    var date2 = new Date(date1.getTime())
    date2.setTime(date2.getTime() + ms.hours)
    expect(howLong(date1, date2)).to.eql({
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 1,
      minutes: 0,
      seconds: 0,
      milliseconds: 0
    })
  })

  it('should compute minutes', function () {
    var date1 = new Date()
    var date2 = new Date(date1.getTime())
    date2.setTime(date2.getTime() + ms.minutes)
    expect(howLong(date1, date2)).to.eql({
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 1,
      seconds: 0,
      milliseconds: 0
    })
  })

  it('should compute seconds', function () {
    var date1 = new Date()
    var date2 = new Date(date1.getTime())
    date2.setTime(date2.getTime() + ms.seconds)
    expect(howLong(date1, date2)).to.eql({
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 1,
      milliseconds: 0
    })
  })

  it('should compute milliseconds', function () {
    var date1 = new Date()
    var date2 = new Date(date1.getTime())
    date2.setTime(date2.getTime() + ms.milliseconds)
    expect(howLong(date1, date2)).to.eql({
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 1
    })
  })

  it('should respect options', function () {
    var date1 = new Date()
    var date2 = new Date(date1.getTime() + 61001)
    expect(howLong(date1, date2, 'seconds')).to.eql({
      seconds: 61
    })
    expect(howLong(date1, date2, ['seconds', 'minutes'])).to.eql({
      seconds: 1,
      minutes: 1
    })
    expect(howLong(date1, date2, ['seconds', 'minutes', 'milliseconds'])).to.eql({
      seconds: 1,
      minutes: 1,
      milliseconds: 1
    })
    date2 = new Date(date1.getTime() + ms.days)
    expect(howLong(date1, date2, ['hours'])).to.eql({
      hours: 24
    })
    expect(howLong(date1, date2, ['days', 'hours'])).to.eql({
      days: 1,
      hours: 0
    })
    date2 = new Date(date1.getTime() + ms.weeks)
    expect(howLong(date1, date2, ['days'])).to.eql({
      days: 7
    })
    expect(howLong(date1, date2, ['weeks', 'days'])).to.eql({
      weeks: 1,
      days: 0
    })
  })
})
