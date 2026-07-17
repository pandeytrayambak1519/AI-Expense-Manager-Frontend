import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import {
    Routes,
    Route,
    Navigate,
    useLocation
} from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Notifications from "./pages/Notifications";
import Goals from "./pages/Goals";
import Budget from "./pages/Budget";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ExpenseList from "./pages/ExpenseList";
import AddExpense from "./pages/AddExpense";
import Analytics from "./pages/Analytics";
import ReceiptScanner from "./pages/ReceiptScanner";
import Profile from "./pages/Profile";
import AIAdvisor from "./pages/AIAdvisor";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransitionStage] = useState("fadeIn");

    useEffect(() => {
        setTransitionStage("fadeOut");
        const timeout = setTimeout(() => {
            setDisplayLocation(location);
            setTransitionStage("fadeIn");
        }, 180);
        return () => clearTimeout(timeout);
    }, [location]);

    return (
        <div className={`route-transition ${transitionStage}`}>
            <Routes location={displayLocation}>

            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/expenses"
                element={
                    <ProtectedRoute>
                        <ExpenseList />
                    </ProtectedRoute>
                }
            />
            <Route
    path="/goals"
    element={
        <ProtectedRoute>
            <Goals />
        </ProtectedRoute>
    }
/>

            <Route
                path="/add-expense"
                element={
                    <ProtectedRoute>
                        <AddExpense />
                    </ProtectedRoute>
                }
            />
            <Route
    path="/notifications"
    element={
        <ProtectedRoute>
            <Notifications />
        </ProtectedRoute>
    }
/>

            <Route
                path="/receipt"
                element={
                    <ProtectedRoute>
                        <ReceiptScanner />
                    </ProtectedRoute>
                }
            />
            <Route
    path="/budget"
    element={
        <ProtectedRoute>
            <Budget />
        </ProtectedRoute>
    }
/>

            <Route
                path="/analytics"
                element={
                    <ProtectedRoute>
                        <Analytics />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/advisor"
                element={
                    <ProtectedRoute>
                        <AIAdvisor />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            {/* Redirect unknown URLs */}
            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />

            </Routes>
        </div>
    );

}

export default App;