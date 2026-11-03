import test from "node:test";
import assert from "node:assert/strict";
import {
  initialState,
  reducer,
  restoreState,
  visibleNotifications,
  filterShelters,
} from "../src/lib/state";
import { checklist } from "../src/data/demo";
test("multiple checkboxes remain independent and toggle off independently", () => {
  let state = initialState();
  for (const id of ["water", "food", "identification"])
    state = reducer(state, { type: "toggle", id });
  assert.equal(state.completed.length, 3);
  state = reducer(state, { type: "toggle", id: "food" });
  assert.deepEqual(state.completed, ["water", "identification"]);
});
test("full checklist has 14 independently completable items", () => {
  let state = initialState();
  for (const item of checklist)
    state = reducer(state, { type: "toggle", id: item.id });
  assert.equal(state.completed.length, 14);
});
test("plan snapshots checklist, shelter, route and edit time; hydration retains them", () => {
  let state = reducer(initialState(), { type: "toggle", id: "water" });
  state = reducer(state, { type: "shelter", id: "school" });
  state = reducer(state, { type: "save", time: "2026-10-28T01:00:00Z" });
  const restored = restoreState(JSON.stringify(state));
  assert.deepEqual(restored, state);
  assert.equal(restored.plan?.shelterId, "school");
  assert.match(restored.plan!.route, /Oak Valley High School/);
  const edited = reducer(state, { type: "toggle", id: "food" });
  assert.deepEqual(edited.plan?.completed, ["water"]);
});
test("invalid and unavailable shelters cannot become destinations", () => {
  for (const id of ["missing", "library"])
    assert.equal(
      reducer(initialState(), { type: "shelter", id }).shelterId,
      null,
    );
  assert.equal(
    reducer(initialState(), { type: "save", time: new Date().toISOString() })
      .plan,
    null,
  );
});
test("filters combine and sort without changing source data", () => {
  const result = filterShelters(true, true, true);
  assert.equal(result.length, 2);
  assert.ok(result.every((s) => s.petFriendly && s.available));
  assert.ok(result[0].distanceMiles < result[1].distanceMiles);
  assert.equal(filterShelters(false, true, false).length, 3);
  assert.equal(filterShelters(false, false, false).length, 4);
});
test("notification preferences, read and clear state persist", () => {
  let state = initialState();
  state = reducer(state, { type: "preference", key: "critical", value: false });
  assert.ok(
    !visibleNotifications(state).some((a) => a.severity === "critical"),
  );
  state = reducer(state, { type: "read", ids: ["road"] });
  state = reducer(state, { type: "clear", ids: ["road"] });
  assert.ok(!visibleNotifications(state).some((a) => a.id === "road"));
  assert.deepEqual(restoreState(JSON.stringify(state)), state);
});
test("reset restores all demo data", () => {
  let state = reducer(initialState(), { type: "toggle", id: "water" });
  state = reducer(state, {
    type: "location",
    location: "Pine Hollow, California",
  });
  assert.deepEqual(reducer(state, { type: "reset" }), initialState());
});
test("corrupt storage is rejected or sanitized", () => {
  assert.throws(() => restoreState("{"));
  assert.throws(() => restoreState('{"version":2}'));
  const state = restoreState(
    JSON.stringify({
      version: 1,
      completed: ["water", "water", null, "nope"],
      shelterId: "bad",
      preferences: { critical: "no" },
      plan: { shelterId: "school", editedAt: "bad" },
    }),
  );
  assert.deepEqual(state.completed, ["water"]);
  assert.equal(state.shelterId, null);
  assert.equal(state.plan, null);
  assert.equal(state.preferences.critical, true);
});
