export interface Character {
    id: number;
    name: string;
    description: string;
    urls: Array<any>;
    thumbnail: {
        path: string;
        extension: string;
    };
    favorite?: boolean;
    // Consider adding URL to Marvel wiki
}
