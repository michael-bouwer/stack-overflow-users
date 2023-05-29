export const URL_getUsers = 'https://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow'

export const withinTTL = (date: Date) => {
  const diff = Math.abs(new Date().getTime() - date.getTime())
  const fiveMinutesToMilliseconds = 5 * 60 * 1000
  console.log('Older than 5 minutes?', diff > fiveMinutesToMilliseconds, diff)
  return diff < fiveMinutesToMilliseconds
}
