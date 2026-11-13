import {
  alerts,
  checklist,
  locations,
  shelters,
  type Preference,
} from "../data/demo";
export const STORAGE_KEY = "fireline-demo-v3";
export interface SavedPlan {
  shelterId: string;
  completed: string[];
  from: string;
  route: string;
  editedAt: string;
}
export interface DemoState {
  version: 1;
  completed: string[];
  shelterId: string | null;
  location: string;
  preferences: Record<Preference, boolean>;
  read: string[];
  cleared: string[];
  plan: SavedPlan | null;
}
export function initialState(): DemoState {
  return {
    version: 1,
    completed: [],
    shelterId: null,
    location: locations[0],
    preferences: {
      critical: true,
      wildfire: true,
      evacuation: true,
      roads: true,
    },
    read: [],
    cleared: [],
    plan: null,
  };
}
export type Action =
  | { type: "toggle"; id: string }
  | { type: "shelter"; id: string }
  | { type: "location"; location: string }
  | { type: "preference"; key: Preference; value: boolean }
  | { type: "read"; ids: string[] }
  | { type: "clear"; ids: string[] }
  | { type: "save"; time: string }
  | { type: "unsave" }
  | { type: "reset" }
  | { type: "hydrate"; state: DemoState };
export function reducer(state: DemoState, action: Action): DemoState {
  switch (action.type) {
    case "hydrate":
      return action.state;
    case "reset":
      return initialState();
    case "toggle":
      return checklist.some((i) => i.id === action.id)
        ? {
            ...state,
            completed: state.completed.includes(action.id)
              ? state.completed.filter((id) => id !== action.id)
              : [...state.completed, action.id],
          }
        : state;
    case "shelter":
      return shelters.some((s) => s.id === action.id && s.available)
        ? { ...state, shelterId: action.id }
        : state;
    case "location":
      return locations.includes(action.location as (typeof locations)[number])
        ? { ...state, location: action.location }
        : state;
    case "preference":
      return {
        ...state,
        preferences: { ...state.preferences, [action.key]: action.value },
      };
    case "read":
      return { ...state, read: [...new Set([...state.read, ...action.ids])] };
    case "clear":
      return {
        ...state,
        cleared: [...new Set([...state.cleared, ...action.ids])],
      };
    case "save": {
      const shelter = shelters.find(
        (s) => s.id === state.shelterId && s.available,
      );
      return shelter
        ? {
            ...state,
            plan: {
              shelterId: shelter.id,
              completed: [...state.completed],
              from: state.location,
              route: `Home → ${shelter.name}`,
              editedAt: action.time,
            },
          }
        : state;
    }
    case "unsave":
      return { ...state, plan: null };
  }
}
export function restoreState(raw: string): DemoState {
  const value: unknown = JSON.parse(raw);
  if (
    !value ||
    typeof value !== "object" ||
    !("version" in value) ||
    value.version !== 1
  )
    throw new Error("Unsupported saved data");
  const v = value as Partial<DemoState>;
  const base = initialState();
  const ids = (data: unknown, valid: string[]): string[] =>
    Array.isArray(data)
      ? [
          ...new Set(
            data.filter(
              (id): id is string =>
                typeof id === "string" && valid.includes(id),
            ),
          ),
        ]
      : [];
  const completed = ids(
    v.completed,
    checklist.map((i) => i.id),
  );
  const shelterId = shelters.some((s) => s.id === v.shelterId && s.available)
    ? v.shelterId!
    : null;
  const location = locations.includes(v.location as (typeof locations)[number])
    ? v.location!
    : base.location;
  const preferences = { ...base.preferences };
  for (const key of Object.keys(preferences) as Preference[])
    if (typeof v.preferences?.[key] === "boolean")
      preferences[key] = v.preferences[key];
  const p = v.plan;
  const plan =
    p &&
    shelters.some((s) => s.id === p.shelterId && s.available) &&
    typeof p.editedAt === "string" &&
    Number.isFinite(Date.parse(p.editedAt)) &&
    typeof p.route === "string" &&
    typeof p.from === "string"
      ? {
          ...p,
          completed: ids(
            p.completed,
            checklist.map((i) => i.id),
          ),
        }
      : null;
  return {
    ...base,
    completed,
    shelterId,
    location,
    preferences,
    read: ids(
      v.read,
      alerts.map((a) => a.id),
    ),
    cleared: ids(
      v.cleared,
      alerts.map((a) => a.id),
    ),
    plan,
  };
}
export function visibleNotifications(state: DemoState) {
  return alerts.filter(
    (a) =>
      !state.cleared.includes(a.id) &&
      state.preferences[a.preference] &&
      (a.severity !== "critical" || state.preferences.critical),
  );
}
export function filterShelters(
  pet: boolean,
  available: boolean,
  closest: boolean,
) {
  const result = shelters.filter(
    (s) => (!pet || s.petFriendly) && (!available || s.available),
  );
  return closest
    ? result.sort((a, b) => a.distanceMiles - b.distanceMiles)
    : result;
}
