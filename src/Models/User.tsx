export interface User {
    image: File | null,
    username: string,
    location: string,
    background: string[],
    favouriteSong: Song,
    favouriteCarnivalDesination: string,
    bio: string,
    profileImages: string[],
}

interface Song {
    name: string,
    artist: string,
}