# PropertyDashboardCard

Use `PropertyDashboardCard` to render dashboard-facing property summaries with:

- cover image
- edit action in the corner
- occupancy feedback
- average rating summary

Exports:

- `PropertyDashboardCard`
- `PROPERTY_DASHBOARD_CARD_FEEDBACK_TONE`

Common props:

- `title`
- `propertyType`
- `address`
- `coverImageUrl`
- `coverImageAlt`
- `onOpen`
- `onEdit`
- `editIcon`
- `availableUnitsLabel`
- `occupancyLabel`
- `occupancyTone`
- `ratingValue`
- `ratingCount`

Example:

```jsx
import {
  PropertyDashboardCard,
  PROPERTY_DASHBOARD_CARD_FEEDBACK_TONE,
} from "@franxis12/fhl-shared-ui";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

<PropertyDashboardCard
  title="Oak Street Apartments"
  propertyType="Apartment building"
  address="123 Main Street, Miami, FL 33101"
  coverImageUrl={coverUrl}
  availableUnitsLabel="2/10 units available"
  occupancyLabel="High vacancy"
  occupancyTone={PROPERTY_DASHBOARD_CARD_FEEDBACK_TONE.WARNING}
  ratingValue={4.6}
  ratingCount={18}
  editIcon={PencilSquareIcon}
  onOpen={() => navigate(`/owner/dashboard/properties/${property.id}`)}
  onEdit={() => navigate(`/owner/dashboard/properties/${property.id}/edit`)}
/>;
```
