import { IStatistic } from "../types/dashboard";

export function getTotalItems(list: IStatistic | undefined): number | '' {
  if (list) {
    return list.active + list.completed + list.inactive
  }
  return '';
}