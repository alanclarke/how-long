var ms = {}
ms.milliseconds = 1
ms.seconds = 1000
ms.minutes = ms.seconds * 60
ms.hours = ms.minutes * 60
ms.days = ms.hours * 24
ms.weeks = ms.days * 7
var allUnits = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds', 'milliseconds']

module.exports = function howLong (date1, date2, selected) {
  var results = {}
  var next = new Date(Math.max(date1, date2))
  var prev = new Date(Math.min(date1, date2))
  var current = new Date(prev.getTime())
  var units = allUnits

  if (selected) {
    units = allUnits.filter(function (u) {
      return selected.indexOf(u) > -1
    })
  }

  for (var i = 0, unit = units[i]; i < units.length; i++, unit = units[i]) {
    switch (unit) {
      case 'years':
        results.years = 0
        while (current.getFullYear() < next.getFullYear()) {
          results.years++
          current.setFullYear(current.getFullYear() + 1)
        }
        break
      case 'months':
        results.months = 0
        while (current.getMonth() < next.getMonth()) {
          results.months++
          current.setMonth(current.getMonth() + 1)
        }
        break
      default:
        var diff = next.getTime() - current.getTime()
        results[unit] = Math.floor(diff / ms[unit])
        var addons = ms[unit] * results[unit]
        current.setTime(current.getTime() + addons)
        break
    }
  }

  return results
}
