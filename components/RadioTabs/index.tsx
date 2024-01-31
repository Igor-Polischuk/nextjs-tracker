"use client";

import React, { ComponentProps } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";

import styles from "./style.module.scss";

type PropTypes = {
  items: {
    value: string;
    title: string;
  }[];

  value?: string;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  variant?: ComponentProps<typeof Tabs>["variant"];
  color?: ComponentProps<typeof Tabs>["color"];
};

export default function RadioTabs({
  items,
  value,
  setValue,
  ...rest
}: PropTypes) {
  const selectedValue = !value ? items[0].value : value;

  return (
    <Tabs selectedKey={selectedValue} className={styles.tabs} {...rest}>
      {items.map((item) => {
        return (
          <Tab
            key={item.value}
            title={
              <div
                className="w-full h-full p-5"
                onClick={() => {
                  setValue(item.value);
                }}
              >
                {item.title}
              </div>
            }
          />
        );
      })}
    </Tabs>
  );
}
