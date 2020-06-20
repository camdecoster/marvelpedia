export interface Creator {
    id: number;
    fullName: string;
    urls: Array<any>;
    thumbnail: {
        path: string;
        extension: string;
    };
    favorite?: boolean;
}
