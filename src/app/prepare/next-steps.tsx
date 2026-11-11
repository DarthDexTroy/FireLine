import React from "react";
import { Redirect } from "expo-router";

// Existing links to this legacy page now go straight to the relevant action.
export default function NextSteps() {
  return <Redirect href="/prepare/shelters" />;
}
