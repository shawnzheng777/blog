import {
  makeAutoObservable,
  runInAction,
  computed,
  observable,
  action,
} from "mobx";

export class AuthStore {
  @observable
  userInfo: any = null;

  @computed
  get isLogin() {
    return !!this.userInfo;
  }

  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      }
    );
  }

  @action
  async loadLogin(token: string | null) {
    if (token) {
      runInAction(() => {
        this.userInfo = {};
      });
    }
  }
}
