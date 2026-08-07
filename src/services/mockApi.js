export function simulateAsync(data, delayMs = 250) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, delayMs)
  })
}
