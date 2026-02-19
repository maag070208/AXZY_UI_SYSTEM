import { useState } from 'react';
import { ITButton, ITDialog } from './index'; // Import from main index
import "./index.css";

function App() {
  
  const [showDialog, setShowDialog] = useState(false);
  return (
    <div className="flex flex-col gap-4 p-4">
     <ITButton onClick={() => setShowDialog(true)}>Open Dialog</ITButton>
     <ITDialog isOpen={showDialog} onClose={() => setShowDialog(false)} title="Dialog">
       <p>Dialog Content</p>
     </ITDialog>
    </div>
  );
}

export default App;
