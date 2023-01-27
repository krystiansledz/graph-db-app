export const AppRoutes = {
  Base: () => `/`,
  Movies: () => `/movies`,
  Movie: (id = "") => `/movie/${id ? id : ":id"}`,
  Persons: () => "/persons",
  Person: (id = "") => `/person/${id ? id : ":id"}`,
};
