import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import ActionButton2 from './../ActionButton2';
import './GroupButtons.css';

const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
}));

/**
 * GroupButtons コンポーネント
 * @param children 子コンポーネント
 */
const GroupButtons = () => {
      return(
            <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {Array.from(Array(6)).map((_, index) => (
                        <Grid item xs={1} sm={4} md={4} key={index}>
                              <Item>
                                    <ActionButton2 buttonName="xs=1" color="error" clickAction={{}} />
                              </Item>
                        </Grid>
                  ))}
            </Grid>
      );
}

export default GroupButtons;