import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

const SESSION_KEY = 'waldron-lab-admin-session'

function readStored(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

function adminPassword(): string {
  return import.meta.env.VITE_ADMIN_PASSWORD ?? 'waldron-lab-admin'
}

type AdminAuthContextValue = {
  isAuthenticated: boolean
  login: (password: string) => boolean
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setAuth] = useState(readStored)

  const login = useCallback((password: string) => {
    if (password === adminPassword()) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setAuth(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY)
    setAuth(false)
  }, [])

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout]
  )

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth outside AdminAuthProvider')
  return ctx
}
