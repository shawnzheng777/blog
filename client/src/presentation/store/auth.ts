import { makeAutoObservable, runInAction, computed, observable, action } from 'mobx';
import HttpClient from '@/infrastructure/service/request';

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
      const userInfo = await HttpClient.Get('auth/user');

      runInAction(() => {
        this.userInfo = userInfo;
      });
    }
  }
}
