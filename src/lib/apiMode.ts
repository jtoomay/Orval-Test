// Single source of truth for "are we using MSW mocks?".
// Controlled by VITE_USE_MOCKS in .env; mocks never run in production builds.
export const mocksEnabled = import.meta.env.DEV && import.meta.env.VITE_USE_MOCKS === 'true'
