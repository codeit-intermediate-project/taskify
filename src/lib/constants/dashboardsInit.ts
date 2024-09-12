export const INIT_MYDASHBOARDS_CONTEXT = {
  fetchedDashboards: [],
  localDashboards: [],
  loading: true,
  error: null,
  addDashboard: () => {},
  fetchDashboards: async () => {},
};

export const INIT_DASHBOARDS_REQUEST = {
  navigationMethod: 'pagination',
  page: 1,
  size: 100,
};

export const INIT_DASHBOARDS_RESPONSE = {
  dashboards: [],
  totalCount: 0,
  cursorId: null,
};
