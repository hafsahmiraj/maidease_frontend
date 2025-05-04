import React, { useState, useEffect } from 'react';
import { ProductService } from './MaidProfilePage';
import { Rating } from 'primereact/rating';
import { useNavigate } from 'react-router-dom';
import { Paginator } from 'primereact/paginator';
import { Dropdown } from 'primereact/dropdown';
import Navbar from './Navbar';
import './HomePage.css'
// src/service/ProductService.js



export default function HomePage() {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const [maids, setMaids] = useState([]);
  const navigate = useNavigate();

  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [sortField, setSortField] = useState('');

  const sortOptions = [
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' }
  ];

  const areaSortOptions = [
    { label: 'Area A to Z', value: 'area' },
    { label: 'Area Z to A', value: '!area' }
  ];

  const skillsSortOptions = [
    { label: 'Cleaning', value: 'skills' },
    { label: 'Cooking', value: 'skills' },
    { label: 'BabySitting', value: 'skills' },
    { label: 'DishWashing', value: 'skills' },
    { label: 'Ironing', value: '!skills' },
    { label: 'Laundary', value: '!skills' }
  ];

  useEffect(() => {
    ProductService.getProducts().then((data) => {
      // Manually assign fake 'skills' for sorting
      const updatedMaids = data.map(maid => ({
        ...maid,
        skills: extractSkill(maid.description)
      }));

      setMaids(updatedMaids);
    });
  }, []);

  const extractSkill = (description) => {
    // Basic skill extraction from description text
    if (!description) return 'General';
    if (description.toLowerCase().includes('cooking')) return 'Cooking';
    if (description.toLowerCase().includes('babysitting')) return 'Babysitting';
    if (description.toLowerCase().includes('cleaning')) return 'Cleaning';
    if (description.toLowerCase().includes('elderly')) return 'Elderly Care';
    if (description.toLowerCase().includes('laundry')) return 'Laundry';
    return 'General';
  };

  const handleCardClick = (maidId) => {
    navigate(`/maid/${maidId}`);
  };




  const onSortChange = (event) => {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1));
      setSortKey(value);
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  };

  const sortedMaids = () => {
    let sorted = [...maids];
    if (sortField) {
      sorted.sort((a, b) => {
        let aField = a[sortField] || '';
        let bField = b[sortField] || '';

        if (typeof aField === 'string') aField = aField.toLowerCase();
        if (typeof bField === 'string') bField = bField.toLowerCase();

        if (aField < bField) return -1 * sortOrder;
        if (aField > bField) return 1 * sortOrder;
        return 0;
      });
    }
    return sorted;
  };

  return (
    <>
      <div className="top-banner">
        <video
          className="top-banner-video"
          src="/maid-banner.mp4" // adjust path as needed
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="top-banner-text">
          <h1 className="banner-heading">Find Trusted Maids Near You</h1>
          <p className="banner-subheading">Book skilled and verified help anytime, anywhere in Pakistan</p>
        </div>


        <div className="p-4">

          {/* SORTING DROPDOWNS */}
          <div className="sorting-filters">
            <Dropdown
              options={sortOptions}
              value={sortKey}
              onChange={onSortChange}
              placeholder="Sort by Price"
              className="sort-dropdown"
              optionLabel="label"
            />
            <Dropdown
              options={areaSortOptions}
              value={sortKey}
              onChange={onSortChange}
              placeholder="Sort by Area"
              className="sort-dropdown"
              optionLabel="label"
            />
            <Dropdown
              options={skillsSortOptions}
              value={sortKey}
              onChange={onSortChange}
              placeholder="Sort by Skills"
              className="sort-dropdown"
              optionLabel="label"
            />
          </div>

          {/* MAID CARDS */}
          <div className="cards-grid">
            {sortedMaids().map((maid) => (
              <div
                key={maid.id}
                className="maid-card-wrapper"
              >
                <div
                  className="maid-card"
                  onClick={() => handleCardClick(maid.id)}
                >
                  <div style={{ position: 'relative' }}>
                    <img
                      src={`/${maid.image}`}
                      alt={maid.name}
                      className="maid-main-img"
                    />

                  </div>
                  <div className="maid-card-content">
                    <div className="maid-header">
                      <img
                        src={`/${maid.image}`}
                        alt={maid.name}
                        className="maid-avatar"
                      />
                      <div className="maid-name">{maid.name}</div>
                    </div>
                    <div className="maid-description">{maid.description}</div>
                    <div className="maid-bottom">
                      <Rating value={maid.rating} readOnly cancel={false} stars={5} />
                      <div className="price-text">From PKR {maid.price}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATOR */}
          <Paginator
            first={first}
            rows={rows}
            totalRecords={maids.length}
            rowsPerPageOptions={[10, 20, 30]}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </>
  );


}

