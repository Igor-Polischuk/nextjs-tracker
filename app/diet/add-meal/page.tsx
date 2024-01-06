"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useEffect } from "react";

export default function Page() {
  // useEffect(() => {
  //     fetch('http://localhost:3000/api/food').then(res => res.json()).then(console.log)
  // })

  return (
    <section>
      <form action="" className="flex flex-col gap-6 pt-24">
      <h1 className="text-5xl">Create meal</h1>
        <Autocomplete allowsCustomValue label="Meal name">
          <AutocompleteItem key={"Banana"} value={"banana"}>
            Banana
          </AutocompleteItem>
        </Autocomplete>
        <Input label="Product energy" type="number" />
        <div className="flex gap-4">
          <Input label="Proteins" type="number" />
          <Input label="Fats" type="number" />
          <Input label="Carbohydrates" type="number" />
        </div>
        <Input label="Amount" type="number" />
        <Button color="success" type="submit" variant="shadow">
          Save
        </Button>
      </form>
    </section>
  );
}
