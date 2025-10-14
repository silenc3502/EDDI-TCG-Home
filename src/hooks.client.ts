// src/hooks.client.ts
import { afterNavigate } from '$app/navigation';

if (typeof window !== 'undefined') {
    afterNavigate((navigation) => {
        const path = navigation.to?.url.pathname;
        if (path && typeof (window as any).gtag === 'function') {
            (window as any).gtag('event', 'page_view', {
                page_path: path
            });
        }
    });
}
