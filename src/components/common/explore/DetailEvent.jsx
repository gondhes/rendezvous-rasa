import React, { useState } from 'react';
import MainLayout from "../../layout/MainLayout";
import RestaurantDetailPage from "./components/RestaurantDetailPage";

function DetailEvent() {
    const [showDetailPage, setShowDetailPage] = useState(false);
    return (
        <MainLayout>
            <div className="bg-gray-100 min-h-screen p-10 font-sans">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Main Application Page</h1>
                    <p className="text-gray-600 mb-6">Click the button to open the restaurant details.</p>
                    <button
                        onClick={() => setShowDetailPage(true)}
                        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        View Cafe Blue Details
                    </button>
                </div>
                {showDetailPage && <RestaurantDetailPage onClose={() => setShowDetailPage(false)} />}
            </div>
        </MainLayout>
    );
}

export default DetailEvent;