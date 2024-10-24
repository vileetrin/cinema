import FilmsStore from "../domains/films/store/FilmsStore.ts";

class RootStore {
    filmsStore: FilmsStore;

    constructor() {
        this.filmsStore = new FilmsStore();
    }
}

export default RootStore;