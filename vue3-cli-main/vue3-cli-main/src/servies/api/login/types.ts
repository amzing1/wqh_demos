export interface ILoginParams {
  userName: string;
  password: string | number;
}

export interface ILoginApi {
  login: (params: ILoginParams) => Promise<any>;
}
