export const enum INDEXES {
  ALL = "all",
  PE = "pe",
  PD = "pd",
}
export const NAME_RESERVER_OF_INDEXES = [INDEXES.ALL, INDEXES.PE, INDEXES.PD];

export const addPrefixSLtoIndex = (names: string[], currentName: string) => {
  return names.includes(currentName) ? `SL ${currentName}` : currentName;
};
