import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Text, View } from "react-native";
import {
  initialState,
  reducer,
  restoreState,
  STORAGE_KEY,
  type Action,
  type DemoState,
} from "../lib/state";
const Context = createContext<{
  state: DemoState;
  dispatch: React.Dispatch<Action>;
  storageError: string | null;
  persist: (state: DemoState) => Promise<boolean>;
} | null>(null);
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const [ready, setReady] = useState(false);
  const [storageError, setError] = useState<string | null>(null);
  const queue = useRef<Promise<boolean>>(Promise.resolve(true));
  const persist = React.useCallback((next: DemoState) => {
    queue.current = queue.current.then(async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setError(null);
        return true;
      } catch {
        setError(
          "Your changes are available this session, but could not be saved on this device. Try saving again.",
        );
        return false;
      }
    });
    return queue.current;
  }, []);
  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw && active)
          dispatch({ type: "hydrate", state: restoreState(raw) });
      })
      .catch(() => {
        if (active)
          setError(
            "Saved data could not be loaded. You can continue with a fresh demo.",
          );
      })
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);
  const first = useRef(true);
  useEffect(() => {
    if (!ready) return;
    if (first.current) {
      first.current = false;
      return;
    }
    void persist(state);
  }, [state, ready, persist]);
  if (!ready)
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <ActivityIndicator color="#2E6657" />
        <Text>Opening Fireline…</Text>
      </View>
    );
  return (
    <Context.Provider value={{ state, dispatch, storageError, persist }}>
      {children}
    </Context.Provider>
  );
}
export function useApp() {
  const value = useContext(Context);
  if (!value) throw new Error("AppProvider missing");
  return value;
}
