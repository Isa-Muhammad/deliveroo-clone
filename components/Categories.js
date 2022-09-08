import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import sanityClient, { urlFor } from "../sanity";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
  *[_type == "category"]
  `
      )
      .then((data) => {
        setCategories(data);
      });
  }, []);

  console.log("Cattttt", categories);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.image.asset._ref).width(200).url()}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
