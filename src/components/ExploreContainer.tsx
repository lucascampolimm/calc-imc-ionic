import React, {useState} from 'react';
import './ExploreContainer.css';
import { IonInput, IonButton, IonLabel } from '@ionic/react';
import { useForm } from "react-hook-form";

type FormInputs = {
  peso: number
  altura: number
  imc: number
}

const ExploreContainer: React.FC = () => {
  const { register, getValues, setValue } = useForm<FormInputs>();
  
  const [logValue, setLog] = useState("");
  const style = {
    marginTop: "20px",

  };

  return (
    <div className="container">
      <IonInput {...register("peso")} style={style} type="number" label="Peso" labelPlacement="floating" fill="outline" placeholder="Peso"></IonInput>
      <IonInput {...register("altura")} style={style} type="number" label="Altura" labelPlacement="floating" fill="outline" placeholder="Altura"></IonInput>
      <IonButton style={style} onClick={() => {
          const pesoValue:number = getValues("peso");
          const alturaValue:number = getValues("altura");
          const IMC:number = parseFloat((pesoValue / (alturaValue * alturaValue)).toFixed(2));
          setValue("imc", IMC);
          
          if (isNaN(IMC)) {
            setValue("imc", 0);
          } else {
            
            if(IMC < 18.5) {
              setLog("Magreza");
            }
            if(IMC >= 18.5 && IMC < 25) {
              setLog("Normal");
            }
            if(IMC >= 25 && IMC < 30) {
              setLog("Sobrepeso");
            }
            if(IMC >= 30 && IMC < 40) {
              setLog("Obesidade");
            }
            if(IMC >= 40) {
              setLog("Obesidade Grave");
            }
            if(IMC == 0 || isNaN(IMC)) {
              setLog("");
              setValue("imc", NaN);
            }
          }

            
        }}>Calcular</IonButton>

        {logValue
        ? <IonInput {...register("imc")} style={style} disabled={true} label="Seu IMC" labelPlacement="floating" fill="outline" placeholder="Enter text"></IonInput> 
        : <IonInput value="" style={style} disabled={true} label="Seu IMC" labelPlacement="floating" fill="outline" placeholder="Enter text"></IonInput>
        }
      <br></br>
      {logValue ? "O valor do IMC indica: " : ""} {logValue}
      
    </div>
  );
};

export default ExploreContainer;