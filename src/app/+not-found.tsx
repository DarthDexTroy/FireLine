import React from "react";
import { Screen, Empty } from "../components/UI";
export default function NotFound() {
  return (
    <Screen title="Let’s get you back">
      <Empty
        title="Page not found"
        detail="This page isn’t part of Fireline. Return home to continue."
      />
    </Screen>
  );
}
