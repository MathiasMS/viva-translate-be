export const paginationLimit = (page: any, limit: any): Array<number> => {
    const pageRequested = Number(page) || 0;
    const limitRequested = Number(limit) || 10;

    return [pageRequested, limitRequested];
};
