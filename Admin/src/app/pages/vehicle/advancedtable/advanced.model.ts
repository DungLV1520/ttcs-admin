// Table data
export interface Vehicle {
    name: string;
    position: string;
    office: string;
    age: number;
    date: string;
    salary: string;
}

// Search Data
export interface SearchResult {
    tables: Vehicle[];
    total: number;
}
