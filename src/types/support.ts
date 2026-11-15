export type SupportChannel = {
  id: string;
  kind: "crisp" | "messenger";
  label: string;
  description: string;
  availabilityNote: string;
  status: "not-configured" | "configured";
};
