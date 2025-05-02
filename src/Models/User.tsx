export interface User {
    id: string,
    googleId: string,
    image: string,
    username: string,
    email: string,
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