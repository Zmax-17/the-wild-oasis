import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          {
            value: "with-discount",
            label: "With discount",
          },
        ]}
      />

      <SortBy
        options={[
          {
            // sort by ascending
            value: "name-asc",
            label: "Sort by name (A-Z)",
          },
          {
            // sort by descending
            value: "name-desc",
            label: "Sort by name (Z-A)",
          },
          {
            // sort by price ascending
            value: "regularPrice-asc",
            label: "Sort by price (low first)",
          },
          {
            // sort by price descending
            value: "regularPrice-desc",
            label: "Sort by price (high first)",
          },
          {
            // sort by maximum capacity
            value: "maxCapacity-asc",
            label: "Sort by capacity (low first)",
          },
          {
            // sort by maximum capacity
            value: "maxCapacity-desc",
            label: "Sort by capacity (high first)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
