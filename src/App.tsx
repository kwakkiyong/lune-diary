import {RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {WindowConditionProvider} from "@/providers/WindowConditionProvider.tsx";
import {ResponsiveConditionProvider} from "@/providers/ResponsiveConditionProvider.tsx";
import {Toaster} from "sonner";
import {ROUTER} from "@/router/Router.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 60 * 1000, // 5 minutes
        },
    },
})

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <WindowConditionProvider>
                <ResponsiveConditionProvider>
                    <Toaster
                        position='top-center'
                        toastOptions={{
                            style: {zIndex: 9999},
                            className: 'pointer-events-auto',
                        }}
                    />
                    <RouterProvider router={ROUTER}/>
                </ResponsiveConditionProvider>
            </WindowConditionProvider>
        </QueryClientProvider>
    )
}