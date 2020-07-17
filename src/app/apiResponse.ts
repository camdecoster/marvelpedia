export interface ApiResponse {
    code: number;
    status: string;
    data: {
        total: number;
        results: object[];
    };
}
