
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Make sure to import BrowserRouter, Routes, and Route

import PostPageHome from "./views/PostPageHome"; 
import PostPageUpdate from "./views/PostPageUpdate";

// Assuming these components are correctly imported
import LoginPage from "./views/LoginPage"; 
import PostPageAdd from "./views/PostPageAdd";
import PostPageDetails from "./views/PostPageDetails";



// Assuming these components are correctly imported
import SignUpPage from "./views/SignUpPage"; // Assuming these components are correctly imported

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostPageHome />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/add" element={<PostPageAdd />} />
        <Route path="/post/:id" element={<PostPageDetails />} />
        <Route path="/update/:id" element={<PostPageUpdate />} />





      </Routes>
    </BrowserRouter>
  );
}

export default App;