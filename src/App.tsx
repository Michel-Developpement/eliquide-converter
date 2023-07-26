import React from "react";
import { gsap } from "gsap/all";
import "./styles.css";

type StringOrNumber = string | number;
export default function App() {
  const [quantity, setQuantity] = React.useState<StringOrNumber>(0);
  const [nicotine, setNicotine] = React.useState<StringOrNumber>(0);
  const [flavor, setFlavor] = React.useState<StringOrNumber>(0);
  const [flavorMl, setFlavorMl] = React.useState<StringOrNumber>(0);
  const [booster, setBooster] = React.useState<StringOrNumber>(0);
  const [base, setBase] = React.useState<StringOrNumber>(0);
  const [error, setError] = React.useState<string | null>(null);

  const calculate = (quantity: number, flavor: number, nicotine: number) => {
    const quantityValue = quantity;
    const boosterValue = (nicotine / 20) * nicotine * (quantity / 10);
    const flavorValue = (quantity / 100) * flavor;
    let baseValue: StringOrNumber = quantityValue - flavorValue - boosterValue;

    if (boosterValue <= 20) {
      setBooster(boosterValue);
    } else {
      setBooster("XXX");
      setError("Le eliquide n'est pas censé faire + de 20 mg");
    }
    if (flavorValue < 100) {
      setFlavorMl(flavorValue);
    } else {
      setFlavorMl("XXX");
      setError("vous ne pouvez pas mettre + de 100%");
    }
    if (baseValue < 0) {
      baseValue = "XXX";
    }
    setBase(baseValue);
  };

  const handleFlavor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlavor(Number(e.currentTarget.value));
  };
  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.currentTarget.value));
  };
  const handleNicotine = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNicotine(Number(e.currentTarget.value));
  };
  const handleCalculate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    calculate(Number(quantity), Number(flavor), Number(nicotine));
  };
  return (
    <div className="App">
      <h1>Convertisseur Eliquides</h1>
      <form>
        <label htmlFor="quantity">quantité à préparer en ml :</label>
        <input type="text" onChange={handleQuantity} />
        <br />
        <label htmlFor="flavor">% arôme</label>
        <input type="text" onChange={handleFlavor} />
        <br />
        <label htmlFor="nicotine">mg de nictine par ml souhaitée</label>
        <input type="text" onChange={handleNicotine} />
        <br />
        <button onClick={handleCalculate}>Calculer</button>
      </form>
      <p>quantité d'arome nésséssaire : {flavorMl}ml</p>
      <p>quantité de boosters : {booster}ml</p>
      <p>base neutre nésséssaire : {base}ml</p>
      {error ? <p className="error">{error}</p> : ""}
    </div>
  );
}
