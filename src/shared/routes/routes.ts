export const ROUTE_PATHS = {
  INDEX: {
    BASE: "/funds",
    STRATEDY_DATA: "/funds/strategy-data",
    PERFORMANCE: "/funds/performance",
    TERMS: "/funds/terms",
  },

  FUND_BY_ID: {
    PATH: "/funds",
    BASE: (id: string, shareId: string) => `/funds/${id}/${shareId}`,
    PERFORMANCE: (id: string, shareId: string) =>
      `/funds/${id}/${shareId}/performance`,
    PORTFOLIO: (id: string, shareId: string) =>
      `/funds/${id}/${shareId}/portfolio`,
    TERMS: (id: string, shareId: string) => `/funds/${id}/${shareId}/terms`,
    DOCUMENTS: (id: string, shareId: string) =>
      `/funds/${id}/${shareId}/documents`,
  },

  FIRM_BY_ID: {
    PATH: "/firms",
    BASE: (id: string) => `/firms/${id}`,

    FILTERS: {
      BASE: (id: string) => `/firms/${id}`,
      STRATEDY_DATA: (id: string) => `/firms/${id}/strategy-data`,
      PERFORMANCE: (id: string) => `/firms/${id}/performance`,
      TERMS: (id: string) => `/firms/${id}/terms`,
    },
  },

  AUTH: {
    PATH: "/auth",
    LOGIN: "/auth/login",
    REGISTER: "/auth/sign-up",
    REGISTER_COMPANY: "/auth/sign-up/company-step",
    RESET_PASSWORD: "/auth/reset-password",
    SET_PASSWORD: "/auth/set-password",
    INTEGRATION: {
      LINKEDIN: "/auth/integration/linkedin",
    },
  },

  PROFILE: {
    BASE: "/settings",
    COMPANY_INFO: "/settings/company-info",
    CHANGE_PASSWORD: "/settings/password",
    REMOVE_ACCOUNT: "/settings/danger-zone",
  },

  BLOG: {
    BASE: "/insights",
    ARTICLE_BY_ID: (id: string) => `${ROUTE_PATHS.BLOG.BASE}/${id}`,
  },

  FAQ: {
    BASE: "/faq",
  },

  FAVORITES: {
    BASE: "/favorites",
  },

  COMPARE: {
    BASE: "/comparison",
  },

  PAGES: {
    DISCLAIMERS: "/disclaimers",
    PRIVACY: "/privacy-policy",
    TERMS_OF_USE: "/terms-of-use",
  },
};
