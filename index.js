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
      // Years don't have a fixed number of milliseconds, so we need to iterate
      case 'years':
        results.years = 0
        while (current.getFullYear() < next.getFullYear()) {
          current.setFullYear(current.getFullYear() + 1)
          results.years++
        }
        // If there is less than a full year difference, we will have gone over
        if (current.getTime() > next.getTime()) {
          current.setFullYear(current.getFullYear() - 1)
          results.years--
        }
        break
      // Months don't have a fixed number of milliseconds, so we need to iterate
      case 'months':
        results.months = 0
        while (current.getFullYear() < next.getFullYear() || current.getMonth() < next.getMonth()) {
          results.months++
          current.setMonth(current.getMonth() + 1)
        }
        // If there is less than a full month difference, we will have gone over
        if (current.getTime() > next.getTime()) {
          current.setMonth(current.getMonth() - 1)
          results.months--
        }
        break
      default:
        var diff = next.getTime() - current.getTime()
        results[unit] = Math.floor(diff / ms[unit])
        var remainder = ms[unit] * results[unit]
        current.setTime(current.getTime() + remainder)
        break
    }
  }

  return results
}
