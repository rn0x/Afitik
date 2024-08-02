import React from 'react'
import { Skeleton } from "@mui/material";

export default function LoadingSkeleton() {
    const center = { marginLeft: "auto", marginRight: "auto", maxWidth: "500px", width: "90%" };

    return (
        <>
            <div className="LoadingPageSkeleton">
                <Skeleton variant="text" width={210} height={60} style={center} />
                <Skeleton variant="rectangular" width={210} height={118} style={center} />
                <Skeleton variant="text" width={210} height={60} style={center} />
                <Skeleton variant="rectangular" width={210} height={118} style={center} />
                <Skeleton variant="text" width={210} height={60} style={center} />
                <Skeleton variant="rectangular" width={210} height={118} style={center} />
                <Skeleton variant="text" width={210} height={60} style={center} />
                <Skeleton variant="rectangular" width={210} height={118} style={center} />
            </div>
        </>
    )
}
