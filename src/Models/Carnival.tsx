import { Dayjs } from "dayjs"

export type Carnival = {
    id?: string,
    title: string,
    description: string,
    location: string,
    paradeDates: Dayjs[],
    image: string,
    liked?: boolean,
    links: Link[],
}

export type Link = {
    name: string,
    url: string,
}