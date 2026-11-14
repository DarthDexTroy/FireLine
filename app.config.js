// Extends app.json. EXPO_BASE_URL lets the web build live under a sub-path,
// e.g. EXPO_BASE_URL=/FireLine for https://<user>.github.io/FireLine/.
module.exports = ({ config }) => ({
  ...config,
  experiments: {
    ...config.experiments,
    baseUrl: process.env.EXPO_BASE_URL || "",
  },
});
