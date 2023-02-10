import { AuthStore } from "@/presentation/store/auth";
import React from "react";

function CreateStore() {
  return {
    AuthStore: new AuthStore(),
  };
}

const stores = CreateStore();
const StoresContext = React.createContext(stores);
const useStores = () => React.useContext(StoresContext);

export { stores, StoresContext, useStores };
