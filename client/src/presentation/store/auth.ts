import { makeAutoObservable, runInAction, computed, observable, action } from 'mobx';
import { apiGet } from '@/infrastructure/axios';

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

  loginOut() {
    localStorage.removeItem('token');
    this.userInfo = null;
  }

  @action
  async loadLogin(token: string | null) {
    if (token) {
      const userInfo = await apiGet('auth/user');

      runInAction(() => {
        this.userInfo = userInfo;
      });
    }
  }
}
