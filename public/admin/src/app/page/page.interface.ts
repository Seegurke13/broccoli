import {PageExtraInterface} from "./page-extra.interface";
import {PageBlockInterface} from "./page-block.interface";

export interface PageInterface {
  id: number;
  name: string;
  isDynamic: boolean;
  provider?: string;
  url?: string;
  template: string;
  extra: PageExtraInterface[];
  content?: PageBlockInterface[];
}
