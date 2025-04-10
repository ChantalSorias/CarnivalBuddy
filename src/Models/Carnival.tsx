export type Carnival = {
    id: string,
    title: string,
    description: string,
    location: string,
    paradeDates: string[],
    image: string,
    liked: boolean,
    links: Link[],
}

type Link = {
    name: string,
    url: string,
}