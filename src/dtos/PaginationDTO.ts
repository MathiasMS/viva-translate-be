export interface IPaginationDTO {
    items: any[];
    totalRows: string | number;
    page: string | number;
    limit: string | number;
}

export class PaginationDTO {
    public items: any[];

    public totalRows: string | number;

    public totalPages: string | number;

    public currentPage: string | number;

    public nextPage: string | number;

    public previousPage: string | number;

    constructor(
        paginationDTO: IPaginationDTO = {
            items: [],
            totalRows: 0,
            page: 1,
            limit: 10,
        }
    ) {
        const currentPage = Number(paginationDTO.page);
        const rows = Number(paginationDTO.totalRows);

        this.items = paginationDTO.items;
        this.totalRows = rows;
        this.currentPage = currentPage;
        this.nextPage = currentPage + 1;
        this.previousPage = currentPage === 1 ? currentPage : currentPage - 1;
        this.totalPages = Math.ceil(rows / Number(paginationDTO.limit));
    }
}
