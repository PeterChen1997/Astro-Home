export const isServerSide = () => typeof window === 'undefined'
export const isClientSide = () => typeof window !== 'undefined'
