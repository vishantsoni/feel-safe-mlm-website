"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useNotifications } from '@/lib/notifications/useNotifications';

export default function NotificationsPopup() {
    const {
        loading,
        popupNotifications,
        popupShown,
        setPopupDismissed,
    } = useNotifications();

    const [visible, setVisible] = useState(false);

    const current = useMemo(() => {
        if (!popupNotifications || popupNotifications.length === 0) return null;
        return [...popupNotifications].sort((a, b) => {
            const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return tb - ta;
        })[0];
    }, [popupNotifications]);

    useEffect(() => {
        if (loading || !current || popupShown) {
            setVisible(false);
            return;
        }
        // ONLY turn on visibility here. Don't trigger dismissal hooks until they close it!
        setVisible(true);
    }, [loading, current, popupShown]);

    const handleClose = () => {
        setVisible(false);
        setPopupDismissed(); // Block it from showing again on subsequent actions
    };

    if (!current || !visible) return null;

    return (
        <div
            className="fixed inset-0 z-[10060] flex items-center justify-center"
            aria-modal="true"
            role="dialog"
        >
            <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

            <div className="relative bg-white rounded-3xl shadow-2xl border w-[92vw] max-w-lg p-5 dynamic-popup-container" style={{ zIndex: 10061 }}>
                <div className="d-flex justify-content-between align-items-start gap-3">
                    <div>
                        <div className="fw-bold fs-5">{current.title}</div>
                        {current.message && <div className="text-muted mt-2">{current.message}</div>}
                    </div>
                    <button type="button" className="border-0 bg-transparent" onClick={handleClose}>
                        <X size={18} className="text-muted" />
                    </button>
                </div>

                <div className="mt-4 d-flex gap-2">
                    <Link href={current.url || '#'} className="btn btn-primary flex-grow-1" onClick={handleClose}>
                        View
                    </Link>
                    <button type="button" className="btn btn-outline-secondary" onClick={handleClose}>
                        Later
                    </button>
                </div>
            </div>
        </div>
    );
}