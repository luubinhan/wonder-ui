import styles from './Breadcrumb.module.css';

export type BreadcrumbItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
};

export type BreadcrumbSeparator = 'chevron' | 'arrow';

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
  separator?: BreadcrumbSeparator | React.ReactNode;
  maxItems?: number;
  onItemClick?: (item: BreadcrumbItem, index: number) => void;
  className?: string;
  'aria-label'?: string;
};

type ItemSegment = { type: 'item'; item: BreadcrumbItem; originalIndex: number };
type EllipsisSegment = { type: 'ellipsis' };
type BreadcrumbSegment = ItemSegment | EllipsisSegment;

function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

function ChevronSeparator() {
  return (
    <svg className={styles.chevron} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M5 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getVisibleSegments(items: BreadcrumbItem[], maxItems: number): BreadcrumbSegment[] {
  if (items.length <= maxItems) {
    return items.map((item, index) => ({ type: 'item', item, originalIndex: index }));
  }

  const trailingCount = maxItems - 1;
  const trailingItems = items.slice(-trailingCount);

  return [
    { type: 'item', item: items[0], originalIndex: 0 },
    { type: 'ellipsis' },
    ...trailingItems.map((item, index) => ({
      type: 'item' as const,
      item,
      originalIndex: items.length - trailingCount + index,
    })),
  ];
}

function renderSeparator(separator: BreadcrumbSeparator | React.ReactNode) {
  if (separator === 'chevron') {
    return <ChevronSeparator />;
  }

  if (separator === 'arrow') {
    return '→';
  }

  return separator;
}

function renderItemContent(item: BreadcrumbItem) {
  return (
    <>
      {item.icon && (
        <span className={styles.icon} aria-hidden="true">
          {item.icon}
        </span>
      )}
      <span>{item.label}</span>
    </>
  );
}

export function Breadcrumb({
  items,
  separator = 'chevron',
  maxItems = 4,
  onItemClick,
  className,
  'aria-label': ariaLabel = 'Breadcrumb',
}: BreadcrumbProps) {
  const segments = getVisibleSegments(items, maxItems);
  const lastSegmentIndex = segments.length - 1;

  return (
    <nav className={cx(styles.breadcrumb, className)} aria-label={ariaLabel}>
      <ol className={styles.list}>
        {segments.flatMap((segment, segmentIndex) => {
          const isLast = segmentIndex === lastSegmentIndex;
          const segmentKey = segment.type === 'ellipsis' ? 'ellipsis' : segment.item.id;

          const nodes = [
            <li key={segmentKey} className={styles.item}>
              {segment.type === 'ellipsis' ? (
                <span className={cx(styles.itemContent, styles.ellipsis)} aria-hidden="true">
                  …
                </span>
              ) : isLast ? (
                <span className={cx(styles.itemContent, styles.current)} aria-current="page">
                  {renderItemContent(segment.item)}
                </span>
              ) : onItemClick ? (
                <button
                  type="button"
                  className={cx(styles.itemContent, styles.link)}
                  onClick={() => onItemClick(segment.item, segment.originalIndex)}
                >
                  {renderItemContent(segment.item)}
                </button>
              ) : (
                <span className={cx(styles.itemContent, styles.static)}>
                  {renderItemContent(segment.item)}
                </span>
              )}
            </li>,
          ];

          if (!isLast) {
            nodes.push(
              <li key={`${segmentKey}-separator`} className={styles.separatorItem} aria-hidden="true">
                <span className={styles.separator}>{renderSeparator(separator)}</span>
              </li>,
            );
          }

          return nodes;
        })}
      </ol>
    </nav>
  );
}
