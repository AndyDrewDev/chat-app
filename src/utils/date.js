export const formatDateTime = (
  date,
  locale = 'en-US',
  message = 'Sending...'
) => {
  if (!date) return message
  return date.toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: 'numeric',
    seconds: 'numeric',
    hour12: true,
  })
}
