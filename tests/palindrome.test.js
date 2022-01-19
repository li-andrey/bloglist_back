// const palindrome = require('../utils/list_helper').palindrome
const list_helper = require('../utils/list_helper')

test('palindrome of a', () => {
  const result = list_helper.palindrome('a')

  expect(result).toBe('a')
})

test('palindrome of react', () => {
  const result = list_helper.palindrome('react')

  expect(result).toBe('tcaer')
})

test('palindrome of releveler', () => {
  const result = list_helper.palindrome('releveler')

  expect(result).toBe('releveler')
})