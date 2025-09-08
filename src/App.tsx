// Remove duplicate import since it's already imported below
import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import Skeleton from "./components/ui/Skeleton";
import Toast from "./components/ui/Toast";

import { PersonalInfo } from "./components/form/PersonalInfo";

function App() {
  return (
    <div>
      <PersonalInfo />
    </div>
  );
}

export default App;
