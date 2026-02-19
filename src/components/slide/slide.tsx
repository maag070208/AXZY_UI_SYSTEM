import { useState } from "react";
import { ITSlideToggleProps } from "./slide.props";
/**
 * Componente de interruptor deslizante (toggle switch) que permite cambiar entre dos estados (activado o desactivado).
 *
 * Este componente simula un interruptor con dos estados visuales: activado y desactivado. El componente tiene soporte para un color personalizado cuando está activado (`activeColor`) 
 * y cuando está desactivado (`inactiveColor`). También maneja un estado interno `isOn` que se puede controlar con la función `onToggle`, la cual se llama cada vez que el interruptor cambia de estado.
 * 
 * @param onToggle - Función de callback que se ejecuta cada vez que el estado del interruptor cambia. Recibe el nuevo estado (`true` o `false`).
 * @param initialState - Estado inicial del interruptor. Si no se especifica, el valor por defecto es `false` (desactivado).
 * @param activeColor - Color de fondo cuando el interruptor está activado (por defecto es `bg-green-500`).
 * @param inactiveColor - Color de fondo cuando el interruptor está desactivado (por defecto es `bg-gray-400`).
 *
 * @returns Un componente que simula un interruptor deslizante, que puede alternar entre un estado activado y desactivado.
 * 
 * @example
 * ```tsx
 * import ITSlideToggle from './ITSlideToggle';
 * 
 * function App() {
 *   const handleToggle = (newState: boolean) => {
 *     //console.log(`El interruptor está ${newState ? 'activado' : 'desactivado'}`);
 *   };
 * 
 *   return (
 *     <ITSlideToggle
 *       initialState={false}
 *       onToggle={handleToggle}
 *       activeColor="bg-slate-500"
 *       inactiveColor="bg-red-400"
 *     />
 *   );
 * }
 * ```
 */

export default function ITSlideToggle({
  onToggle,
  initialState = false,
  activeColor = "bg-green-500",
  inactiveColor = "bg-gray-400",
}: ITSlideToggleProps) {
  const [isOn, setIsOn] = useState(initialState);

  const toggleSwitch = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <div
      className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        isOn ? activeColor : inactiveColor
      }`}
      onClick={toggleSwitch}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          isOn ? "translate-x-7" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
}
