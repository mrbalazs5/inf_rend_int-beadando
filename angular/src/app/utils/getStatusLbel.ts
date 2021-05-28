export enum Status {
    FREE = 0,
    RENTED
  }

export const statusLabelMap: {[key: string]: string} = {
    [Status.FREE]: "Free",
    [Status.RENTED]: "Rented"
  }

const getStatusLabel = (status: number | null | undefined) => statusLabelMap[status as number];

export default getStatusLabel;