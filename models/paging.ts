export interface Paging<T> {
    total: number;
    per_page: number;
    items: T[];
}