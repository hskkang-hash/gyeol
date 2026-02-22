
import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Grid, Box, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import apiClient from '../api'; // Import the configured axios instance

function MyCosmosCard() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        year: '',
        month: '',
        day: '',
        hour: '',
    });
    const [sajuResult, setSajuResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSajuResult(null);

        try {
            const response = await apiClient.post('/calculate', formData);
            setSajuResult(response.data);
        } catch (err) {
            setError(err.response?.data?.error || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleReset = () => {
        setSajuResult(null);
        setFormData({ year: '', month: '', day: '', hour: '' });
        setError(null);
    };

    return (
        <Paper sx={{ p: 3, height: '100%' }} elevation={2}>
            <Typography variant="h5" gutterBottom>{t('home.myCosmos')}</Typography>

            {sajuResult ? (
                // Display Saju Result
                <Box>
                     <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
                        Your unique cosmic blueprint based on your birth data.
                    </Typography>
                    <Grid container spacing={2} textAlign="center">
                        <Grid item xs={6} sm={3}>
                            <Paper sx={{ p: 2 }} variant="outlined">
                                <Typography variant="subtitle2" color="text.secondary">Year</Typography>
                                <Typography variant="h5">{sajuResult.yeonju}</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                             <Paper sx={{ p: 2 }} variant="outlined">
                                <Typography variant="subtitle2" color="text.secondary">Month</Typography>
                                <Typography variant="h5">{sajuResult.wolju}</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Paper sx={{ p: 2 }} variant="outlined">
                                <Typography variant="subtitle2" color="text.secondary">Day</Typography>
                                <Typography variant="h5">{sajuResult.ilju}</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                             <Paper sx={{ p: 2 }} variant="outlined">
                                <Typography variant="subtitle2" color="text.secondary">Time</Typography>
                                <Typography variant="h5">{sajuResult.siju}</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Button onClick={handleReset} sx={{ mt: 3 }}>Calculate Again</Button>
                </Box>
            ) : (
                // Display Input Form
                <form onSubmit={handleSubmit}>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                        Enter your birth details to reveal your Four Pillars of Destiny.
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField name="year" label="Year (YYYY)" type="number" value={formData.year} onChange={handleChange} fullWidth required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="month" label="Month (1-12)" type="number" value={formData.month} onChange={handleChange} fullWidth required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="day" label="Day (1-31)" type="number" value={formData.day} onChange={handleChange} fullWidth required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="hour" label="Hour (0-23)" type="number" value={formData.hour} onChange={handleChange} fullWidth required />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 3, position: 'relative' }}>
                        <Button type="submit" variant="contained" fullWidth disabled={loading}>_        
                            {loading ? 'Calculating...' : 'Reveal My Blueprint'}
                        </Button>
                        {loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Box>
                    {error && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}
                </form>
            )}
        </Paper>
    );
}

export default MyCosmosCard;
