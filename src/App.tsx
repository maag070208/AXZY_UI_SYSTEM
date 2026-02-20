import { useState } from 'react';
import { ITButton, ITDialog, ITTimePicker } from './index'; // Import from main index
import "./index.css";

function App() {
  
  const [showDialog, setShowDialog] = useState(false);
  const [time, setTime] = useState("");
  return (
    <div className="flex flex-col gap-4 p-4">

<ITTimePicker name="time" value={time} onChange={(e) => setTime(e.target.value)} onBlur={() => {}}/>

     <ITButton onClick={() => setShowDialog(true)}>Open Dialog</ITButton>
     <ITDialog isOpen={showDialog} onClose={() => setShowDialog(false)} title="Dialog">
       <p>Dialog Content</p>
     </ITDialog>
    </div>
  );
}

export default App;
