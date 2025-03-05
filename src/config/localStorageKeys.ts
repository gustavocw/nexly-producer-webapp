export const localStorageKeys = {
  ACCESS_TOKEN: 'auti:accessToken',
  PLAN: 'plan:plandefault',
}

  export const planProducer = localStorage.getItem(localStorageKeys.PLAN);