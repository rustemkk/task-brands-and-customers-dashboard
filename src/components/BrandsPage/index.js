import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectAllBrands } from 'modules/brands/selectors';
import { followBrand, unfollowBrand } from 'modules/users/actions';
import { selectCustomerBrandsByCustomerId } from 'modules/customers/selectors';
import { selectCurrentUserId } from 'modules/users/selectors';


const useStyles = makeStyles((theme) => ({
  checkbox: {
    marginBottom: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '100%',
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const BrandsPage = () => {

  const s = useStyles();
  const dispatch = useDispatch();

  const currentUserId = useSelector(selectCurrentUserId);
  const brands = useSelector(selectAllBrands);
  const customerBrands = useSelector(selectCustomerBrandsByCustomerId(currentUserId));

  const [isOnlyFollowing, setIsOnlyFollowing] = useState(false);

  const brandsToShow = useMemo(() => {
    return !isOnlyFollowing ?
      brands :
      brands.filter(b => customerBrands.find(cb => cb.brandId === b.id && cb.isFollowing));
  }, [brands, customerBrands, isOnlyFollowing]);

  return (
    <Container className={s.cardGrid}>
      <Grid className={s.checkbox} item xs={12}>
        <FormControlLabel
          control={<Checkbox color="secondary" name="saveAddress" />}
          label="SHOW ONLY BRANDS THAT I FOLLOW"
          onChange={e => setIsOnlyFollowing(e.target.checked)}
          value={isOnlyFollowing}
        />
      </Grid>
      <Grid container spacing={3}>
        {brandsToShow.map(brand =>
          <Grid item key={brand.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card className={s.card}>
              <CardMedia
                className={s.cardMedia}
                image={brand.logo}
                title="Image title"
              />
              <CardContent className={s.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {brand.name}
                </Typography>
                <Typography>
                  This awesome brand name is "{brand.name}", and its symbol is "{brand.symbol}". Founded in 2020.
                </Typography>
              </CardContent>
              <CardActions>
                {customerBrands.find(cb => cb.brandId === brand.id && cb.isFollowing) ?
                  <Button size="small" color="primary" variant="outlined" onClick={() => dispatch(unfollowBrand(brand.id))}>
                    UNFOLLOW
                  </Button> :
                  <Button size="small" color="primary" variant="contained" onClick={() => dispatch(followBrand(brand.id))}>
                    FOLLOW
                  </Button>
                }
                <Button size="small" color="primary">
                  VIEW
                </Button>
              </CardActions>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default BrandsPage;