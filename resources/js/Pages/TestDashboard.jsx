import React from "react";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/Components/container/PageContainer";

// components
import SalesOverview from "@/Components/DashboardComponents/SalesOverview";
import YearlyBreakup from "@/Components/DashboardComponents/YearlyBreakup";
import RecentTransactions from "@/Components/DashboardComponents/RecentTransactions";
import ProductPerformance from "@/Components/DashboardComponents/ProductPerformance";
import Blog from "@/Components/DashboardComponents/Blog";
import MonthlyEarnings from "@/Components/DashboardComponents/MonthlyEarnings";

export default function TestDashboard() {
    return (
        <PageContainer title="Dashboard" description="this is Dashboard">
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={8}>
                        <SalesOverview />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <YearlyBreakup />
                            </Grid>
                            <Grid item xs={12}>
                                <MonthlyEarnings />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <RecentTransactions />
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <ProductPerformance />
                    </Grid>
                    <Grid item xs={12}>
                        <Blog />
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
}
