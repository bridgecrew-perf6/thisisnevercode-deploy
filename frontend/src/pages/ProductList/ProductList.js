import React, { Component } from 'react';
import ProductCard from './Components/ProductCard';
import GoBackToTopButton from './Components/GoBackToTopButton';
import InfiniteScroll from './Components/infiniteScroll';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer';
import './ProductList.scss';
import { API_ENDPOINT } from '../../API/api';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      listData: [],
      isLoading: false,
      hasMoreData: false,
      sortOptions: [
        { id: 1, name: 'Recent', isChecked: true },
        { id: 2, name: 'Price (Low)', isChecked: false },
        { id: 3, name: 'Price (High)', isChecked: false },
        { id: 4, name: 'Trending', isChecked: false },
      ],
      viewOptions: [
        { id: 1, name: 'Large', isChecked: true },
        { id: 2, name: 'Small', isChecked: false },
      ],
    };
  }

  componentDidMount() {
    this.fetchMoreData();
    return window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleSortCheckIcon = id => {
    const { sortOptions } = this.state;
    const newsortOptions = [...sortOptions];
    newsortOptions.forEach(data => (data.isChecked = data.id === id));
    this.setState(
      {
        listData: [],
        offset: 0,
        isLoading: false,
        sortOptions: newsortOptions,
        hasMoreData: false,
      },
      this.fetchMoreData
    );
    window.addEventListener('scroll', this.handleScroll);
  };

  handleViewCheckIcon = id => {
    const { viewOptions } = this.state;
    const newViewOptions = [...viewOptions];
    newViewOptions.forEach(data => (data.isChecked = data.id === id));
    this.setState({ viewOptions: newViewOptions });
  };

  fetchMoreData = async () => {
    const recent = this.state.sortOptions[0].isChecked;
    const pricelow = this.state.sortOptions[1].isChecked;
    const pricehigh = this.state.sortOptions[2].isChecked;
    const trend = this.state.sortOptions[3].isChecked;
    let queryParameter;
    recent && (queryParameter = 'recent');
    pricelow && (queryParameter = 'pricelow');
    pricehigh && (queryParameter = 'pricehigh');
    trend && (queryParameter = 'trend');
    const { hasMoreData, offset, isLoading } = this.state;

    fetch(`${API_ENDPOINT}/product?sort=${queryParameter}&offset=${offset}`)
      .then(res => res.json())
      .then(data => {
        const listData = data.LIST_DATA.product;
        const newItemList = [...this.state.listData, ...listData];
        this.setState({
          listData: newItemList,
        });
        if (data.LIST_DATA.product.length === 0) {
          this.setState({
            hasMoreData: !hasMoreData,
            isLoading: false,
          });
          return window.removeEventListener('scroll', this.handleScroll);
        }
      })
      .catch(console.error);
  };

  showLoadingSvg = resolve => {
    const { listData, isLoading } = this.state;
    return new Promise(resolve => {
      if (listData.length === 0) {
        this.setState({
          isLoading: false,
        });
      } else {
        this.setState({
          isLoading: !isLoading,
        });
        setTimeout(() => {
          resolve();
        }, 1000);
      }
    });
  };

  handleScroll = async () => {
    const { offset } = this.state;
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    let scrollTotalHeight = scrollHeight;
    let scrollHeightFromTop = scrollTop;
    let scrollHeightOfListCard = clientHeight;
    const isOverEndPointScroll =
      scrollHeightFromTop + scrollHeightOfListCard >= scrollTotalHeight;
    if (isOverEndPointScroll) {
      this.setState(
        {
          offset: offset + 10,
        },
        await this.showLoadingSvg()
      );
      this.fetchMoreData();
    }
  };

  render() {
    const { listData, isLoading, hasMoreData, viewOptions } = this.state;

    return (
      <main className='ProductList'>
        <Nav
          sortOptions={this.state.sortOptions}
          handleSortCheckIcon={this.handleSortCheckIcon}
          viewOptions={this.state.viewOptions}
          handleViewCheckIcon={this.handleViewCheckIcon}
        />
        <div className='ProductComponentWrapper'>
          {listData &&
            listData.map(product => {
              const { id, mainImageUrl, subImage, detailImage, name, price } =
                product;
              return (
                <ProductCard
                  key={id}
                  mainImageUrl={mainImageUrl}
                  subImage={subImage}
                  detailImage={detailImage}
                  name={name}
                  price={price}
                  id={id}
                  viewOptions={viewOptions}
                />
              );
            })}
        </div>
        {isLoading && <InfiniteScroll />}

        {hasMoreData && <GoBackToTopButton />}
        <Footer />
      </main>
    );
  }
}

export default ProductList;
