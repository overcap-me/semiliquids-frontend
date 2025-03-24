import { ROUTE_PATHS } from "@/shared/routes";
import { useParams, usePathname, useSearchParams } from "next/navigation";

export enum ARROW_DIRECTION {
  NEXT = 'next',
  PREV = 'prev'
}

export const useArrowRedirect = (direction: string) => {
  const pathname = usePathname();
  const { firmId } = useParams()
  const query = useSearchParams();

  switch (pathname) {
    case ROUTE_PATHS.INDEX.BASE:
      if (direction === ARROW_DIRECTION.NEXT) {
        return { href: ROUTE_PATHS.INDEX.PERFORMANCE + '?' + query.toString() };
      }
      break

    case ROUTE_PATHS.INDEX.PERFORMANCE:
      if (direction === ARROW_DIRECTION.NEXT) {
        return { href: ROUTE_PATHS.INDEX.STRATEDY_DATA + '?' + query.toString() };
      }
      if (direction === ARROW_DIRECTION.PREV) {
        return { href: ROUTE_PATHS.INDEX.BASE + '?' + query.toString() };
      }
      break

    case ROUTE_PATHS.INDEX.STRATEDY_DATA:
      if (direction === ARROW_DIRECTION.NEXT) {
        return { href: ROUTE_PATHS.INDEX.TERMS + '?' + query.toString() };
      }
      if (direction === ARROW_DIRECTION.PREV) {
        return { href: ROUTE_PATHS.INDEX.PERFORMANCE + '?' + query.toString() };
      }
      break

    case ROUTE_PATHS.INDEX.TERMS:
      if (direction === ARROW_DIRECTION.PREV) {
        return { href: ROUTE_PATHS.INDEX.STRATEDY_DATA + '?' + query.toString() };
      }
      break

    case ROUTE_PATHS.FIRM_BY_ID.BASE(firmId):
      if (direction === ARROW_DIRECTION.NEXT) {
        return { href: ROUTE_PATHS.FIRM_BY_ID.FILTERS.PERFORMANCE(firmId) + '?' + query.toString() };
      }
      break

    case ROUTE_PATHS.FIRM_BY_ID.FILTERS.PERFORMANCE(firmId):
      if (direction === ARROW_DIRECTION.NEXT) {
        return { href: ROUTE_PATHS.FIRM_BY_ID.FILTERS.STRATEDY_DATA(firmId) + '?' + query.toString() };
      }
      if (direction === ARROW_DIRECTION.PREV) {
        return { href: ROUTE_PATHS.FIRM_BY_ID.BASE(firmId) + '?' + query.toString() };
      }
      break

    case ROUTE_PATHS.FIRM_BY_ID.FILTERS.STRATEDY_DATA(firmId):
      if (direction === ARROW_DIRECTION.NEXT) {
        return { href: ROUTE_PATHS.FIRM_BY_ID.FILTERS.TERMS(firmId) + '?' + query.toString() };
      }
      if (direction === ARROW_DIRECTION.PREV) {
        return { href: ROUTE_PATHS.FIRM_BY_ID.FILTERS.PERFORMANCE(firmId) + '?' + query.toString() };
      }
      break

    case ROUTE_PATHS.FIRM_BY_ID.FILTERS.TERMS(firmId):
      if (direction === ARROW_DIRECTION.PREV) {
        return { href: ROUTE_PATHS.FIRM_BY_ID.FILTERS.STRATEDY_DATA(firmId) + '?' + query.toString() };
      }
      break

    default:
      break
  }

  return { href: '', query: query.toString() }
}