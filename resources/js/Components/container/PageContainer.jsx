import React from "react";
import { Head } from "@inertiajs/react";

const PageContainer = ({ title, description, children }) => (
    <div>
        <Head title={title} />
        {children}
    </div>
);

export default PageContainer;
