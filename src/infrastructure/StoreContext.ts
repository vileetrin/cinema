import { createContext, useContext } from 'react';
import RootStore from './RootStore.ts';

const storeContext = createContext(new RootStore());

export const useStore = (): RootStore => useContext(storeContext);
