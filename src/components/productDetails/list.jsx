import React, { useState, useEffect } from "react";
import {
  fetchOutfits,
  fetchOutfitsImages,
  addToOutfit,
  removeFromOutfit
} from "./outfitHelpers.js";
import Card from "./card.jsx";
import AddToOutfitCard from "./addCard.jsx";
import DirectionalButton from "./directionalButton.jsx";
import filterForShownItems from "./shownItemsHelper.js";

const List = ({
  listName,
  pageProduct,
  products,
  productsImages,
  onClickDetails,
  fetchRelatedDataAsync
  //avgRating,
}) => {
  // Set Local State For Outfits
  var [outfits, setOutfits] = useState([]);
  var [outfitsImages, setOutfitsImages] = useState([]);

  // Set Local State For Conditionally Rendered Products
  let initialShownIndices = listName === "Outfit" ? [0, 1, 2] : [0, 1, 2, 3];
  var [shownIndices, setShownIndices] = useState(initialShownIndices);

  //conditionally set outfits to Outfit data if this list represents outfits
  if (listName === "Outfit") {
    products = outfits;
    productsImages = outfitsImages;
  }

  //HANDLE FETCHING DATA ON AFTER FIRST RENDER
  useEffect(() => {
    if (listName === "Related") {
      fetchRelatedDataAsync(4);
    }
  }, []);

  useEffect(() => {
    if (listName === "Outfit") {
      fetchOutfits(setOutfits);
      fetchOutfitsImages(setOutfitsImages);
    }
  }, []);

  useEffect(() => {
    if (listName === "Outfit") {
      products = outfits;
      productsImages = outfitsImages;
    }
  }, [outfits, outfitsImages]);

  function onArrowClick(direction) {
    if (direction === "left") {
      if (shownIndices[0] !== 0) {
        let newShownIndices = shownIndices.map(idx => idx - 1);
        setShownIndices(newShownIndices);
      } else {
        console.log("Already at left-most item");
      }
    } else if (direction === "right") {
      if (shownIndices[shownIndices.length - 1] !== products.length - 1) {
        let newShownIndices = shownIndices.map(idx => idx + 1);
        setShownIndices(newShownIndices);
      } else {
        console.log("Already at right-most item");
      }
    }
  }

  function onClickButton(action, id) {
    if (action === "Add") {
      addToOutfit(id);
      fetchOutfits(setOutfits);
      fetchOutfitsImages(setOutfitsImages);
    }
    if (action === "Outfit") {
      removeFromOutfit(id);
      fetchOutfits(setOutfits);
      fetchOutfitsImages(setOutfitsImages);
    }
  }
  return (
    <div class="columns">
      {shownIndices[0] !== 0 ? (
        <DirectionalButton
          arrowDirection={"left"}
          icon={"fas fa-arrow-left"}
          onArrowClick={onArrowClick}
        />
      ) : null}
      {listName === "Outfit" ? (
        <AddToOutfitCard
          pageProduct={pageProduct}
          onClickButton={onClickButton}
        />
      ) : null}
      {filterForShownItems(products, shownIndices).map((product, idx) => {
        return (
          <Card
            key={idx}
            listName={listName}
            pageProduct={pageProduct}
            product={product}
            productImage={
              filterForShownItems(productsImages, shownIndices)[idx] !==
              undefined
                ? filterForShownItems(productsImages, shownIndices)[idx]
                    .results[0].photos[0].thumbnail_url
                : null
            }
            onClickDetails={onClickDetails}
            onClickButton={onClickButton}
            //avgRating={avgRating}
          />
        );
      })}
      {shownIndices[shownIndices.length - 1] !== products.length - 1 ? (
        <DirectionalButton
          arrowDirection={"right"}
          icon={"fas fa-arrow-right"}
          onArrowClick={onArrowClick}
        />
      ) : null}
    </div>
  );
};

export default List;
