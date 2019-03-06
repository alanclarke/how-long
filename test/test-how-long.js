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

  it('should count years', function () {
    var date1 = new Date()
    for (var i = 0; i < 100; i++) {
      var date2 = new Date(date1.getTime())
      date2.setFullYear(date1.getFullYear() + i)
      expect(howLong(date1, date2, ['years'])).to.eql({
        years: i
      })
    }
  })

  it('should count months', function () {
    var date1 = new Date()
    for (var i = 0; i < 100; i++) {
      var date2 = new Date(date1.getTime())
      date2.setMonth(date1.getMonth() + i)
      expect(howLong(date1, date2, ['months'])).to.eql({
        months: i
      })
    }
  })

  it('should count weeks', function () {
    var date1 = new Date()
    for (var i = 0; i < 100; i++) {
      var date2 = new Date(date1.getTime() + (ms.weeks * i))
      expect(howLong(date1, date2, ['weeks'])).to.eql({
        weeks: i
      })
    }
  })

  it('should count days', function () {
    var date1 = new Date()
    for (var i = 0; i < 100; i++) {
      var date2 = new Date(date1.getTime() + (ms.days * i))
      expect(howLong(date1, date2, ['days'])).to.eql({
        days: i
      })
    }
  })

  it('should count hours', function () {
    var date1 = new Date()
    for (var i = 0; i < 100; i++) {
      var date2 = new Date(date1.getTime() + (ms.hours * i))
      expect(howLong(date1, date2, ['hours'])).to.eql({
        hours: i
      })
    }
  })

  it('should count minutes', function () {
    var date1 = new Date()
    for (var i = 0; i < 100; i++) {
      var date2 = new Date(date1.getTime() + (ms.minutes * i))
      expect(howLong(date1, date2, ['minutes'])).to.eql({
        minutes: i
      })
    }
  })

  it('should count seconds', function () {
    var date1 = new Date()
    for (var i = 0; i < 100; i++) {
      var date2 = new Date(date1.getTime() + (ms.seconds * i))
      expect(howLong(date1, date2, ['seconds'])).to.eql({
        seconds: i
      })
    }
  })

  it('should count milliseconds', function () {
    var date1 = new Date()
    for (var i = 0; i < ms.weeks; i += ms.hours) {
      var date2 = new Date(date1.getTime() + i)
      expect(howLong(date1, date2, ['milliseconds'])).to.eql({
        milliseconds: i
      })
    }
  })

  it('should count all the things', function () {
    var date1 = new Date(0)
    var date2 = new Date(date1.getTime())
    date2.setFullYear(date1.getFullYear() + 1)
    date2.setMonth(date1.getMonth() + 1)
    for (var unit in ms) date2.setTime(date2.getTime() + ms[unit])
    expect(howLong(date1, date2)).to.eql({
      days: 1,
      hours: 1,
      milliseconds: 1,
      minutes: 1,
      months: 1,
      seconds: 1,
      weeks: 1,
      years: 1
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

    expect(howLong(new Date(2017, 11, 10), new Date(2018, 2, 1), ['months', 'weeks', 'days'])).to.eql({
      months: 2,
      weeks: 2,
      days: 5
    })

    expect(howLong(new Date(2017, 11, 1), new Date(2019, 10, 1), ['years', 'months'])).to.eql({
      years: 1,
      months: 11
    })
  })
})
