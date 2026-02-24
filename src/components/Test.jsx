import React, { useEffect, useState } from "react";
import { ref, onValue, off } from "firebase/database";
import { db } from '../util/firebase';






export default function Test() {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const settingsRef = ref(db, "Application settings");
        console.log(settingsRef)

        const unsubscribe = onValue(
            settingsRef,
            (snapshot) => {
                const data = snapshot.val();
                setSettings(data);
                setLoading(false);
                setError(null);

                
            },
            
            (err) => {
                console.error("Firebase fetch error:", err);
                setError("Failed to fetch application settings. Please ensure you have the correct permissions.");
                setLoading(false);
            }
        );

        return () => {
            off(settingsRef);
        };
    }, []);

}