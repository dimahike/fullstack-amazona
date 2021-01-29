import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import Rating from '../components/Rating';
import { prices, ratings } from '../utils';

const SearchScreen = (props) => {
  const dispatch = useDispatch();
  const {
    name = 'all',
    category: activeCategory = 'all',
    min = 0,
    max = 0,
    rating: activeRating = 0,
    order = 'newest',
    pageNumber = 1,
  } = useParams();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const { loading: loadingCategories, error: errorCategories, categories } = productCategoryList;

  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        name: name !== 'all' ? name : '',
        category: activeCategory !== 'all' ? activeCategory : '',
        min,
        max,
        rating: activeRating,
        order,
      }),
    );
  }, [dispatch, name, activeCategory, min, max, activeRating, order, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || activeCategory;
    const filterPage = filter.page || pageNumber;
    const filterName = filter.name || name;
    const filterRaiting = filter.rating || activeRating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRaiting}/order/${sortOrder}/pageNumber/${filterPage}`;
  };

  return (
    <div>
      <div className="row">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error} </MessageBox>
        ) : (
          <div>{products.length} Results</div>
        )}
        <div>
          Sort by
          <select
            value={order}
            onChange={(e) => {
              props.history.push(getFilterUrl({ order: e.target.value }));
            }}>
            <option value="newest">Newest Arrivals </option>
            <option value="lowest">Price: Low to High </option>
            <option value="highest">Price: High to Low </option>
            <option value="toprated">Avg. Customer Reviews </option>
          </select>
        </div>
      </div>
      <div className="row top">
        <div className="col-1">
          <h3>Department</h3>
          <div>
            {loadingCategories ? (
              <LoadingBox />
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories} </MessageBox>
            ) : (
              <ul>
                <li>
                  <Link
                    className={'all' === activeCategory ? 'active' : ''}
                    to={getFilterUrl({ category: 'all' })}>
                    Any
                  </Link>
                </li>
                {categories.map((category) => (
                  <li key={`key-${category}`}>
                    <Link
                      className={category === activeCategory ? 'active' : ''}
                      to={getFilterUrl({ category })}>
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              {prices.map((price) => (
                <li key={price.name}>
                  <Link
                    to={getFilterUrl({ min: price.min, max: price.max })}
                    className={`${price.min}-${price.max}` === `${min}-${max}` ? 'active' : ''}>
                    {price.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Avg. Customer Review</h3>
            <ul>
              {ratings.map((rating) => (
                <li key={rating.name}>
                  <Link
                    to={getFilterUrl({ rating: rating.rating })}
                    className={`${rating.rating}` === `${activeRating}` ? 'active' : ''}>
                    <Rating caption={' & up'} rating={rating.rating} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error} </MessageBox>
          ) : (
            <>
              {products.length === 0 && <MessageBox variant="danger">No Products Found</MessageBox>}
              <div className="row center">
                {products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
              <div className="pagination row center">
                {[...Array(pages).keys()].map((numPage) => (
                  <Link
                    className={numPage + 1 === page ? 'active' : ''}
                    key={`PageNum${numPage + 1}`}
                    to={getFilterUrl({ page: numPage + 1 })}>
                    {numPage + 1}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
