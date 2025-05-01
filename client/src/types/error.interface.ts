export interface ApiError {
    message: string;
    status?: string | number;
    details?: { field: string; message: string }[];
}
