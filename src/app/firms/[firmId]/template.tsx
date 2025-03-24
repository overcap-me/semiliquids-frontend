import { FiltersProviderClient } from "@/widgets/Filters/context";

export const TemplateFirm = ({ children }: { children: React.ReactNode }) => {
  return <FiltersProviderClient>{children}</FiltersProviderClient>
}

export default TemplateFirm;