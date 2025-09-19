import React, {useState, useEffect} from 'react';
import {Rating} from 'primereact/rating';
import {Paginator} from 'primereact/paginator';
import {Dropdown} from 'primereact/dropdown';
import {InputText} from 'primereact/inputtext';
import './HomePage.css';
import {Tag} from 'primereact/tag';
import {MultiSelect} from 'primereact/multiselect';
import {FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa';

export default function HomePage() {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [maids, setMaids] = useState([]);
    const [filteredMaids, setFilteredMaids] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState(null);

    const sortOptions = [
        {label: 'Name: A to Z', value: 'nameAsc'},
        {label: 'Name: Z to A', value: 'nameDesc'},
    ];

    const skillsSortOptions = [
        {label: "Cleaning", value: "Cleaning"},
        {label: "Cooking", value: "Cooking"},
        {label: "Washing dishes", value: "Washing dishes"},
        {label: "Babysitting", value: "Babysitting"},
        {label: "Laundry", value: "Laundry"},
        {label: "Gardening", value: "Gardening"},
        {label: "Full Time", value: "Full Time"},
    ];

    const onSkillsChange = (e) => {
        setSelectedSkills(e.value);
    };

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const onSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredAndSearchedMaids = () => {
        let filtered = maids;

        // Ensure `maids` is an array
        if (!Array.isArray(filtered)) {
            return [];
        }

        // Filter by skills
        if (selectedSkills.length > 0) {
            filtered = filtered.filter((maid) =>
                maid.skills.some((skill) => selectedSkills.includes(skill))
            );
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter((maid) =>
                maid.city.toLowerCase().includes(searchTerm) ||
                maid.state.toLowerCase().includes(searchTerm) ||
                maid.current_address.toLowerCase().includes(searchTerm)
            );
        }

        // Sort by selected option
        if (sortOption === 'nameAsc') {
            filtered = filtered.sort((a, b) => a.full_name.localeCompare(b.full_name));
        } else if (sortOption === 'nameDesc') {
            filtered = filtered.sort((a, b) => b.full_name.localeCompare(a.full_name));
        }

        return filtered;
    };

    useEffect(() => {
        // Fetch maid data from API
        const fetchMaids = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/maids');
                const data = await response.json();
                setMaids(data);
                setFilteredMaids(data);
            } catch (error) {
                console.error('Error fetching maids:', error);
            }
        };
        fetchMaids();
    }, []);

    const handleCardClick = (maidId) => {
        window.location.href = `/maid/${maidId}`;
    };

    return (
        <>
            <div className="top-banner">
                <video
                    className="top-banner-video"
            src={`${process.env.PUBLIC_URL}/maid-banner.mp4`}
                    autoPlay
                    muted
                    loop
                    playsInline
                />
                <div className="top-banner-text">
                    <h1 className="banner-heading">Find Trusted Maids Near You</h1>
                    <p className="banner-subheading">Book skilled and verified help anytime, anywhere in Pakistan</p>
                </div>
            </div>

            <div className="p-4">
                {/* SORTING AND SEARCH FILTERS */}
                <div className="sorting-filters">
                    <Dropdown
                        value={sortOption}
                        options={sortOptions}
                        onChange={(e) => setSortOption(e.value)}
                        placeholder="Sort by Name"
                        className="sort-dropdown"
                        optionLabel="label"
                    />
                    <MultiSelect
                        value={selectedSkills}
                        options={skillsSortOptions}
                        onChange={onSkillsChange}
                        placeholder="Filter by Skills"
                        display="chip"
                        className="w-full"
                    />
                    <InputText
                        value={searchTerm}
                        onChange={onSearchChange}
                        placeholder="Search by province, city, or location"
                        className="search-bar"
                    />
                </div>

                {/* MAID CARDS */}
                <div className="cards-grid">
                    {filteredAndSearchedMaids().slice(first, first + rows).map((maid) => (
                        <div
                            key={maid.id}
                            className="maid-card-wrapper"
                        >
                            <div
                                className="maid-card"
                                onClick={() => handleCardClick(maid.id)}
                            >
                                <div style={{position: 'relative'}}>
                                    {/* Profile Picture */}
                                    <img
                                        src={maid.profile_photo}
                                        alt={maid.full_name}
                                        className="maid-main-img"
                                    />
                                </div>
                                <div className="maid-card-content">
                                    <div className="maid-header">
                                        {/* Avatar */}
                                        <img
                                            src={maid.profile_photo}
                                            alt={maid.full_name}
                                            className="maid-avatar"
                                        />
                                        <div className="maid-name">{maid.full_name}</div>
                                    </div>
                                    {/* Description */}
                                    <div className="maid-description">
                                        {maid.profile_title || 'No description available'}
                                    </div>
                                    {/* Province, City, and Address */}
                                    <div className="maid-location">
                                        <p><strong>Province:</strong> {maid.state}</p>
                                        <p><strong>City:</strong> {maid.city}</p>
                                        <p><strong>Address:</strong> {maid.current_address}</p>
                                    </div>
                                    <div className="maid-skills">
                                        {maid.skills.map((skill, index) => (
                                            <Tag key={index} value={skill} className="p-mr-2 p-mb-2"/>
                                        ))}
                                    </div>
                                    <div className="maid-bottom">
                                        {/* Rating */}
                                        <Rating
                                            value={maid.averageRating}
                                            readOnly
                                            cancel={false}
                                            stars={5}
                                        />
                                        <div className="average-rating">
                                            {maid.averageRating > 0
                                                ? `Average Rating: ${maid.averageRating}`
                                                : 'No ratings yet'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* PAGINATOR */}
                <Paginator className="paginator"
                           first={first}
                           rows={rows}
                           totalRecords={filteredAndSearchedMaids().length}
                           rowsPerPageOptions={[10, 20, 30]}
                           onPageChange={onPageChange}
                />
            </div>

            {/* FOOTER */}
            <footer className="footer">
                <div className="social-icons">
                    <a href="https://facebook.com"><FaFacebook size={20}/></a>
                    <a href="https://twitter.com"><FaTwitter size={20}/></a>
                    <a href="https://instagram.com"><FaInstagram size={20}/></a>
                </div>
                <p>&copy; 2025 MaidEase. All rights reserved.</p>
            </footer>
        </>
    );
}