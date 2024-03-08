"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Checkbox } from "@nextui-org/checkbox";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";

type FilterOperators = "single" | "multiple";
export type FilterElement = {
  name: string;
  values: string[];
  mode: FilterOperators;
  key: string;
};

type PropType = {
  filters: FilterElement[];
};

export default function Filter({ filters }: PropType) {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const filtersNames = useMemo(() => {
    return filters.map((f) => f.key);
  }, [filters]);

  useEffect(() => {
    const initFilters = filtersNames.reduce<Record<string, string[]>>(
      (initFilters, filterName) => {
        const filterValues = searchParams.get(filterName);

        if (!filterValues) {
          return initFilters;
        }

        const searchParamsFilterValue = filterValues
          .split(",")
          .map((str) => str.trim());

        return { ...initFilters, [filterName]: searchParamsFilterValue };
      },
      {}
    );

    setSelectedFilters(initFilters);
  }, []);

  const handleChangeFilter = (filterName: string, filterValue: string) => {
    setSelectedFilters((prevFilters) => {
      const filtersCopy = { ...prevFilters };
      const currentFilterValues = filtersCopy[filterName] || [];

      if (currentFilterValues.includes(filterValue)) {
        filtersCopy[filterName] = currentFilterValues.filter(
          (f) => f !== filterValue
        );
      } else {
        filtersCopy[filterName] = [...currentFilterValues, filterValue];
      }

      return filtersCopy;
    });
  };

  const handleApply = () => {
    const params = new URLSearchParams(searchParams);

    filtersNames.forEach((filter) => {
      if (!selectedFilters[filter]?.length) {
        params.delete(filter);
      }
    });

    Object.keys(selectedFilters).forEach((filterName) => {
      selectedFilters[filterName].length &&
        params.set(filterName, selectedFilters[filterName].join(", "));
    });
    replace(`${pathname}?${params.toString()}`);
  };

  const isSelectedCheckBox = (key: string, value: string) => {
    return !!selectedFilters[key]?.includes(value);
  };

  return (
    <div>
      {filters.map((filter) => {
        return (
          <div key={filter.key} className="flex flex-col">
            <p className="font-medium text-lg">{filter.name}:</p>
            <div className="grid grid-cols-4 mb-5">
              {filter.values.map((value) => {
                return (
                  <Checkbox
                    isSelected={isSelectedCheckBox(filter.key, value)}
                    key={value}
                    onChange={() => handleChangeFilter(filter.key, value)}
                  >
                    {value}
                  </Checkbox>
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="flex gap-10">
        <Button onClick={handleApply} color="primary">
          Apply
        </Button>
        <Button variant="light">Reset</Button>
      </div>
    </div>
  );
}
