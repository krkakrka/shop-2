import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product, isFavourite, onCart, onFavourites }) {
    return (
        <Card className="ProductCard-container">
            <Link to={`/products/${product.id}`}>
            <CardMedia
                className="ProductCard-media"
                image={product.image}
                title={product.name} />
            <CardContent className="ProductCard-content">
                <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {product.description}
                </Typography>
            </CardContent>
            </Link>
            <CardActions disableSpacing className="ProductCard-actions">
                <IconButton aria-label="add to cart" onClick={onCart}>
                    <ShoppingCartIcon />
                </IconButton>
                <IconButton aria-label="add to favorites" onClick={onFavourites}>
                    <FavoriteIcon style={{ color: isFavourite ? 'red' : 'inherit' }} />
                </IconButton>
            </CardActions>
        </Card>
    );
}
export default ProductCard;
