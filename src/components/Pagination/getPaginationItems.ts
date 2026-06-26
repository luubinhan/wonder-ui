export type PaginationItem =
  | { type: 'page'; page: number }
  | { type: 'ellipsis'; key: 'start' | 'end' };

export function getPaginationItems(
  page: number,
  totalPages: number,
  siblingCount = 1,
  boundaryCount = 1,
): PaginationItem[] {
  if (totalPages <= 0) {
    return [];
  }

  if (totalPages === 1) {
    return [{ type: 'page', page: 1 }];
  }

  const pages = new Set<number>();

  for (let i = 1; i <= Math.min(boundaryCount, totalPages); i += 1) {
    pages.add(i);
  }

  for (let i = Math.max(1, totalPages - boundaryCount + 1); i <= totalPages; i += 1) {
    pages.add(i);
  }

  const clampedPage = Math.min(Math.max(page, 1), totalPages);
  for (let i = clampedPage - siblingCount; i <= clampedPage + siblingCount; i += 1) {
    if (i >= 1 && i <= totalPages) {
      pages.add(i);
    }
  }

  const sorted = Array.from(pages).sort((a, b) => a - b);
  const items: PaginationItem[] = [];

  for (let i = 0; i < sorted.length; i += 1) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      items.push({
        type: 'ellipsis',
        key: sorted[i - 1] <= boundaryCount ? 'start' : 'end',
      });
    }
    items.push({ type: 'page', page: sorted[i] });
  }

  return items;
}
