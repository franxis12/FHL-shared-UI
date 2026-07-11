import {
  Container,
  CONTAINER_PADDING,
  CONTAINER_RADIUS,
  CONTAINER_SURFACE,
} from "../Container";
import { DashboardEmptyState } from "../DashboardEmptyState";
import { DashboardRecordCard } from "../DashboardRecordCard";
import { Skeleton, SKELETON_RADIUS } from "../Skeleton";

export function DashboardRecordList({
  title,
  description = "",
  items = [],
  isLoading = false,
  loadingCount = 3,
  emptyTitle = "Nothing here yet",
  emptyDescription = "",
  emptyActionLabel = "",
  emptyActionHref,
  onEmptyActionClick,
  headerAction = null,
  surface = CONTAINER_SURFACE.DEFAULT,
}) {
  return (
    <Container
      title={title}
      description={description}
      headerAction={headerAction}
      padding={CONTAINER_PADDING.MD}
      radius={CONTAINER_RADIUS.XL}
      surface={surface}
    >
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: loadingCount }).map((_, index) => (
            <Skeleton
              key={`dashboard-record-skeleton-${index}`}
              className="h-32 w-full"
              radius={SKELETON_RADIUS.XL}
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <DashboardEmptyState
          title={emptyTitle}
          description={emptyDescription}
          actionLabel={emptyActionLabel}
          actionHref={emptyActionHref}
          onActionClick={onEmptyActionClick}
        />
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <DashboardRecordCard
              key={item.id ?? item.key ?? `${title}-${index}`}
              {...item}
            />
          ))}
        </div>
      )}
    </Container>
  );
}
