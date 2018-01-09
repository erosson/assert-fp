function _slice(args, head, first) {
  // arguments is not an array, no arguments.slice(). slice manually.
  var ret = []
  if (first) ret.push(args[0])
  for (var i=head; i < args.length; i++) {
    ret.push(args[i])
  }
  return ret
}
function _throws(message, tail) {
  throw new Error(message + (tail && tail.length ? '\n' + JSON.stringify(tail, null, 2) : ''))
}
function assert() {
  return arguments[0] ? arguments[0] : _throws(arguments[1], _slice(arguments, 2))
}
module.exports = assert
assert.ok = assert
assert.assert = assert
assert.throws = function throws() {
  return _throws(arguments[0], _slice(arguments, 1))
}
assert.create = function assertCreate(predicate, message) {
  return function assertPredicate() {
    return predicate(arguments[0]) ? arguments[0] : _throws(message || arguments[1], _slice(arguments, message ? 1 : 2, true))
  }
}
assert.isDefined = assert.create(function(val) {
  return val != null
})
assert.isNumber = assert.create(function(val) {
  return typeof(arguments[0]) === 'number' && !Number.isNaN(arguments[0])
})
