"use client";

import { Tabs, Tab } from "@nextui-org/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./style.module.scss";

export default function Navigation() {
  const path = usePathname();
  const secondSlashIndex = path.indexOf('/', 1);
  const activePageKey = secondSlashIndex !== -1 ? path.slice(0, secondSlashIndex) : path;

  return (
    <Tabs
      aria-label="Options"
      color="primary"
      // variant="bordered"
      selectedKey={activePageKey}
      variant="solid"
    >
      <Tab
        key="/"
        title={
          <Link href="/" className={styles.link}>
            <div className="flex items-center space-x-2">
              <span>Me</span>
            </div>
          </Link>
        }
      />
      <Tab
        key="/diet"
        title={
          <Link href="/diet" className={styles.link}>
            <div className="flex items-center space-x-2">
              <span>Diet</span>
            </div>
          </Link>
        }
      />
      <Tab
        key="/fitness"
        title={
          <Link href="/fitness" className={styles.link}>
            <div className="flex items-center space-x-2">
              <span>Fitness</span>
            </div>
          </Link>
        }
      />
    </Tabs>
  );
}
