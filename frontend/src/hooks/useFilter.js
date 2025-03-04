// useFilter.js
import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useFilteredLeads = (status) => {
  const leads = useSelector((state) => state.leads.leads);

  return useMemo(() => {
    if (status === "all") return leads; 
    return leads.filter((lead) => lead.status === status);
  }, [leads, status]);
};
