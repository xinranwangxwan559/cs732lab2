import allPokemon from "./pokemon.json";
import { useEffect, useState } from "react";
import styles from "./PokedexPage.module.css";

/**
 * Renders information about a pokemon with the given id.
 */
export default function PokedexPage({ id }) {
  const [isLoaded, setLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(undefined);
  const pokemon = allPokemon.find((mon) => mon.id === id);

  // This effect will, whenever the id changes, set "loaded" back to false before loading the new image.
  // This is the only way I could figure out how to make this thing work.
  useEffect(() => {
    if (imgSrc !== pokemon.imageUrl) {
      setLoaded(false);
      setImgSrc(pokemon.imageUrl);
    }
  }, [id]);

  return (
    <div className={styles.container}>
      <h1>{pokemon.name}</h1>

      {!isLoaded && <PlaceholderImage />}

      <img
        className={styles.dexImage}
        style={{ display: isLoaded ? undefined : "none" }}
        src={imgSrc}
        onLoadStart
        onLoad={() => setLoaded(true)}
      />

      <p>{pokemon.dexEntry}</p>
    </div>
  );
}

/**
 * When the main image hasn't yet been loaded from the internet, this is rendered instead - a spinning poke'ball placeholder image.
 */
function PlaceholderImage() {
  return <img className={styles.placeholderImage} src="white-pokeball.png" />;
}
