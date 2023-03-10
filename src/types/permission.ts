export interface Routes {
  path: string;
  name?: string;
  component: string;
  redirect?: string;
  alwaysShow?: boolean;
  hidden?: boolean;
  children?: Array<RoutesChild>;
  meta?: Meta;
  noShowingChildren: boolean;
}

export interface RoutesChild {
  path: string;
  component: string;
  hidden?: boolean;
  name?: string;
  meta?: Meta;
}

export interface Meta {
  title: string;
  icon: string;
  affix?: boolean;
  roles?: string[];
}