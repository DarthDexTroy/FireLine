import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByText("Your next steps").filter({ visible: true }),
  ).toBeVisible();
});
test("review wildfire updates and refresh", async ({ page }) => {
  await page
    .getByRole("button", { name: "Live Updates: View Updates", exact: true })
    .click();
  await expect(page.getByText("Wildfire Activity Increasing")).toBeVisible();
  await page
    .getByRole("button", { name: "Refresh Updates", exact: true })
    .click();
  await expect(page.getByText(/Refreshed at/)).toBeVisible();
  await page
    .getByRole("button", { name: "View Details", exact: true })
    .first()
    .click();
  await expect(page.getByText("Recommended action")).toBeVisible();
  await page
    .getByRole("button", { name: "Back to Updates", exact: true })
    .click();
  await page.getByRole("tab", { name: "Home", exact: true }).click();
  await expect(
    page.getByText("Your next steps").filter({ visible: true }),
  ).toBeVisible();
});
test("explore interactive map", async ({ page }) => {
  await page
    .getByRole("button", { name: "Wildfire Nearby: View Map", exact: true })
    .click();
  await page.getByRole("button", { name: "View Map", exact: true }).click();
  await page.getByRole("button", { name: "Zoom in", exact: true }).click();
  await expect(page.getByText("100%", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Pan east", exact: true }).click();
  await page.getByRole("button", { name: "Recenter map", exact: true }).click();
  const map = page.getByTestId("interactive-map");
  const box = await map.boundingBox();
  if (box) {
    await page.mouse.move(box.x + 100, box.y + 200);
    await page.mouse.down();
    await page.mouse.move(box.x + 140, box.y + 225, { steps: 8 });
    await page.mouse.up();
  }
  await page.getByRole("button", { name: "Recenter map", exact: true }).click();
  await page
    .getByRole("button", {
      name: "Map marker: Oak Valley Wildfire",
      exact: true,
    })
    .click();
  await expect(page.getByText(/Evacuation level: Warning/)).toBeVisible();
  await page.getByRole("button", { name: "View Alert", exact: true }).click();
  await expect(page.getByText("Recommended action")).toBeVisible();
});
test("prepare, filter, select shelter, save and reload", async ({ page }) => {
  await page.getByRole("tab", { name: "Prepare", exact: true }).click();
  await page
    .getByRole("button", { name: "Start Preparing", exact: true })
    .click();
  await page
    .getByRole("checkbox", { name: "Identification cards", exact: true })
    .check();
  await page
    .getByRole("checkbox", { name: "Insurance documents", exact: true })
    .check();
  await expect(
    page.getByRole("checkbox", { name: "Identification cards", exact: true }),
  ).toBeChecked();
  await page.getByRole("tab", { name: "Essential Items", exact: true }).click();
  await page.getByRole("checkbox", { name: "Water", exact: true }).check();
  await page.getByRole("checkbox", { name: "Food", exact: true }).check();
  await page
    .getByRole("button", { name: "Continue to Pets", exact: true })
    .click();
  await page.getByRole("checkbox", { name: "Pet food", exact: true }).check();
  await page
    .getByRole("button", { name: "Continue to Next Steps", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Find Nearby Shelters", exact: true })
    .click();
  await page.getByRole("button", { name: "Pet Friendly", exact: true }).click();
  await expect(page.getByText("Oak Valley Community Center")).toHaveCount(0);
  await page.getByRole("button", { name: "Available", exact: true }).click();
  await page.getByRole("button", { name: "Closest", exact: true }).click();
  await page
    .getByRole("button", { name: "View Details", exact: true })
    .first()
    .click();
  await page
    .getByRole("button", { name: "View Directions", exact: true })
    .click();
  await expect(
    page.getByText("Simulated route for demonstration only."),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Save Selected Shelter", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Save Evacuation Plan", exact: true })
    .click();
  await expect(
    page.getByText("Evacuation plan saved successfully."),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByText("Oak Valley High School", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText(/5 of 14 items packed/).filter({ visible: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Return Home", exact: true }).click();
  await expect(
    page.getByText(/5 of 14 items packed/).filter({ visible: true }),
  ).toBeVisible();
});
test("notifications, preferences, location and reset", async ({ page }) => {
  await page
    .getByRole("button", { name: "Open notifications", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Mark All as Read", exact: true })
    .click();
  await expect(page.getByText("● Unread", { exact: true })).toHaveCount(0);
  await page
    .getByRole("button", { name: "Clear All Notifications", exact: true })
    .click();
  await expect(page.getByText("You’re all caught up")).toBeVisible();
  await page.getByRole("tab", { name: "Home", exact: true }).click();
  await page
    .getByRole("button", { name: "Open settings", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Change Saved Location", exact: true })
    .click();
  await page
    .getByRole("radio", { name: "Pine Hollow, California", exact: true })
    .click();
  await page.reload();
  await expect(
    page.getByRole("radio", { name: "Pine Hollow, California", exact: true }),
  ).toBeChecked();
  await page.getByRole("tab", { name: "Home", exact: true }).click();
  await page
    .getByRole("button", { name: "Open settings", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Notification Preferences", exact: true })
    .click();
  await page
    .getByRole("switch", { name: "Road Closures", exact: true })
    .uncheck();
  await page.reload();
  await expect(
    page.getByRole("switch", { name: "Road Closures", exact: true }),
  ).not.toBeChecked();
  await page.getByRole("tab", { name: "Home", exact: true }).click();
  await page
    .getByRole("button", { name: "Open settings", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Reset Demo Data", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Confirm Reset", exact: true })
    .click();
  await expect(page.getByText("Demo data has been reset.")).toBeVisible();
  await page.getByRole("tab", { name: "Home", exact: true }).click();
  await expect(
    page
      .getByText("Oak Valley, California", { exact: true })
      .filter({ visible: true }),
  ).toBeVisible();
});
test("invalid routes have recovery paths", async ({ page }) => {
  await page.goto("/updates/missing");
  await expect(page.getByText("Alert not found")).toBeVisible();
  await page.goto("/prepare/shelter-details?id=missing");
  await expect(page.getByText("Shelter not found")).toBeVisible();
  await page.goto("/prepare/directions?id=missing");
  await expect(page.getByText("Choose a destination")).toBeVisible();
});
