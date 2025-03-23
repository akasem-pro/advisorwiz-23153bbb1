import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Chip, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

// Define a type for the explanation object
interface MatchExplanation {
  category: string;
  explanation: string;
  scoreImpact: number;
  isPrimary: boolean;
}

// Define a type for the props that the component will receive
interface MatchExplanationProps {
  matchId: string;
  explanations?: MatchExplanation[];
}

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  border: '1px solid #e0e0e0',
  boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
  '&:hover': {
    boxShadow: '0 7px 14px rgba(0,0,0,0.25), 0 5px 5px rgba(0,0,0,0.22)'
  }
}));

const MatchExplanation = ({ matchId, explanations }: MatchExplanationProps) => {
  const [loading, setLoading] = useState(true);
  const [matchExplanations, setMatchExplanations] = useState<MatchExplanation[]>([]);
  const [categories, setCategories] = useState<{ primary: string[]; secondary: string[] }>({ primary: [], secondary: [] });
  
  useEffect(() => {
    if (explanations) {
      setMatchExplanations(explanations);
      setCategories(getMatchCategoriesFromExpanations(explanations));
      setLoading(false);
    } else {
      // Fetch explanations based on matchId if not provided as props
      const fetchExplanations = async () => {
        setLoading(true);
        try {
          // Placeholder for fetching logic - replace with your actual data fetching
          const fetchedExplanations: MatchExplanation[] = [
            { category: 'Category A', explanation: 'Explanation for A', scoreImpact: 0.8, isPrimary: true },
            { category: 'Category B', explanation: 'Explanation for B', scoreImpact: 0.6, isPrimary: false },
          ];
          setMatchExplanations(fetchedExplanations);
          setCategories(getMatchCategoriesFromExpanations(fetchedExplanations));
        } catch (error) {
          console.error("Failed to load match explanations:", error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchExplanations();
    }
  }, [matchId, explanations]);
  
  const getMatchCategoriesFromExpanations = (explanations: MatchExplanation[]): { primary: string[]; secondary: string[] } => {
    const categories: { primary: string[]; secondary: string[] } = {
      primary: [],
      secondary: []
    };
    
    explanations.forEach(explanation => {
      if (explanation.isPrimary) {
        if (!categories.primary.includes(explanation.category)) {
          categories.primary.push(explanation.category);
        }
      } else {
        if (!categories.secondary.includes(explanation.category)) {
          categories.secondary.push(explanation.category);
        }
      }
    });
    
    return categories;
  };
  
  const renderExplanations = (isPrimary: boolean) => {
    const filteredExplanations = matchExplanations.filter(exp => exp.isPrimary === isPrimary);
    
    return filteredExplanations.map((explanation, index) => (
      <StyledCard key={index}>
        <CardContent>
          <Typography variant="h6" component="div">
            {explanation.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {explanation.explanation}
          </Typography>
          <Typography variant="subtitle2">
            Score Impact: {explanation.scoreImpact}
          </Typography>
        </CardContent>
      </StyledCard>
    ));
  };
  
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Box>
      <Typography variant="h5" gutterBottom>Match Explanation</Typography>
      
      <Box mb={2}>
        <Typography variant="subtitle1">Primary Categories:</Typography>
        {categories.primary.map((category, index) => (
          <Chip key={index} label={category} style={{ margin: '4px' }} />
        ))}
      </Box>
      
      <Box mb={2}>
        <Typography variant="subtitle1">Secondary Categories:</Typography>
        {categories.secondary.map((category, index) => (
          <Chip key={index} label={category} style={{ margin: '4px' }} />
        ))}
      </Box>
      
      <Typography variant="h6" gutterBottom>Primary Explanations</Typography>
      {renderExplanations(true)}
      
      <Typography variant="h6" gutterBottom>Secondary Explanations</Typography>
      {renderExplanations(false)}
    </Box>
  );
};

export default MatchExplanation;
